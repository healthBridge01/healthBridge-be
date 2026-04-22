import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import * as sysMsg from '../../../constants/system.messages';
import { UpdateNotificationDto } from '../dto/update-notification.dto';

export const UpdateProfileNotificationDoc = () =>
  applyDecorators(
    ApiBody({
      description: 'Data for updating user notification preferences',
      type: UpdateNotificationDto,
    }),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update user notification preferences' }),
    ApiOkResponse({
      description: sysMsg.NOTIFICATION_SETTINGS_UPDATED,
    }),
    ApiBadRequestResponse({
      description: sysMsg.VALIDATION_ERROR,
    }),
    ApiConflictResponse({
      description: sysMsg.USER_NOT_FOUND,
    }),
  );
