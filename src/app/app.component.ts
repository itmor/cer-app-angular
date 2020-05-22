import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StorageData } from './interfaces/storageData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public listActive: boolean = true;
  public cerContent = '';
  public viewShow: boolean = true;
  public dropShow: boolean = false;

  protected localStorageService: LocalStorageService;
  public storageData: Array<StorageData>;

  public statusButton: boolean = false;

  constructor() {
    this.localStorageService = new LocalStorageService();

    this.storageData = this.localStorageService.getData();
    this.localStorageService.subscribeToUpdates(this.storageUpdateHandler);
  }

  private storageUpdateHandler(updatedData: Array<StorageData>) {
    this.storageData = updatedData;
  }

  public addButtonHandler(): void {
    this.statusButton = !this.statusButton;
    this.dropShow = !this.dropShow;
    this.viewShow = !this.viewShow;
    this.listActive = !this.listActive;
  }

  ngOnInit() {}
}
