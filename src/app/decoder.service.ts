import { Injectable } from '@angular/core';
import ASN1 from '@lapo/asn1js';
import { DecoderData } from './interfaces/decoderData.interface';

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  public decode(binaryString: string): DecoderData {
    try {
      const asnStruct: any = ASN1.decode(binaryString);
      if (asnStruct.typeName() !== 'SEQUENCE' && asnStruct.sub === null) {
        throw new Error('Неверная структура конверта сертификата (ожидается SEQUENCE)');
      } else {
        return this.parseFields(asnStruct.sub[0]);
      }
    } catch (e) {
      throw e;
    }
  }

  private parseFields(asnStruct: any): DecoderData {
    const commonName: string = this.getContentInSet(asnStruct.sub[3].sub, 'commonName');
    const issuerCN: string = this.getContentInSet(asnStruct.sub[5].sub, 'commonName');
    const validFrom: string = asnStruct.sub[4].sub[0].content().split(' ')[0];
    const validTill: string = asnStruct.sub[4].sub[1].content().split(' ')[0];

    return {
      commonName: commonName,
      issuerCN: issuerCN,
      validFrom: validFrom,
      validTill: validTill,
    };
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
