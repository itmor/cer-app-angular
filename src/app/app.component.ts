import { Component, ViewChild } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StorageData } from './interfaces/storageData.interface';
import { DecoderService } from './decoder.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(ListComponent) child: ListComponent;

  public listShow: boolean = true;
  public cerContent = '';
  public dropShow: boolean = false;
  public storageData: Array<StorageData>;
  public addButtonActive: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private decoderService: DecoderService
  ) {
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
      this.cerContent = '';
      //That was done since when changing @Output in a child, @Output stops receiving changes
      this.child.setListActiveStatus(!this.child.getListActiveStatus());
      this.child.resetSelectedItems();
    }
  }

  public onDrop(file: Blob): void {
    this.decoderService.decode(file, (storageData: StorageData) => {
      this.localStorageService.addItem({
        name: storageData.name,
        id: storageData.id,
        content: storageData.content,
      });
    });

    this.listShow = true;
    this.child.setListActiveStatus(false);
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
