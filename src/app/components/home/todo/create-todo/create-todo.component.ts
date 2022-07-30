import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  todoForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl('')
  });

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void {
    if (this.validate()) {
      let todo: Todo = {
        title: this.todoForm.controls['title'].value,
        body: this.todoForm.controls['description'].value,
        priority: this.todoForm.controls['priority'].value,
        userId: parseInt(sessionStorage.getItem('userId')!)
      };
      this.todoService.createTodo(todo).subscribe(data => {
        alert('Task saved!');
        this.router.navigate(['home']);

      }, error => {
        alert('Task could not be saved. Please try again.');
      });
    } else{
      alert('Please fill the form properly!');
    }
  }

  validate(): boolean {
    if (
      this.todoForm.controls['description'].value == '' ||
      this.todoForm.controls['title'].value == '' ||
      this.todoForm.controls['priority'].value == '')
      return false;

    return true;
  }

}
