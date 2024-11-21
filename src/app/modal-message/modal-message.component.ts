import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css'],
})
export class ModalMessageComponent {
  @Output() closeEvent = new EventEmitter<void>();

  message: string = this.getMessage();

  getMessage() {
    var msg = localStorage.getItem('message');
    return msg ? msg : 'oooops...';
  }

  closeRequest() {

    this.closeEvent.emit(); // Emite evento para fechar o modal
  }
}