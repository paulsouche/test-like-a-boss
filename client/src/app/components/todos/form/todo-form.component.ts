import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITodoCreateDto } from '../todo-dto';

@Component({
  selector: 'todo-form',
  template: `<form (ngSubmit)="createTodo()" class="form-horizontal" #todoForm="ngForm" novalidate>
               <div class="form-group">
                 <label class="col-2 col-form-label">Description</label>
                 <div class="col-10">
                   <input class="form-control" required name="description" type="text" [(ngModel)]="todo.description">
                 </div>
               </div>
               <div class="form-check">
                 <label class="form-check-label" name="done">
                   <input class="form-check-input" name="done" [(ngModel)]="todo.done" type="checkbox">
                   Done
                 </label>
               </div>
               <div class="form-group">
                 <button type="submit" class="btn btn-success" [disabled]="todoForm.invalid">Create</button>
               </div>
             </form>`,
})
export class TodoFormComponent implements OnInit {
  public todo: ITodoCreateDto;

  @Output()
  public onCreateTodo = new EventEmitter<ITodoCreateDto>();

  public createTodo() {
    this.onCreateTodo.emit(this.todo);
    this.ngOnInit();
  }

  public ngOnInit() {
    this.todo = {};
  }
}
