import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { LocalStorageService } from './local-storage.service';
import { DropComponent } from './drop/drop.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [AppComponent, ListComponent, DropComponent, ViewComponent],
  imports: [BrowserModule],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
