import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  ROOT_URL: string = 'http://localhost:8080/api/todo/';

  constructor(private http: HttpClient) { }

  //Deletes a todo
  deleteTodo(todoId:any, userId: number){
    return this.http.delete(this.ROOT_URL+''+todoId+'/user/'+userId);
  }

  //creates a Todo
  createTodo(todo: Todo){
    return this.http.post(this.ROOT_URL+'user/'+todo.userId, todo);
  }

  //finds all todos for a user
  findAllTodos(userId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ROOT_URL + 'user/' + userId + '/todos');
  }

  //finds a todo by ID
  findTodo(todoId: number): Observable<Todo>{
    return this.http.get<Todo>(this.ROOT_URL + ''+todoId);
  }

  //updates a todo
  updateTodo(todo: Todo){
    return this.http.put(this.ROOT_URL, todo);
  }

}
