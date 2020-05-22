import { Injectable } from '@angular/core';
import { StorageData } from './interfaces/storageData.interface';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageName: string = 'cerAngApp';
  private callbacksUpdates: Array<Function> = [];

  public constructor() {
    this.create();
  }

  public isEmpty(): boolean {
    if (localStorage[this.storageName] === '[]') {
      return true;
    }
    return false;
  }

  private isExist(): boolean {
    if (localStorage[this.storageName] !== undefined) {
      return true;
    }
    return false;
  }

  private create(): void {
    if (!this.isExist()) {
      localStorage[this.storageName] = '[]';
    }
  }

  public getItem(id: string): any {
    const localStorageString: string = localStorage[this.storageName];
    const localStorageObject: Array<StorageData> = JSON.parse(
      localStorageString
    );

    for (const item of localStorageObject) {
      if (item.id === id) {
        return item;
      }
    }
    return 'not-found';
  }

  public subscribeToUpdates(callback: Function): void {
    this.callbacksUpdates.push(callback);
  }

  public unsubscribeToUpdates(callback: Function): void {
    if (this.callbacksUpdates.length > 0) {
      for (let i = 0; i < this.callbacksUpdates.length; i++) {
        if (this.callbacksUpdates[i] === callback) {
          this.callbacksUpdates = this.callbacksUpdates.slice(i + 1);
        }
      }
    }
  }

  public addItem(data: StorageData): void {
    const localStorageArray: Array<object> = JSON.parse(
      localStorage[this.storageName]
    );
    localStorageArray.push(data);

    const localStorageString: string = JSON.stringify(localStorageArray);
    localStorage[this.storageName] = localStorageString;

    if (this.callbacksUpdates.length > 0) {
      for (let callback of this.callbacksUpdates) {
        callback(this.getData());
      }
    }
  }

  public getData(): Array<StorageData> {
    const localStorageString: string = localStorage[this.storageName];
    const localStorageObject: Array<StorageData> = JSON.parse(
      localStorageString
    );

    return localStorageObject;
  }
}
