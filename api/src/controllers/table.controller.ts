import { Request, Response } from "express";
import Table from "../models/table.model";
import { createOrEditTableSchema } from "../validations/table.validation";

export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Table.findAndCountAll({
            where: { isDeleted: false },
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

export const getOne = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const table = await Table.findOne({ where: { id, isDeleted: false } });
        if (table) {
            res.status(200).json({
                data: table
            });
        } else {
            res.status(404).send({ message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        await createOrEditTableSchema.validate(req.body, { abortEarly: false });
        const newTable = await Table.create(req.body);
        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        await createOrEditTableSchema.validate(req.body, { abortEarly: false });
        const [updated] = await Table.update(req.body, { where: { id } });
        if (updated) {
            res.json({ message: 'Table updated' });
        } else {
            res.status(404).send({ message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const deleted = await Table.update({ isDeleted: true }, { where: { id } });
        if (deleted) {
            res.json({ message: 'Table deleted' });
        } else {
            res.status(404).send({ message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const tableController = { getAll, getOne, create, update, remove };

export default tableController;