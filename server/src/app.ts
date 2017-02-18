import { all, byId, create, deleteId, update } from './api/todos.controller';
import * as bodyParser from 'body-parser';
import * as express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/api/todos', all);
app.get('/api/todos/:id', byId);
app.post('/api/todos', create);
app.put('/api/todos', update);
app.delete('/api/todos/:id', deleteId);

export {
  app,
}
