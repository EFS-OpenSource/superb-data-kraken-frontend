/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

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
