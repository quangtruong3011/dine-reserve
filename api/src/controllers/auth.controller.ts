import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { loginSchema, registerSchema } from '../validations/auth.validation';
import "dotenv/config";

const login = async (req: Request, res: Response) => {
    try {
        await loginSchema.validate(req.body, { abortEarly: false });
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            return res.status(500).json({ message: 'JWT Secret Key is not defined' });
        }
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ data: { token } });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        await registerSchema.validate(req.body, { abortEarly: false });
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });
        res.status(201).json({
            message: 'User created successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            error
        });
    }
}

interface CustomRequest extends Request {
    user?: { id: number };
}

const getUser = async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).json({
            data: user,
            success: true
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const authController = { login, register, getUser };

export default authController;