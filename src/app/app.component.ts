import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StorageData } from './interfaces/storageData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public listShow: boolean = true;
  public listActive: boolean = true;
  public cerContent = '';
  public dropShow: boolean = false;
  public storageData: Array<StorageData>;
  public addButtonActive: boolean = false;
  public resetSelectedItems = false;

  constructor(private localStorageService: LocalStorageService) {
    this.storageData = this.localStorageService.getData();
    this.localStorageService.subscribeToUpdates(
      this.storageUpdateHandler.bind(this)
    );
  }

  private storageUpdateHandler(updatedData: Array<StorageData>) {
    this.storageData = updatedData;
  }

  public addButtonHandler(): void {
    if (!this.localStorageService.isEmpty()) {
      this.addButtonActive = !this.addButtonActive;
      this.dropShow = !this.dropShow;
      this.listActive = !this.listActive;
      this.cerContent = '';
      //That was done since when changing @Output in a child, @Output stops receiving changes
      this.resetSelectedItems = Object.assign(false, this.resetSelectedItems);
    }
  }

  public onDrop(): void {
    this.listShow = true;
    this.listActive = false;
  }

  public onSelectItem(item: StorageData) {
    this.cerContent = item.content;
  }

  ngOnInit() {
    if (this.localStorageService.isEmpty()) {
      this.listShow = false;
      this.dropShow = true;
      this.addButtonActive = true;
    }
  }
}
