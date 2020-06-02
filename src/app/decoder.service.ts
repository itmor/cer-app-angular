import { Injectable } from '@angular/core';
import ASN1 from '@lapo/asn1js';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  public decode(file: Blob, callback: Function, errCallback: Function): void {
    console.log(ASN1);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        errCallback(
          `Your browser couldn't read the specified file (error code ${reader.error.code}`
        );
      } else {
        this.getAsn(<string>reader.result, callback, errCallback);
      }
    };
    reader.readAsBinaryString(file);
  }

  private getAsn(der: string, callback: Function, errCallback: Function): void {
    try {
      const asnStruct: any = ASN1.decode(der);
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

  private parseFields(asnStruct: any, callback: Function): void {
    console.log(asnStruct);
  }
}
