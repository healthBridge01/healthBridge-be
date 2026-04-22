import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import * as sysMsg from '../../../constants/system.messages';
import { UpdateProfileDto } from '../dto/update-profile.dto';

export const UpdateProfileDoc = () =>
  applyDecorators(
    ApiBody({
      description: 'Data for updating user profile',
      type: UpdateProfileDto,
    }),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update user profile' }),
    ApiOkResponse({
      description: sysMsg.USER_PROFILE_UPDATED,
    }),
    ApiUnauthorizedResponse({
      description: sysMsg.UNAUTHORIZED,
    }),
  );
