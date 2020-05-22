import { Component, OnInit, Input } from '@angular/core';
import { StorageData } from '../interfaces/storageData.interface';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() listActive: boolean;
  @Input() storageData: Array<StorageData>;

  ngOnInit(): void {}

  private onSelectItem(item: any): void {
    console.log(item);
  }
}
