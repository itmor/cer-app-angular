import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {
  @Output() onDrop = new EventEmitter<DragEvent>();

  constructor() {}

  public dragHandler(event: DragEvent): void {
    event.preventDefault();
  }

  public dropHandler(event: DragEvent): void {
    this.onDrop.emit(event);
    event.preventDefault();
  }
}
