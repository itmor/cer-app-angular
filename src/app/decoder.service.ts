import { Injectable } from '@angular/core';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  private reHex: RegExp = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;

  public decode(der: any, callBack: Function): void {
    try {
      const asn1: any = window.ASN1.decode(der);
      if (asn1.typeName() !== 'SEQUENCE') {
        const errorText =
          'Неверная структура конверта сертификата (ожидается SEQUENCE)';
        throw new Error(errorText);
      } else {
        callBack(asn1.sub[0]);
        window.sub = asn1;
        this.genString(asn1.sub[0]);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  private genString(dataObj: any) {
    if (typeof dataObj.sub !== null) {
      for (let i = 0; i < dataObj.sub.length; i++) {
        this.genString(dataObj.sub[i]);
        console.log(dataObj.sub[i]);
      }
    }
  }

  public decodeBinaryString(str: any, callBack: Function) {
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

  public read(file: Blob, callBack: Function): void {
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
