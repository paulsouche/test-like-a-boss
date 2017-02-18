import { createTodo, deleteTodo, exist, getTodo, getTodos, updateTodo } from './todos.repository';
import * as express from 'express';

export function all(req: express.Request, res: express.Response) {
  return res
    .status(200)
    .json(getTodos())
    .end();
}

export function byId(req: express.Request, res: express.Response) {
  const id = parseInt(req.params.id, 10);
  if (exist(id)) {
    return res
      .status(200)
      .json(getTodo(id))
      .end();
  }
  return res
    .status(404)
    .json({
      error: 'Not Found',
      message: 'id does not exist',
    })
    .end();
}

export function create(req: express.Request, res: express.Response) {
  return res
    .status(201)
    .json(createTodo(req.body))
    .end();
}

export function deleteId(req: express.Request, res: express.Response) {
  const id = parseInt(req.params.id, 10);
  if (exist(id)) {
    return res
      .status(200)
      .json(deleteTodo(id))
      .end();
  }
  return res
    .status(404)
    .json({
      error: 'Not Found',
      message: 'id does not exist',
    })
    .end();
}

export function update(req: express.Request, res: express.Response) {
  const id = req.body.id;
  if (exist(id)) {
    return res
      .status(200)
      .json(updateTodo(id, req.body))
      .end();
  }
  return res
    .status(404)
    .json({
      error: 'Not Found',
      message: 'id does not exist',
    })
    .end();
}
