const PHONE_REGEX = /^(\+?6?01)[0-9]\d{7,8}$/;

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/[^\d+]/g, '');
  const withoutCountryCode = cleaned.replace(/^\+?6?/, '');
  return withoutCountryCode.startsWith('0') ? withoutCountryCode : '0' + withoutCountryCode;
};

export const isValidPhoneNumber = (value: string): boolean => PHONE_REGEX.test(value);

export const phonePattern = PHONE_REGEX;
