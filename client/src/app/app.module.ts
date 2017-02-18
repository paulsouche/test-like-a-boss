import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import {
  AppComponent,
  TodoFormComponent,
  TodoListComponent,
  TodoListItemComponent,
  TodosComponent,
} from './components';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodosComponent,
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
  ],
})
export class AppModule { }
