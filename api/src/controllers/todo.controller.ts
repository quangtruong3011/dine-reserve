import { Request, Response } from 'express';
import Todo from '../models/todo.model'; // Adjust the path as necessary

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Todo.findAndCountAll({
            where: { isDeleted: false },
            limit,
            offset
        });

        res.json({
            page,
            limit,
            total: count,
            data: rows
        });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const todo = await Todo.findOne({ where: { id, isDeleted: false } });
        if (todo) {
            res.json(todo);
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const newTodo = await Todo.create(req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const [updated] = await Todo.update(req.body, {
            where: { id, isDeleted: false }
        });
        if (updated) {
            const updatedTodo = await Todo.findOne({ where: { id } });
            res.json(updatedTodo);
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const deleted = await Todo.update({ isDeleted: true }, {
            where: { id, isDeleted: false }
        });
        if (deleted[0]) {
            res.json({ message: 'Todo deleted' });
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const todoController = { getAll, getOne, create, update, remove };

export default todoController;