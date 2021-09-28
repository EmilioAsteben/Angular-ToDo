import { Todo } from "./todo.model";

export interface Project {
    id: number;
    title: string;
    todos: Todo[];
  }