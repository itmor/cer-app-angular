import { Injectable } from '@angular/core';
declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class DecoderService {
  public errMessage: string = '';

  public decode(file: Blob, callback: Function): void {
    window.asnDecoder(
      file,
      (textResult: string) => this.parseFields(textResult, callback),
      (err: string) => this.addErorMessage(err)
    );
  }

  private parseFields(text: string, callback: Function): void {
    let cerText: string = text;
    /* 
      Find and cut fields from the general text, 
      since the order is taken into account
     */
    const organizationCommonName = cerText.match(
      /commonName(?:.|\n)*?\UTF8String\s+(.*?)\s+\s+/
    )[1];
    cerText = cerText.replace(
      /commonName(?:.|\n)*?\UTF8String\s+(.*?)\s+\s+/,
      ''
    );

    const subjectCommonName = cerText.match(
      /commonName(?:.|\n)*?\UTF8String\s+(.*?)\s+\s+/
    )[1];

    const validFrom = cerText.match(/UTCTime\s(.*?)(.*?)\s/)[2];
    cerText = cerText.replace(/UTCTime\s(.*?)(.*?)\s/, '');

    const validTill = cerText.match(/UTCTime\s(.*?)(.*?)\s/)[2];

    // Return StorageData object
    callback({
      id: Math.random().toString(36).substr(2, 5),
      name: this.removeQuotes(subjectCommonName),
      content: `Common Name: ${this.removeQuotes(subjectCommonName)}<br/>
      Issuer CN: ${this.removeQuotes(organizationCommonName)}<br/>
      Valid from: ${this.dateConvert(validFrom)}<br/>
      Valid till: ${this.dateConvert(validTill)}`,
    });

    // clear error layer
    this.errMessage = '';
  }

  private removeQuotes(text: string): string {
    return text.replace(/'/g, '');
  }

  private dateConvert(dateString: string): string {
    /* 
    Incoming parameters: 170427121437Z
    Returns: 2017-04-27
    */
    let date = dateString.replace(/'/g, '');
    const year = '20' + date.match(/[0-9][0-9]/);
    date = date.replace(/[0-9][0-9]/, '');

    const month = date.match(/[0-9][0-9]/);
    date = date.replace(/[0-9][0-9]/, '');

    const day = date.match(/[0-9][0-9]/);

    return `${year}-${month}-${day}`;
  }

  private addErorMessage(err: string) {
    this.errMessage += err;
  }
}
