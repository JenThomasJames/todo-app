import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  isUpdate: boolean = false;

  todoForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl('')
  });

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.isUpdate = true;
      this.todoService.findTodo(this.route.snapshot.params['id']).subscribe(data => {
        this.todoForm.controls['title'].setValue(data.title);
        this.todoForm.controls['description'].setValue(data.body);
        this.todoForm.controls['priority'].setValue(data.priority);
      }, error => {
        alert('Something went wrong.')
      });
    }
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
    } else {
      alert('Please fill the form properly!');
    }
  }

  onUpdate(): void {
    if (this.validate()) {
      let todo: Todo = {
        todoId: this.route.snapshot.params['id'],
        title: this.todoForm.controls['title'].value,
        body: this.todoForm.controls['description'].value,
        priority: this.todoForm.controls['priority'].value,
        userId: parseInt(sessionStorage.getItem('userId')!)
      };
      this.todoService.updateTodo(todo).subscribe(data => {
        alert('Task updated!');
        this.router.navigate(['home']);

      }, error => {
        alert('Task could not be saved. Please try again.');
      });
    } else {
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
