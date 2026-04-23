/**
 * File upload constants
 * Centralized constants for file upload size limits and allowed MIME types
 */

// File size limits in bytes
export const MAX_PICTURE_UPLOAD_SIZE = 5 * 1024 * 1024; // 5MB

// Allowed MIME types for image uploads
export const ALLOWED_IMAGE_MIME_TYPES: readonly string[] = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
];
