import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kittize'
})
export class KittizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value
      .split('')
      .map((letter, index) => index % 2 == 0 ? letter.toUpperCase() : letter.toLowerCase())
      .join('');
  }
}
