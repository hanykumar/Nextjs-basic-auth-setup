export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateRegisterInput(email: string, password: string, passwordConfirm: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!email || !validateEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (!password || !validatePassword(password)) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }

  if (password !== passwordConfirm) {
    errors.push({ field: 'passwordConfirm', message: 'Passwords do not match' });
  }

  return errors;
}

export function validateLoginInput(email: string, password: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!email || !validateEmail(email)) {
    errors.push({ field: 'email', message: 'Invalid email address' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  return errors;
}
