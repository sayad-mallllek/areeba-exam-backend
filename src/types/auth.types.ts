import { User } from '@prisma/client';

export type AuthUserType = Pick<User, 'id'>;
