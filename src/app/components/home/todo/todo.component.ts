import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTodos();
  }
  getAllTodos() {
    this.todoService.findAllTodos(parseInt(sessionStorage.getItem('userId')!)).subscribe(data => {
      this.todos = data;
    }, error => {
      alert('Something went wrong. Check the logs!');
    });
  }

  onMarkAsCompleted(todoId: any): void {
    this.todoService.deleteTodo(todoId, parseInt(sessionStorage.getItem('userId')!)).subscribe(data => {
      alert('Task deleted!');
      this.getAllTodos();
    }, error => {
      alert('Something went wrong!');
    });
  }

  onEdit(todo: Todo): void {
    this.router.navigateByUrl('home/new/todo/'+todo.todoId);
  }

  validate(todo: Todo): boolean {

    //empty body
    if (todo.body == '') {
      alert('Description cannot be empty!');
      return false;
    }

    //empty priority
    if (todo.priority == '') {
      alert('Pick a priority!');
      return false;
    }

    //empty title
    if (todo.title == '') {
      alert('title cannot be empty!');
      return false;
    }

    return true;
  }

}
