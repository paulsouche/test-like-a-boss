import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from '../../app.module';
import { TodoFormComponent } from '../../components';

import { TodosComponent } from './todos.component';

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

describe('Todolist', () => {
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [AppModule],
        providers: [
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
              return new Http(mockBackend, options);
            },
            deps: [MockBackend, BaseRequestOptions],
          },
        ],
      });

    TestBed.get(MockBackend).connections.subscribe((c: MockConnection) => {
      switch (c.request.method) {
        case RequestMethod.Get:
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(todos),
          })));
          break;
        case RequestMethod.Post:
        case RequestMethod.Put:
          c.mockRespond(new Response(new ResponseOptions({
            body: c.request.getBody(),
          })));
          break;
        case RequestMethod.Delete:
          c.mockRespond(new Response(new ResponseOptions()));
          break;
        default:
          throw new Error('Unexpected request');
      }
    });

    fixture = TestBed.createComponent(TodosComponent);
    fixture.autoDetectChanges();
  }));

  it('Should display todos', () => {
    expect(fixture).toBeDefined();
    expect(fixture.componentInstance.todos).toEqual(todos);
    expect(fixture.debugElement.queryAll(By.css('ul li')).length).toBe(todos.length);
  });

  describe('When updating a todo state', () => {
    beforeEach(() => fixture.debugElement
      .query(By.css('ul li:nth-child(1) input[type="checkbox"]')).nativeElement.click());

    it('Should update todo', () => {
      expect(fixture.componentInstance.todos[0].done).not.toBe(todos[0].done);
    });
  });

  describe('When updating a todo description', () => {
    beforeEach(() => {
      fixture.debugElement
        .query(By.css('ul li:nth-child(1) .fa-edit')).nativeElement.click();

      fixture.componentInstance.todos[0].description = 'UPDATED';
      fixture.detectChanges();

      fixture.debugElement
        .query(By.css('ul li:nth-child(1) .fa-edit')).nativeElement.click();
    });

    it('Should update todo', () => {
      expect(fixture.componentInstance.todos[0].description).toBe('UPDATED');
    });
  });

  describe('When creating a todo', () => {
    beforeEach(() => {
      const form: TodoFormComponent = fixture.debugElement
        .query(By.directive(TodoFormComponent)).componentInstance;
      form.todo.description = 'NEW TODO';
      form.createTodo();
      fixture.detectChanges();
    });

    it('Should create the todo', () => {
      expect(fixture.componentInstance.todos[2].description).toBe('NEW TODO');
      expect(fixture.debugElement.queryAll(By.css('ul li')).length).toBe(todos.length + 1);
    });
  });

  describe('When deleting a todo', () => {
    beforeEach(() => fixture.debugElement
      .query(By.css('ul li:nth-child(1) .fa-remove')).nativeElement.click());

    it('Should delete the todo', () => {
      expect(fixture.debugElement.queryAll(By.css('ul li')).length).toBe(todos.length - 1);
    });
  });
});
