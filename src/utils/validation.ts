const min = (value: string, minLength: number) => {
  return value.length >= minLength;
};

const max = (value: string, maxLength: number) => {
  return value.length <= maxLength;
};

const length = (
  value = '',
  minLength = 1,
  maxLength = Number.MAX_SAFE_INTEGER
) => {
  return min(value, minLength) && max(value, maxLength);
};

const isEmpty = (value: string | undefined) => {
  if (!value) {
    return true;
  }
  return value.trim() === '';
};

const onlyLetters = (value: string, allowedChars: string[] = []) => {
  const RE = new RegExp(`^[A-Za-zА-я${allowedChars.join('')}]+$`);
  return RE.test(value);
};

export const validatePassword = (value = '') => {
  if (isEmpty(value)) {
    return 'Field should not be empty';
  }

  if (!length(value, 5, 20)) {
    return 'Field should be 5-20 characters';
  }
  return true;
};

export const validateLogin = (value = '') => {
  if (isEmpty(value)) {
    return 'Field should not be empty';
  }

  if (!length(value, 3, 20)) {
    return 'Field should be 3-20 characters';
  }

  return true;
};

export const validateField = (value = '') => {
  if (isEmpty(value)) {
    return 'Field should not be empty';
  }
  
  return true;
};

export const validateTextField = (value = '') => {
  if (isEmpty(value)) {
    return 'Field should not be empty';
  }

  if (!onlyLetters(value, ['\\-'])) {
    return 'Field should contain only letters';
  }

  return true;
};

export const validateNumberField = (value = '') => {
  if (isEmpty(value)) {
    return 'Field should not be empty';
  }

  const isNumber = /\d/.test(value);
  
  if (!isNumber) {
    return 'Field should contain only numbers';
  }

  return true;
};

export const validateSigField = (value = '') => {
  if (isEmpty(value)) {
    return 'Field should not be empty';
  }

  const isSigType = /\.sig/.test(value);

  if (!isSigType) {
    return "Invalid file format. Should be '.sig'";
  }

  return true;
};
