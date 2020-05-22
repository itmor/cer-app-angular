import { Injectable } from '@angular/core';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  private reHex: RegExp = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;

  decode(der: any, callBack: Function): void {
    try {
      const asn1: any = window.ASN1.decode(der);
      if (asn1.typeName() !== 'SEQUENCE') {
        const errorText =
          'Неверная структура конверта сертификата (ожидается SEQUENCE)';
        throw new Error(errorText);
      } else {
        callBack(asn1);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  decodeBinaryString(str: any, callBack: Function) {
    let der: any;

    try {
      if (this.reHex.test(str)) {
        der = window.Hex.decode(str);
      } else if (window.Base64.re.test(str)) {
        der = window.Base64.unarmor(str);
      } else {
        der = str;
        this.decode(der, callBack);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  read(file: Blob, callBack: Function): void {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        throw new Error('Error reading');
      } else {
        this.decodeBinaryString(reader.result, callBack);
      }
    };

    reader.readAsBinaryString(file);
  }
}
