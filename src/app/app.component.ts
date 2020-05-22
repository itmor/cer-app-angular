import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public listActive: boolean = true;
  public cerContent = '';

  public statusButton: boolean = false;

  constructor(private localStorageService: LocalStorageService) {}

  public addButtonHandler(): void {
    this.statusButton = !this.statusButton;
  }

  ngOnInit() {}
}
