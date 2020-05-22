import { Injectable } from '@angular/core';

interface StorageData {
  id: string;
  name: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storageName: string = 'cerAngApp';

  constructor() {
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

  getItem(id: string): any {
    const localStorageString: string = localStorage[this.storageName];
    const result: Array<StorageData> = JSON.parse(localStorageString);

    for (const item of result) {
      if (item.id === id) {
        return item;
      }
    }
    return 'not-found';
  }

  addItem(data: StorageData) {
    const localStorageArray: Array<object> = JSON.parse(
      localStorage[this.storageName]
    );
    localStorageArray.push(data);

    const localStorageString: string = JSON.stringify(localStorageArray);
    localStorage[this.storageName] = localStorageString;
  }
}
