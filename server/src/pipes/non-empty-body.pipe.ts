import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NonEmptyBodyPipe implements PipeTransform {
  transform(value: any) {
    if (!Object.keys(value).length)
      throw new BadRequestException('Body must not be empty');

    return value;
  }
}
