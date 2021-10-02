import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tolbar',
  templateUrl: './tolbar.component.html',
  styleUrls: ['./tolbar.component.css']
})
export class TolbarComponent {
  @Output() modalEvent = new EventEmitter()
  
    openModal() {
      this.modalEvent.emit(true)
    }
}