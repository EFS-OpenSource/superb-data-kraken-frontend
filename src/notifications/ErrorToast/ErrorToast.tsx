/* Libraries */
import { toast, ToastOptions, Id } from 'react-toastify';
import { DashboardLogos } from '@components/index';
import checkCode from '@utils/statusCodeArray';
import ErrorToastMsg from './ErrorToastMsg';

type ErrorToastProps = (
  message?: string,
  errorStatus?: string | number,
  errorMessage?: string,
  errorCode?: string,
  options?: ToastOptions,
) => Id;

const ErrorToast: ErrorToastProps = (
  message,
  errorStatus,
  errorMessage,
  errorCode,
  options,
) =>
  toast.error(
    <ErrorToastMsg
      message={message}
      errorStatus={errorStatus}
      errorMessage={checkCode(errorCode) || errorMessage}
    />,
    {
      icon: <DashboardLogos type="SDK" size="30px" color="text-danger" />,
      position: 'top-right',
      autoClose: 5000,
      progressClassName: 'bg-danger',
      ...options,
    },
  );

export default ErrorToast;
