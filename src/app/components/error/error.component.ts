import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  @Input() errorMessage: string = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
}
