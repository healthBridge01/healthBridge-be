import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import * as sysMsg from '../../../constants/system.messages';
import { GetProfileDtoResponse } from '../dto/get-profile.dto';

export const GetProfileDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get user profile' }),
    ApiOkResponse({
      description: sysMsg.USER_PROFILE_RETRIEVED,
      type: GetProfileDtoResponse,
    }),
    ApiNotFoundResponse({
      description: sysMsg.USER_NOT_FOUND,
    }),
    ApiBadRequestResponse({
      description: sysMsg.VALIDATION_ERROR,
    }),
  );
