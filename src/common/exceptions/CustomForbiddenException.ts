import { ForbiddenException } from '@nestjs/common';

export class CustomForbiddenException extends ForbiddenException {
  constructor(userId: string, targetId: string, action: string, type: string) {
    super(
      `User ${userId} is forbidden to ${action} on ${type} with id ${targetId}`,
    );
  }
}
