import { Injectable } from '@angular/core';
import { IStringTransformer } from '../interfaces/string-transformer.interface';
import { TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StringTransformerService implements IStringTransformer {

  constructor(private titleCasePipe: TitleCasePipe) { }

  ConvertToTitleCase(text: string): string {
    return this.titleCasePipe.transform(text);
  }
}
