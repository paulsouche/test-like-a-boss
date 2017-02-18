import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodoDto } from '../todo-dto';

@Component({
  selector: 'todo-list-item',
  template: `<li class="list-group-item">
               <form class="form-inline" novalidate>
                 <div *ngIf="!editMode">{{todo.description}}</div>
                 <input *ngIf="editMode" type="text" class="form-control"
                        [(ngModel)]="todo.description"
                        [name]="todo.id + '-desc'">
                 <div class="form-check">
                   <label class="form-check-label">
                     <input type="checkbox" class="form-check-input"
                            [(ngModel)]="todo.done"
                            (change)="updateTodo()"
                            [name]="todo.id + '-done'">
                     Done
                   </label>
                 </div>
                 <button class="btn btn-primary" (click)="toggleEdit()">
                   <i class="fa fa-edit"></i>
                 </button>
                 <button class="btn btn-danger" (click)="deleteTodo()">
                   <i class="fa fa-remove"></i>
                 </button>
               </form>
             </li>`,
})
export class TodoListItemComponent {
  @Input()
  public todo: ITodoDto;

  @Output()
  public onDeleteTodo = new EventEmitter<ITodoDto>();

  @Output()
  public onUpdateTodo = new EventEmitter<ITodoDto>();

  public editMode: boolean;

  public toggleEdit() {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.updateTodo();
    }
  }

  public deleteTodo() {
    this.onDeleteTodo.emit(this.todo);
  }

  public updateTodo() {
    this.onUpdateTodo.emit(this.todo);
  }
}
