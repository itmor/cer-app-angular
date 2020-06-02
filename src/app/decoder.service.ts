import { Injectable } from '@angular/core';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  private reHex: RegExp = new RegExp(/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/);

  public decode(file: Blob, callback: Function, errCallback: Function): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        errCallback(
          `Your browser couldn't read the specified file (error code ${reader.error.code}`
        );
      } else {
        this.decodeBinaryString(<string>reader.result, callback, errCallback);
      }
    };
    reader.readAsBinaryString(file);
  }

  private decodeBinaryString(
    str: string,
    callBack: Function,
    errCallback: Function
  ): void {
    let der: string;
    try {
      if (this.reHex.test(str)) {
        der = window.Hex.decode(str);
      } else if (window.Base64.re.test(str)) {
        der = window.Base64.unarmor(str);
      } else {
        der = str;
        this.getAsn(der, callBack, errCallback);
      }
    } catch (e) {
      errCallback(e);
    }
  }

  private getAsn(der: string, callback: Function, errCallback: Function): void {
    try {
      const asnStruct: any = window.ASN1.decode(der);
      if (asnStruct.typeName() !== 'SEQUENCE') {
        errCallback(
          'Неверная структура конверта сертификата (ожидается SEQUENCE)'
        );
      }

      this.parseFields(asnStruct, callback);
    } catch (e) {
      errCallback(e);
    }
  }

  private parseFields(asnStruct: any, callback: Function): void {}
}
