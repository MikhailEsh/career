import { toast } from 'react-toastify';

export const notifyInfo = message => {
  toast(message);
};

export const notifyError = message => {
  toast.error(message);
};

export const notifyWarning = message => {
  toast.warn(message);
};

export const notifySuccess = message => {
  toast.success(message);
};
