import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ITodoCreateDto, ITodoDto } from './todo-dto';

@Component({
  selector: 'todos',
  template: `<h1>Todos</h1>
             <todo-form (onCreateTodo)="createTodo($event)"></todo-form>
             <todo-list [todos]="todos"
                        (onUpdateTodo)="updateTodo($event)"
                        (onDeleteTodo)="deleteTodo($event)">
             </todo-list>`,
})
export class TodosComponent implements OnInit {
  public todos: ITodoDto[];

  private _http: Http;

  constructor(http: Http) {
    this._http = http;
  }

  public ngOnInit() {
    this._http.get('/api/todos')
      .subscribe((res) => this.todos = res.json(), () => this.todos = []);
  }

  public createTodo(todo: ITodoCreateDto) {
    this._http.post('/api/todos', todo)
      .subscribe((res) => this.todos.push(res.json()));
  }

  public updateTodo(todo: ITodoDto) {
    this._http.put('/api/todos', todo)
      .subscribe((res) => Object.assign(todo, res.json()));
  }

  public deleteTodo(todo: ITodoDto) {
    this._http.delete('/api/todos/'.concat(todo.id.toString()))
      .subscribe(() => this.todos.splice(this.todos.indexOf(todo), 1));
  }
}
