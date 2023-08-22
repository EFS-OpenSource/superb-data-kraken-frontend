import { useIntl } from 'react-intl';

interface ErrToastMsg {
  message?: string;
  messageSubject?: string | number;
  messageObject?: string | number;
}

function SuccessToastMsg({
  message,
  messageSubject,
  messageObject,
}: ErrToastMsg): JSX.Element {
  const { formatMessage } = useIntl();

  return (
    <div className="ms-3">
      <h5 className="mb-0 pb-0 ps-0">
        {typeof message !== 'undefined'
          ? formatMessage({ id: message })
          : formatMessage({ id: 'SuccessToast.title' })}
      </h5>
      {typeof messageSubject !== 'undefined' && (
        <h6 className="mt-2 pb-0 ps-0">{messageSubject}</h6>
      )}
      {typeof messageObject !== 'undefined' && (
        <h6 className="mt-2 pb-0 ps-0">{messageObject}</h6>
      )}
    </div>
  );
}

export default SuccessToastMsg;
