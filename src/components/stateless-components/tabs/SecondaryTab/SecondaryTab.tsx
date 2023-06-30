import { Nav } from 'react-bootstrap';
import { useIntl } from 'react-intl';

export interface SecondaryTabProps {
  tab: string;
  disabled?: boolean;
}

export const SecondaryTab = ({ tab, disabled }: SecondaryTabProps) => {
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
