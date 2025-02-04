import { UrlExpiryEnum } from '@/vendors/enums/url-expiry.enum';

export const S3_SETTINGS_CONFIG = {
  [UrlExpiryEnum.Short]: 120,
  [UrlExpiryEnum.Medium]: 900,
  [UrlExpiryEnum.Long]: 3600,
  [UrlExpiryEnum.Maximum]: 3600 * 24,
};
