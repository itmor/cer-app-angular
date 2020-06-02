import { Injectable } from '@angular/core';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  public decode(file: Blob, callback: Function, errCallback: Function): void {}
}
