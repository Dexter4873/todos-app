import { NotFoundException } from '@nestjs/common';

export class ResourceNotFoundError extends NotFoundException {
  resource: string;
  identifier: string;
  value: string;

  constructor(resource: string, value: string, identifier: string = 'id') {
    super(
      `${resource} identified by ${identifier} with value ${value} not found.`,
    );
    this.resource = resource;
    this.identifier = identifier;
    this.value = value;
  }
}
