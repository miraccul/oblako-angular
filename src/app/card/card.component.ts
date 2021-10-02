import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})

export class CardComponent {
    @Input() todoList: any
    @Output() updateEvent = new EventEmitter()

    constructor(private http: HttpClient) {

    }

    update(id: number, isComplited: boolean, category_id: number) {
        this.http.patch(`https://aqueous-waters-16302.herokuapp.com/projects/${category_id}/todos/${id}`, {
            id: id,
            isComplited: !isComplited
        }).subscribe(res => {
            this.updateTodos()
        });
    }

    updateTodos() {
        this.updateEvent.emit()
    }
}