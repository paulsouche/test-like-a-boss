import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoDto } from '../todo-dto';

@Component({
  selector: 'todo-list',
  template: `<ul class="list-group">
               <todo-list-item *ngFor="let todo of todos" [todo]="todo"
                               (onUpdateTodo)="updateTodo($event)"
                               (onDeleteTodo)="deleteTodo($event)">
               </todo-list-item>
             </ul>`,
})
export class TodoListComponent {
  @Input()
  public todos: ITodoDto[];

  @Output()
  public onDeleteTodo = new EventEmitter<ITodoDto>();

  @Output()
  public onUpdateTodo = new EventEmitter<ITodoDto>();

  public deleteTodo(todo: ITodoDto) {
    this.onDeleteTodo.emit(todo);
  }

  public updateTodo(todo: ITodoDto) {
    this.onUpdateTodo.emit(todo);
  }
}
