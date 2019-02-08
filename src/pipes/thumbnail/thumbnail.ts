import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {

  // transform(fileId: string, size: string): string {

  async transform(fileId: string, size: string) {
    const splitId = fileId.split('.');
    switch (size) {
      case 'small': {
        return `${splitId[0]}-tn160.png`;
      }
      case 'medium': {
        return `${splitId[0]}-tn320.png`;
      }
      case 'large': {
        return `${splitId[0]}-tn640.png`;
      }
      case 'screenshot': {
        return `${splitId[0]}.png`;
      }
      default: {
        return `${splitId[0]}-tn160.png`;
      }
    }
  }
}
