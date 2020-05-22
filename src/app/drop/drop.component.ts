import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {
  constructor(private localStorageService: LocalStorageService) {}

  public onDrag(event: DragEvent): void {
    event.preventDefault();
  }

  public onDrop(event: DragEvent): void {
    console.log(event.dataTransfer.files[0]);
    this.localStorageService.addItem({
      name: 'hahahahh lol',
      id: 'random',
      content: 'hi',
    });
    event.preventDefault();
  }
}
