import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export const Pagination = createParamDecorator<PaginationDto>(
  (_, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ query: Record<'limit' | 'offset', string | undefined> }>();
    const { limit, offset } = request.query;

    return {
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    };
  },
);
