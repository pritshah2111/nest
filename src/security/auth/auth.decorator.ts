import { SetMetadata } from '@nestjs/common';
import { AUTH_IS_PUSBLIC_KEY } from 'src/common/constants';

export const Public = () => SetMetadata(AUTH_IS_PUSBLIC_KEY, true);
