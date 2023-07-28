import { Chip } from '@components/index';
import { useIntl } from 'react-intl';
import { OrgSpaceUserType } from '@customTypes/index';

const CustomCardBodyLayout = ({ data }: OrgSpaceUserType) => {
  const { formatMessage } = useIntl();

  return (
    <div className="p-0 d-flex align-items-start flex-column h-100">
      <div className="mt-2 mb-3">
        {data && data.description && data.description.length > 200
          ? `${data.description.substring(0, 200)}...`
          : data.description}
      </div>
      <div className="mt-auto mb-4">
        <div className="font-weight-medium mb-2">
          {formatMessage({
            id: 'Card.Owner',
          })}
        </div>
        <div>
          {data &&
            data.owners &&
            data.owners.map((owner) => (
              <Chip
                key={owner}
                text={owner}
                size="sm"
                activeColor="accent"
                disabled
                className="my-1"
              />
            ))}
        </div>
      </div>
      {/* TODO: Get list of owners from backend include them here */}
    </div>
  );
};

export default CustomCardBodyLayout;
