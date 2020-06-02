import { Component, ViewChild } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { StorageData } from './interfaces/storageData.interface';
import { DecoderService } from './decoder.service';
import { ListComponent } from './list/list.component';
import { DecoderData } from './interfaces/decoderData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(ListComponent) listComponent: ListComponent;

  public listShow: boolean = true;
  public cerContent = '';
  public dropShow: boolean = false;
  public storageData: Array<StorageData>;
  public addButtonActive: boolean = false;

  constructor(private localStorageService: LocalStorageService, private decoderService: DecoderService) {
    this.storageData = this.localStorageService.getData();
    this.localStorageService.subscribeToUpdates(this.storageUpdateHandler.bind(this));
  }

  private storageUpdateHandler(updatedData: Array<StorageData>) {
    this.storageData = updatedData;
  }

  public addButtonHandler(): void {
    if (!this.localStorageService.isEmpty()) {
      this.addButtonActive = !this.addButtonActive;
      this.dropShow = !this.dropShow;
      this.cerContent = '';
      this.listComponent.setListPointerActiveStatus(!this.listComponent.getListPointerActiveStatus());
      this.listComponent.resetSelectedItems();
    }
  }

  public onDrop(file: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        throw new Error(`Your browser couldn't read the specified file (error code ${reader.error.code}`);
      } else {
        try {
          const decoderData: DecoderData = this.decoderService.decode(<string>reader.result);

          this.localStorageService.addItem({
            name: decoderData.issuerCN,
            id: Math.random().toString(36).substr(2, 5),
            content: `
            Common Name: ${decoderData.commonName}<br/>
            Issuer CN: ${decoderData.issuerCN}<br/>
            Valid from: ${decoderData.validFrom}<br/>
            Valid till: ${decoderData.validTill}
            `,
          });
        } catch (e) {
          console.error(e);
        }
      }
    };

    reader.readAsBinaryString(file);

    this.listShow = true;
    this.listComponent.setListPointerActiveStatus(false);
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
