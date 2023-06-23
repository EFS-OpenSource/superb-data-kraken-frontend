import React from 'react';
import { Nav } from 'react-bootstrap';
import { useIntl } from 'react-intl';

interface SecondaryTabProps {
  tab: string;
  disabled?: boolean;
}

const SecondaryTab: React.FC<SecondaryTabProps> = ({ tab, disabled }) => {
  const { formatMessage } = useIntl();

  return (
    <Nav.Item className="text-left mr-4 tab-width">
      <Nav.Link disabled={disabled}>
        <div>
          {formatMessage({
            id: tab,
          })}
        </div>
      </Nav.Link>
    </Nav.Item>
  );
};

export default SecondaryTab;
