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
      <Modal.Header className="border-0" closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0">
        {formatMessage({
          id: message,
        })}
      </Modal.Body>
      <Modal.Footer className="border-0 d-flex justify-content-center">
        <Button variant="outline-primary" onClick={() => onSetShow(false)}>
          {formatMessage({
            id: 'AddEditOrgSpacesModal.cancel-button',
          })}
        </Button>
        <Button
          variant="primary"
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
