import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [
    {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe@123',
      todos: [
        {
          todoId: 1,
          title: 'Daily sprint meet',
          body: 'Sprint meeting with the team at 3:00PM',
          priority: 'high',
          createdOn: new Date()
        },
        {
          todoId: 2,
          title: 'Team outing',
          body: 'Team outing at 4:30PM for coffee. PS: Bring your own glass',
          priority: 'medium',
          createdOn: new Date()
        }
      ]
    },
    {
      userId: 2,
      firstName: 'Jane',
      lastName: 'Foster',
      email: 'janefoster@gmail.com',
      password: 'janefoster@123',
      todos: []
    }
  ];
  constructor() { }

  //authenticates the user by email and password
  authenticateUser(email: string, password: string): User | void {

    //to be removed upon service integration from here...

    let user: User;
    let index: number = this.users.findIndex(user => user.email === email && user.password === password);
    if (index != -1) {
      return this.users[index];
    }

    //... to here
  }
}
