import { Router } from "express";
import todoController from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.get('/', todoController.getAll);
todoRouter.get('/:id', todoController.getOne);
todoRouter.post('/', todoController.create);
todoRouter.put('/:id', todoController.update);
todoRouter.delete('/:id', todoController.remove);

export default todoRouter;