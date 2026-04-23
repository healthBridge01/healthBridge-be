import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

export const DeleteUserAccountDoc = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete user account',
      description:
        "Permanently deletes the authenticated user's account and all associated data. This action is irreversible.",
    }),
    ApiResponse({
      status: 200,
      description: 'Account deleted successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Account deleted successfully',
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized — missing or invalid bearer token.',
      schema: {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
        },
      },
    }),
    ApiResponse({
      status: 403,
      description:
        'Forbidden — insufficient permissions to delete this account.',
      schema: {
        example: {
          statusCode: 403,
          message: 'Forbidden',
          error: 'Forbidden',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: 'Not found — user account does not exist.',
      schema: {
        example: {
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found',
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
      schema: {
        example: {
          statusCode: 500,
          message: 'Internal server error',
          error: 'Internal Server Error',
        },
      },
    }),
  );
