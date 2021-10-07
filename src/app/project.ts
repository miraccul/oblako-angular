import { Todo } from "./todo";
import { Type } from 'class-transformer';

export class Project{
    id: number;
    title: string;
    @Type(() => Todo)
    task: Todo[];
} 