import { by, element } from 'protractor';

const selectors = {
  todos: by.css('ul li'),
  todo: by.css('ul todo-list-item:nth-child(1)'),
  todoRemover: by.css('ul todo-list-item:nth-child(3) .btn.btn-danger'),
  formDescription: by.css('.form-horizontal input[type="text"]'),
  formSubmit: by.css('.form-horizontal button[type="submit"]'),
};

describe('todolist', () => {
  it('Should display todos', () => {
    expect(element.all(selectors.todos).count()).toBe(2);
  });

  describe('When creating a todo', () => {
    beforeEach(() => {
      element(selectors.formDescription).sendKeys('New Todo');
      element(selectors.formSubmit).click();
    });

    it('Should create a Todo', () => {
      expect(element.all(selectors.todos).count()).toBe(3);
    });
  });

  describe('When deleting a todo', () => {
    beforeEach(() => {
      element(selectors.todoRemover).click();
    });

    it('Should delete a Todo', () => {
      expect(element.all(selectors.todos).count()).toBe(2);
    });
  });
});
