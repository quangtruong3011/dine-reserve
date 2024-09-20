import { Request, Response } from "express";
import Reservation from "../models/reservation.model";

import { createOrEditReservationSchema } from "../validations/reservation.validation";

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const creatorId = parseInt(req.query.creatorId as string);
        const { count, rows } = await Reservation.findAndCountAll({
            where: { isDeleted: false, creatorId },
            limit,
            offset
        });

        res.status(200).json({
            page,
            limit,
            total: count,
            data: rows
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const getOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const creatorId = parseInt(req.query.creatorId as string);
        const reservation = await Reservation.findOne({ where: { id, isDeleted: false, creatorId } });
        if (reservation) {
            res.status(200).json({
                data: reservation
            });
        } else {
            res.status(404).send({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

interface CreateOrEditReservationRequest extends Request {
    body: {
        customerId: number;
        tableId: number;
        reservationDate: Date;
        reservationTime: string;
        status: string;
    };
    query: {
        creatorId: string;
    };
}

const create = async (req: CreateOrEditReservationRequest, res: Response): Promise<void> => {
    try {
        await createOrEditReservationSchema.validate(req.body, { abortEarly: false });
        const creatorId = parseInt(req.query.creatorId);
        const newReservation = await Reservation.create({ ...req.body, creatorId });
        res.status(201).json({ message: 'Reservation created successfully', data: newReservation });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await createOrEditReservationSchema.validate(req.body, { abortEarly: false });
        const [updated] = await Reservation.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedReservation = await Reservation.findByPk(id);
            res.json(updatedReservation);
        } else {
            res.status(404).send({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const deleted = await Reservation.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: 'Reservation deleted' });
        } else {
            res.status(404).send({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const reservationController = { getAll, getOne, create, update, remove };

export default reservationController;