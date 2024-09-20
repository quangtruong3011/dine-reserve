import { Router } from "express";
import tableController from "../controllers/table.controller";

const tableRouter = Router();

tableRouter.get('/', tableController.getAll);
tableRouter.get('/:id', tableController.getOne);
tableRouter.post('/', tableController.create);
tableRouter.put('/:id', tableController.update);
tableRouter.delete('/:id', tableController.remove);

export default tableRouter;