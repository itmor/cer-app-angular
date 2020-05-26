import { Component, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { DecoderService } from '../decoder.service';
import { StorageData } from '../interfaces/storageData.interface';

@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
})
export class DropComponent {
  @Output() onDrop = new EventEmitter<boolean>();

  constructor(
    private localStorageService: LocalStorageService,
    private decoderService: DecoderService
  ) {}

  public dragHandler(event: DragEvent): void {
    event.preventDefault();
  }

  public dropHandler(event: DragEvent): void {
    this.decoderService.decode(
      event.dataTransfer.files[0],

      (storageData: StorageData) => {
        this.localStorageService.addItem({
          name: storageData.name,
          id: storageData.id,
          content: storageData.content,
        });
      }
    );

    this.onDrop.emit();

    event.preventDefault();
  }
}
