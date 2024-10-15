import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityFunctionsService {

  constructor() { }

  public CsvToJson(csv: string): any[] {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      const obj: any = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j]?.trim() || '';
      }
      result.push(obj);
    }
    return result;
  }
  public FormatJsonData(data: any[]): any[] {
    return data.map(item => {
      let formattedItem: any = {};
      Object.keys(item).forEach(key => {
        let value = item[key];

        if (value === null || value === undefined) { formattedItem[key] = value; }
        else if (this.isNumeric(value)) { formattedItem[key] = parseFloat(value); }
        else if (value.toString().toLowerCase() === 'true' || value.toString().toLowerCase() === 'false') { formattedItem[key] = value.toString().toLowerCase() === 'true'; }
        // else if (this.isValidDate(value)) { formattedItem[key] = new Date(value); }
        else if (value === '') { formattedItem[key] = null; }
        else { formattedItem[key] = value; }

      });
      return formattedItem;
    });
  }
  public isNumeric(value: any): boolean {
    return !isNaN(value) && !isNaN(parseFloat(value));
  }
  public isValidDate(value: any): boolean {
    const date = Date.parse(value);
    return !isNaN(date);
  }
  public identifyColumnTypes(data: any[]): { numericalColumns: string[], categoricalColumns: string[] } {
    let numericalColumns: string[] = [];
    let categoricalColumns: string[] = [];
    if (data.length === 0) return { numericalColumns, categoricalColumns };

    const keys = Object.keys(data[0]);
    keys.forEach(key => {
      let isNumerical = true;
      for (let i = 0; i < data.length; i++) {
        const value = data[i][key];
        if (value === null || value === undefined) {
          continue;
        }
        if (!this.isNumeric(value)) {
          isNumerical = false;
          break;
        }
      }
      if (isNumerical) {
        numericalColumns.push(key);
      } else {
        categoricalColumns.push(key);
      }
    });

    return { numericalColumns, categoricalColumns };
  }
  public deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(this.deepClone) as any;
    }

    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = this.deepClone(obj[key]);
      }
    }

    return clonedObj;
  }
}
