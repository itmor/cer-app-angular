import { Injectable } from '@angular/core';
import ASN1 from '@lapo/asn1js';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  public decode(file: Blob, callback: Function, errCallback: Function): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        errCallback(`Your browser couldn't read the specified file (error code ${reader.error.code}`);
      } else {
        this.getAsn(<string>reader.result, callback, errCallback);
      }
    };
    reader.readAsBinaryString(file);
  }

  private getAsn(der: string, callback: Function, errCallback: Function): void {
    try {
      const asnStruct: any = ASN1.decode(der);
      if (asnStruct.typeName() !== 'SEQUENCE' && asnStruct.sub === null) {
        errCallback('Неверная структура конверта сертификата (ожидается SEQUENCE)');
      } else {
        this.parseFields(asnStruct.sub[0], callback);
      }
    } catch (e) {
      errCallback(e);
    }
  }

  private parseFields(asnStruct: any, callback: Function): void {
    const commonName: string = this.getContentInSet(asnStruct.sub[3].sub, 'commonName');
    const issuerCN: string = this.getContentInSet(asnStruct.sub[5].sub, 'commonName');
    const validFrom: string = asnStruct.sub[4].sub[0].content().split(' ')[0];
    const validTill: string = asnStruct.sub[4].sub[1].content().split(' ')[0];

    callback({
      commonName: commonName,
      issuerCN: issuerCN,
      validFrom: validFrom,
      validTill: validTill,
    });
  }

  private getContentInSet(subs: Array<any>, desiredField: string): string {
    const isSoughtField: RegExp = new RegExp(desiredField);

    for (let i: number = 0; i < subs.length; i++) {
      const currentFieldName: string = subs[i].sub[0].sub[0].content();

      if (isSoughtField.test(currentFieldName)) {
        return subs[i].sub[0].sub[1].content();
      }
    }
  }
}
