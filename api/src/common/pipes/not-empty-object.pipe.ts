import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NotEmptyObjectPipe implements PipeTransform {
  transform(value: any) {
    if (value && Object.keys(value).length === 0) {
      throw new BadRequestException('The provided object should not be empty');
    }
    return value;
  }
}
