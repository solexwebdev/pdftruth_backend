import { applyDecorators, UseGuards } from '@nestjs/common';
import { CheckPointGuard } from '../guards/check-point.guard';

export const CheckPoints = () => {
  return applyDecorators(UseGuards(CheckPointGuard));
};
