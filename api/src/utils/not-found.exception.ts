import { NotFoundException } from '@nestjs/common';

export function throwNotFoundException(entity: string, id: string): void {
  throw new NotFoundException(`${entity} with id ${id} not found`);
}
