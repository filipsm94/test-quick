import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'opaqueText' })
export class OpaqueTextPipe implements PipeTransform {
  transform(value: string, maxLength = 20): string {
    const visibleText = value.length > maxLength ? `${value.substring(0, maxLength)}...` : value
    return `${visibleText}`;
  }
}
