import { Component, Input } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Todo } from '../todo';
import { Project } from '../project';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})

export class CardComponent {
    @Input() todoList: Project;

    constructor(private projectsService: ProjectService) {

    }
    update(todo: Todo) {
        this.projectsService.updateTodo(todo.id, todo.category_id);
    }

    track(index: number, item: Todo): number {
        return item.id;
    }
}