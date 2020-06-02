import { Injectable } from '@angular/core';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  public decode(file: Blob, callback: Function, errCallback: Function): void {
    window.decodeAsn(
      file,
      (asn1Struct: any) => {
        // console.log(asn1Struct);
        callback(asn1Struct);
      },
      errCallback
    );
  }
}
