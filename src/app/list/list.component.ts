import { Component, Input, EventEmitter, Output } from '@angular/core';
import { StorageData } from '../interfaces/storageData.interface';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() storageData: Array<StorageData>;
  @Output() onSelectItem = new EventEmitter<StorageData>();

  public listPointerActive: boolean = true;
  public selectedItemData: StorageData;

  public clickHandler(itemData: StorageData): void {
    if (this.listPointerActive === true) {
      this.selectedItemData = itemData;
      this.onSelectItem.emit(this.selectedItemData);
    }
  }

  public getlistPointerActiveStatus(): boolean {
    return this.listPointerActive;
  }

  public setlistPointerActiveStatus(status: boolean): void {
    this.listPointerActive = status;
  }

  public resetSelectedItems(): void {
    this.selectedItemData = {
      name: '',
      content: '',
      id: '',
    };
  }

  public activeHandler(itemData: StorageData): boolean {
    if (this.listPointerActive === true && itemData === this.selectedItemData) {
      return true;
    }
    return false;
  }
}
