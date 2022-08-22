const trimValue = (value: any): any =>
  typeof value === 'string' ? value.trim() : value;

const validateRequired = (value: any): boolean =>
  trimValue(value) != null && trimValue(value) !== '';

const validateMaxLength = (value: any, length: number): boolean => {
  if (!value) return true;
  return value.length <= length;
};

const validateMinLength = (value: any, length: number): boolean => {
  if (!value) return false;
  return value.length >= length;
};

const EMAIL_REGEX = /^\s*[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}\s*$/i;

const isEmail = (value: string): boolean => EMAIL_REGEX.test(value);

const validateIsEmail = (value: string | null | undefined): boolean =>
  !!value && isEmail(value);

interface Validation {
  required: () => boolean;
  maxLength: (length: number) => boolean;
  minLength: (length: number) => boolean;
  isEmail: () => boolean;
}

export const fieldValidation = (value: any): Validation => ({
  required: (): boolean => validateRequired(value),
  maxLength: (length: number): boolean => validateMaxLength(value, length),
  minLength: (length: number): boolean => validateMinLength(value, length),
  isEmail: (): boolean => validateIsEmail(value),
});
