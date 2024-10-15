import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniqueService {

  constructor() { }

  /**
  * Get unique objects based on a single property.
  * @param arr Array of objects.
  * @param property Property name to check for uniqueness.
  * @returns Array of unique objects based on the given property.
  */
  getUniqueByProperty<T, K extends keyof T>(arr: T[], property: K): T[] {
    return Array.from(new Set(arr.map((item) => item[property])))
      .map((value) => arr.find((item) => item[property] === value)!);
  }

  /**
   * Get unique objects based on multiple properties.
   * @param arr Array of objects.
   * @param properties Array of property names to check for uniqueness.
   * @returns Array of unique objects based on the given properties.
   */
  getUniqueByProperties<T>(arr: T[], properties: (keyof T)[]): T[] {
    return arr.filter(
      (value, index, self) =>
        index === self.findIndex((t) =>
          properties.every((prop) => t[prop] === value[prop])
        )
    );
  }

  /**
   * Get unique objects based on the entire object structure.
   * @param arr Array of objects.
   * @returns Array of unique objects based on the entire object structure.
   */
  getUniqueByWholeObject<T>(arr: T[]): T[] {
    return Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map(
      (str) => JSON.parse(str)
    );
  }

}
