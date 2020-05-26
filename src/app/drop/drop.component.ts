import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {
  @Output() onDrop = new EventEmitter<Blob>();

  constructor() {}

  public dragHandler(event: DragEvent): void {
    event.preventDefault();
  }

  public dropHandler(event: DragEvent): void {
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      this.onDrop.emit(event.dataTransfer.files[i]);
    }

    event.preventDefault();
  }
}
