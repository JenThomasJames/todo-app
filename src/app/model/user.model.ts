import { Todo } from "./todo.model";

export interface User{
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    todos: Todo[];
}