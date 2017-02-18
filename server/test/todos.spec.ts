import { app } from '../src/app';
import * as supertest from 'supertest';

const request = supertest(app);

describe('GET /api/todos', () => {
  it('Should return all todos', (done) => {
    request.get('/api/todos')
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect([
        {
          id: 1,
          description: 'Préparer la présentation',
          done: true,
        },
        {
          id: 2,
          description: 'Parler de best of web',
          done: false,
        },
      ])
      .end(done);
  });
});

describe('GET /api/todo/:id', () => {
  describe('When id does not exist', () => {
    it('Should return 404', (done) => {
      request.get('/api/todos/404')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /application\/json/)
        .expect({
          error: 'Not Found',
          message: 'id does not exist',
        })
        .end(done);
    });
  });

  describe('When id does exist', () => {
    it('Should return todo', (done) => {
      request.get('/api/todos/1')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect({
          id: 1,
          description: 'Préparer la présentation',
          done: true,
        })
        .end(done);
    });
  });
});

describe('POST /api/todos', () => {
  it('Should create todo', (done) => {
    request.post('/api/todos')
      .send({
        description: 'Tester',
        done: false,
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect({
        id: 3,
        description: 'Tester',
        done: false,
      })
      .end(done);
  });
});

describe('PUT /api/todos', () => {
  describe('When id does not exist', () => {
    it('Should return 404', (done) => {
      request.put('/api/todos')
        .send({
          id: 404,
          description: 'Tester',
          done: true,
        })
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /application\/json/)
        .expect({
          error: 'Not Found',
          message: 'id does not exist',
        })
        .end(done);
    });
  });

  describe('When id does exist', () => {
    it('Should update todo', (done) => {
      request.put('/api/todos')
        .send({
          id: 3,
          description: 'Tester',
          done: true,
        })
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect({
          id: 3,
          description: 'Tester',
          done: true,
        })
        .end(done);
    });
  });
});

describe('DELETE /api/todos/:id', () => {
  describe('When id does not exist', () => {
    it('Should return 404', (done) => {
      request.delete('/api/todos/404')
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /application\/json/)
        .expect({
          error: 'Not Found',
          message: 'id does not exist',
        })
        .end(done);
    });
  });

  describe('When id does exist', () => {
    it('Should delete todo', (done) => {
      request.delete('/api/todos/3')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(done);
    });
  });
});
