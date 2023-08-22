/* Libraries */
import { toast, ToastOptions, Id } from 'react-toastify';
import { DashboardLogos } from '@components/index';
import SuccessToastMsg from './SuccessToastMsg';

type SuccessToastProps = (
  message?: string,
  messageSubject?: string | number,
  MessageObject?: string | number,
  options?: ToastOptions,
) => Id;

const SuccessToast: SuccessToastProps = (
  message,
  messageSubject,
  messageObject,
  options,
) =>
  toast.error(
    <SuccessToastMsg
      message={message}
      messageSubject={messageSubject}
      messageObject={messageObject}
    />,
    {
      icon: <DashboardLogos type="SDK" size="30px" color="text-success" />,
      position: 'top-right',
      autoClose: 5000,
      progressClassName: 'bg-success',
      ...options,
    },
  );

export default SuccessToast;
