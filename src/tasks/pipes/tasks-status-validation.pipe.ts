import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TasksStatusValidationPipe implements PipeTransform{

  transform(value: any, metadata: ArgumentMetadata): any {
    console.log(value);
    return value;
  }
}
