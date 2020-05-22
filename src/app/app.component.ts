import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public listActive: boolean = true;

  public addButtonText: string = 'Добавить';
  public addButtonTextArray: string[] = ['Добавить', 'Отменить'];
  public statusButton: boolean = false;

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.addItem({
      name: 'Test',
      id: '12dsds',
      content: 'sdad sdas',
    });

    const localItem: object = this.localStorageService.getItem('12dsds');
  }

  public addButtonHandler(): void {
    this.statusButton = !this.statusButton;

    // set text button
    if (this.addButtonText === this.addButtonTextArray[0]) {
      this.addButtonText = this.addButtonTextArray[1];
    } else {
      this.addButtonText = this.addButtonTextArray[0];
    }
  }

  ngOnInit() {}
}
