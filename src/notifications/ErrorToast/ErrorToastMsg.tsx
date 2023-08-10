import { useIntl } from 'react-intl';

interface ErrToastMsg {
  message?: string;
  errorStatus?: string | number;
  errorMessage?: string;
}

function ErrorToastMsg({
  message,
  errorStatus,
  errorMessage,
}: ErrToastMsg): JSX.Element {
  const { formatMessage } = useIntl();

  return (
    <div className="ms-3">
      <h5 className="mb-0 pb-0 ps-0">
        {typeof message !== 'undefined'
          ? formatMessage({ id: message })
          : formatMessage({ id: 'ErrorToast.title' })}
      </h5>
      {typeof errorStatus !== 'undefined' && (
        <div>
          {errorStatus && (
            <h6 className="mt-2 pb-0 ps-0">{`${errorStatus}`}</h6>
          )}
          {errorMessage && (
            <h6 className="mt-2 pb-0 ps-0">{`${formatMessage({
              id: errorMessage,
            })}`}</h6>
          )}
        </div>
      )}
    </div>
  );
}

export default ErrorToastMsg;
