import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
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
