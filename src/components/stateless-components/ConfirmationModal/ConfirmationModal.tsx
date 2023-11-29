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

import { useIntl } from 'react-intl';
import { Button, Modal } from 'react-bootstrap';

interface ConfirmationModalProps {
  show: boolean;
  confirmButtonText: string;
  onSetShow: (toggleShow: boolean) => void;
  onHandleSubmit: () => void;
  title?: string;
  message?: string;
}

function ConfirmationModal({
  show,
  confirmButtonText,
  onSetShow,
  onHandleSubmit,
  title,
  message,
}: ConfirmationModalProps) {
  const { formatMessage } = useIntl();
  return (
    <Modal centered show={show} onHide={() => onSetShow(false)}>
      <Modal.Header className='border-0' closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='border-0'>
        {formatMessage({
          id: message,
        })}
      </Modal.Body>
      <Modal.Footer className='border-0 d-flex justify-content-center'>
        <Button
          variant='outline-primary'
          data-testid='cancel'
          onClick={() => onSetShow(false)}
        >
          {formatMessage({
            id: 'AddEditOrgSpacesModal.cancel-button',
          })}
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            onHandleSubmit();
            onSetShow(false);
          }}
        >
          {formatMessage({
            id: confirmButtonText,
          })}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
