import { IFieldItems } from './interfaces';
import { createPopup, openPopup, closePopup } from './popup';

import '@/assets/scss';

const emailInput = document.querySelector('#email-input') as HTMLInputElement;
const passwordInput = document.querySelector(
  '#password-input'
) as HTMLInputElement;
const repeatPasswordInput = document.querySelector(
  '#repeat-password-input'
) as HTMLInputElement;
const emailErrorMessage = document.querySelector(
  '#email-error-message'
) as HTMLSpanElement;
const passwordErrorMessage = document.querySelector(
  '#password-error-message'
) as HTMLSpanElement;
const repeatPasswordErrorMessage = document.querySelector(
  '#repeat-password-error-message'
) as HTMLSpanElement;
const emailSuccessIcon = document.querySelector(
  '#email-success-icon'
) as SVGAElement;
const emailErrorIcon = document.querySelector(
  '#email-error-icon'
) as SVGAElement;
const passwordSuccessIcon = document.querySelector(
  '#password-success-icon'
) as SVGAElement;
const passwordErrorIcon = document.querySelector(
  '#password-error-icon'
) as SVGAElement;
const repeatPasswordSuccessIcon = document.querySelector(
  '#repeat-password-success-icon'
) as SVGAElement;
const repeatPasswordErrorIcon = document.querySelector(
  '#repeat-password-error-icon'
) as SVGAElement;
const submitButton = document.querySelector(
  '#submit-button'
) as HTMLButtonElement;

const isError = (input: string): boolean => {
  let errorMessage: HTMLSpanElement;
  let errorIcon: SVGAElement;

  switch (input) {
    case 'E-mail':
      errorMessage = emailErrorMessage;
      errorIcon = emailErrorIcon;
      break;
    case 'Password':
      errorMessage = passwordErrorMessage;
      errorIcon = passwordErrorIcon;
      break;
    case 'Repeat password':
      errorMessage = repeatPasswordErrorMessage;
      errorIcon = repeatPasswordErrorIcon;
      break;
  }

  return (
    errorMessage.style.display !== 'none' || errorIcon.style.display !== 'none'
  );
};

const isEmailValid = (email: string): boolean => {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(email.toLowerCase());
};

const isLongerThan = (value: string, number: number): boolean =>
  value.length >= number;

const doPasswordsMatch = (): boolean =>
  passwordInput.value === repeatPasswordInput.value;

const setError = (message: string, fieldItems: IFieldItems): void => {
  const { inputItem, errorMessage, errorIcon, successIcon } = fieldItems;

  successIcon.style.display = 'none';
  inputItem.style.borderColor = '#ff1d1d';
  inputItem.style.color = '#ff1d1d';
  errorMessage.innerHTML = message;
  errorMessage.style.display = 'inline';
  errorIcon.style.display = 'inline';
};

const setSuccess = (fieldItems: IFieldItems): void => {
  const { inputItem, errorMessage, errorIcon, successIcon } = fieldItems;

  inputItem.style.borderColor = '#3bff2a';
  inputItem.style.color = '#3bff2a';
  errorMessage.style.display = 'none';
  errorIcon.style.display = 'none';
  successIcon.style.display = 'inline';
};

const checkWhichField = (input: string) => {
  let inputItem: HTMLInputElement;
  let inputValue: string;
  let successIcon: SVGAElement;
  let errorMessage: HTMLSpanElement;
  let errorIcon: SVGAElement;

  switch (input) {
    case 'E-mail':
      inputItem = emailInput;
      successIcon = emailSuccessIcon;
      errorMessage = emailErrorMessage;
      errorIcon = emailErrorIcon;
      break;
    case 'Password':
      inputItem = passwordInput;
      successIcon = passwordSuccessIcon;
      errorMessage = passwordErrorMessage;
      errorIcon = passwordErrorIcon;
      break;
    case 'Repeat password':
      inputItem = repeatPasswordInput;
      successIcon = repeatPasswordSuccessIcon;
      errorMessage = repeatPasswordErrorMessage;
      errorIcon = repeatPasswordErrorIcon;
      break;
  }

  inputValue = inputItem.value.trim();

  return {
    inputValue,
    fieldItems: {
      successIcon,
      inputItem,
      errorMessage,
      errorIcon
    }
  };
};

const checkInputValue = (input: string): void => {
  const field = checkWhichField(input);
  const { inputValue, fieldItems } = field;

  if (!inputValue) setError('Should not be empty', fieldItems);
  else if (!isLongerThan(inputValue, 6))
    setError('Should be at least 6 characters long', fieldItems);
  else if (input === 'E-mail' && !isEmailValid(inputValue))
    setError('Should be a valid e-mail address', fieldItems);
  else if (input === 'Repeat password' && !doPasswordsMatch())
    setError('Should match password', fieldItems);
  else setSuccess(fieldItems);

  if (!isError('E-mail') && !isError('Password') && !isError('Repeat password'))
    submitButton.disabled = false;
  else submitButton.disabled = true;
};

const closePopupWindow = (): void => {
  const popupButton = document.querySelector(
    '#pop-up__button'
  ) as HTMLButtonElement;
  popupButton.addEventListener('click', closePopup);
};

const submitForm = (): void => {
  const popup = document.querySelector('.pop-up') as HTMLDivElement;
  if (!popup) createPopup();
  openPopup();
  closePopupWindow();
};

emailInput.addEventListener('input', () => checkInputValue('E-mail'));
passwordInput.addEventListener('input', () => checkInputValue('Password'));
repeatPasswordInput.addEventListener('input', () =>
  checkInputValue('Repeat password')
);
submitButton.addEventListener('click', submitForm);
