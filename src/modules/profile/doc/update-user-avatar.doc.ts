import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export const UpdateProfileAvatar = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update profile avatar',
      description:
        "Uploads and updates the authenticated user's profile avatar image.",
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: 'Avatar image file (jpg, jpeg, png, webp)',
          },
        },
        required: ['file'],
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Avatar updated successfully.',
      schema: {
        example: {
          statusCode: 200,
          message: 'Avatar updated successfully',
          data: {
            avatarUrl: 'https://cdn.example.com/avatars/user-123.jpg',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request — no file provided or unsupported file type.',
      schema: {
        example: {
          statusCode: 400,
          message: 'File is required',
          error: 'Bad Request',
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
      status: 413,
      description: 'Payload too large — file exceeds the maximum allowed size.',
      schema: {
        example: {
          statusCode: 413,
          message: 'File too large',
          error: 'Payload Too Large',
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
