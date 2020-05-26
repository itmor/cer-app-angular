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

  public listActive: boolean = true;
  public selectedItemData: StorageData;

  public clickHandler(itemData: StorageData): void {
    if (this.listActive === true) {
      this.selectedItemData = itemData;
      this.onSelectItem.emit(this.selectedItemData);
    }
  }

  public getListActiveStatus(): boolean {
    return this.listActive;
  }

  public setListActiveStatus(status: boolean): void {
    this.listActive = status;
  }

  public resetSelectedItems(): void {
    this.selectedItemData = {
      name: '',
      content: '',
      id: '',
    };
  }

  public activeHandler(itemData: StorageData): boolean {
    if (this.listActive === true && itemData === this.selectedItemData) {
      return true;
    }
    return false;
  }
}
