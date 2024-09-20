import { Router } from "express";
import todoRouter from "./todo.router";
import authRouter from "./auth.router";
import tableRouter from "./table.router";

const router = Router();

router.use('/auth', authRouter);
router.use('/todos', todoRouter);
router.use('/tables', tableRouter)

export default router;