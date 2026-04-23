import { Readable } from 'stream';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'uploads',
  ): Promise<{
    secure_url: string;
    public_id: string;
    original_filename: string;
  }> {
    if (!file?.buffer) {
      throw new InternalServerErrorException('Invalid file or missing buffer');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          transformation: [
            { width: 800, crop: 'limit' }, // Resize if larger
            { quality: 'auto' },
            { fetch_format: 'auto' },
          ],
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(
              new InternalServerErrorException(
                'Error uploading image to Cloudinary',
              ),
            );
          }

          if (!result?.secure_url) {
            return reject(
              new InternalServerErrorException(
                'Upload failed - no URL returned',
              ),
            );
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            original_filename: result.original_filename,
          });
        },
      );

      // Convert buffer to readable stream and pipe to Cloudinary
      const readableStream = Readable.from(file.buffer);
      readableStream.pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      return false;
    }
  }
}
