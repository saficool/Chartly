import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumToArray',
    standalone: true
})
export class EnumToArrayPipe implements PipeTransform {
    transform(enumObject: any): { key: string; value: any }[] {
        return Object.keys(enumObject)
            .filter(key => isNaN(Number(key)))
            .map(key => ({ key: key, value: enumObject[key] }));
    }

}