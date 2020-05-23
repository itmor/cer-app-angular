import { Component, Input, EventEmitter, Output } from '@angular/core';
import { StorageData } from '../interfaces/storageData.interface';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() listActive: boolean;
  @Input() storageData: Array<StorageData>;
  @Input() resetSelectedItems: boolean;
  @Output() onSelectItem = new EventEmitter<any>();

  public selectedItemData: StorageData;

  public clickHandler(itemData: StorageData): void {
    if (this.listActive === true) {
      this.selectedItemData = itemData;
      this.onSelectItem.emit(this.selectedItemData);
      this.resetSelectedItems = false;
    }
  }

  public activeHandler(itemData: StorageData): boolean {
    if (
      this.listActive === true &&
      itemData === this.selectedItemData &&
      this.resetSelectedItems === false
    ) {
      return true;
    }
    return false;
  }
}
