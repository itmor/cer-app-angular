import { Component, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {
  @Output() onDrop = new EventEmitter<boolean>();

  constructor(private localStorageService: LocalStorageService) {}

  public dragHandler(event: DragEvent): void {
    event.preventDefault();
  }

  public dropHandler(event: DragEvent): void {
    console.log(event.dataTransfer.files[0]);
    this.localStorageService.addItem({
      name: 'we lol',
      id: 'ere',
      content: '1212',
    });

    this.onDrop.emit();

    event.preventDefault();
  }
}
