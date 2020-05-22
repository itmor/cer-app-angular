import { Component, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { DecoderService } from '../decoder.service';

@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {
  @Output() onDrop = new EventEmitter<boolean>();
  private decoderService: DecoderService;

  constructor(private localStorageService: LocalStorageService) {
    this.decoderService = new DecoderService();
  }

  public dragHandler(event: DragEvent): void {
    event.preventDefault();
  }

  public dropHandler(event: DragEvent): void {
    console.log(event.dataTransfer.files[0]);

    this.decoderService.read(event.dataTransfer.files[0], (data: any) => {
      console.log(data.sub[0]);
    });

    this.localStorageService.addItem({
      name: 'we lol',
      id: 'ere',
      content: '1212',
    });

    this.onDrop.emit();

    event.preventDefault();
  }
}
