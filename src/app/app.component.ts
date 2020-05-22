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
  public viewShow: boolean = true;
  public dropShow: boolean = false;

  public storageData: Array<StorageData>;

  public addButtonActive: boolean = false;

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
      this.viewShow = !this.viewShow;
      this.listActive = !this.listActive;
    }
  }

  ngOnInit() {
    if (this.localStorageService.isEmpty()) {
      this.listShow = false;
      this.dropShow = true;
      this.viewShow = false;
      this.addButtonActive = true;
    }
  }
}
