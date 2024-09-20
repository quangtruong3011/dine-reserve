import { Request, Response } from "express";
import ReservationStatus from "../models/reservationStatus.model";

import { reservationStatusSchema } from "../validations/reservationStatus.validation";

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const creatorId = parseInt(req.query.creatorId as string);
        const { count, rows } = await ReservationStatus.findAndCountAll({
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
        const reservationStatus = await ReservationStatus.findOne({ where: { id, isDeleted: false, creatorId } });
        if (reservationStatus) {
            res.status(200).json({
                data: reservationStatus
            });
        } else {
            res.status(404).send({ message: 'ReservationStatus not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

interface CreateOrEditReservationStatusRequest extends Request {
    body: {
        name: string;
    };
    query: {
        creatorId: string;
    };
}

const create = async (req: CreateOrEditReservationStatusRequest, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const creatorId = parseInt(req.query.creatorId as string);
        await reservationStatusSchema.validate({ name });

        const newReservationStatus = await ReservationStatus.create({
            name,
            creatorId
        });

        res.status(201).json({
            data: newReservationStatus
        });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const creatorId = parseInt(req.query.creatorId as string);
        const reservationStatus = await ReservationStatus.findOne({ where: { id, isDeleted: false, creatorId } });

        if (reservationStatus) {
            const { name } = req.body;
            await reservationStatusSchema.validate({ name });

            await reservationStatus.update({ name });

            res.status(200).json({
                message: 'ReservationStatus updated successfully'
            });
        } else {
            res.status(404).send({ message: 'ReservationStatus not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const creatorId = parseInt(req.query.creatorId as string);
        const reservationStatus = await ReservationStatus.findOne({ where: { id, isDeleted: false, creatorId } });

        if (reservationStatus) {
            await reservationStatus.update({ isDeleted: true });

            res.status(200).json({
                message: 'ReservationStatus deleted successfully'
            });
        } else {
            res.status(404).send({ message: 'ReservationStatus not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const reservationStatusController = { getAll, getOne, create, update, remove };

export default reservationStatusController;