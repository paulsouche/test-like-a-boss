const todos = [
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
];

export interface ITodoDto {
  id: number;
  description: string;
  done: boolean;
}

export function getTodos() {
  return todos;
}

export function exist(id: number) {
  return !!getTodo(id);
}

export function getTodo(id: number) {
  return todos.find((t) => t.id === id);
}

export function createTodo(data: ITodoDto) {
  const todo = {
    id: todos.length + 1,
    description: data.description,
    done: data.done,
  };

  todos.push(todo);

  return todo;
}

export function deleteTodo(id: number) {
  todos.splice(todos.findIndex((t) => t.id === id), 1);
}

export function updateTodo(id: number, data: ITodoDto) {
  const todo = getTodo(id);
  return Object.assign(todo, {
    description: data.description,
    done: data.done,
  });
}
