import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secToHMS',
})
export class SecToHMSPipe implements PipeTransform {
  transform(sec: number): string {
    if (sec < 3600) {
      return new Date(sec * 1000).toISOString().slice(14, 19);
    }
    return new Date(sec * 1000).toISOString().slice(11, 19);
  }
}
