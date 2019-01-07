import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'entities'})
export class Entities implements PipeTransform {
  transform(value: any, arg: any = null): any {
 console.log(value);
    return Object.values(value);

    // .map(key => value[key]);
    }
}
