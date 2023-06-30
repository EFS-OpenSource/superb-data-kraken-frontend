import { Nav } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export interface PrimaryTabProps {
  tab: string;
  activePath?: string;
  activeStyle: string | undefined;
  inactiveStyle: string | undefined;
  tabPath: string;
  disabled?: boolean;
  tooltipMessage?: string;
}

export const PrimaryTab = ({
  tab,
  activePath,
  activeStyle,
  inactiveStyle,
  tabPath,
  disabled,
  tooltipMessage,
}: PrimaryTabProps) => {
  const { formatMessage } = useIntl();

  const TabComponent = (
    <Nav.Item className="text-center tab-width">
      <Nav.Link
        as={NavLink}
        to={tabPath}
        className={`text-primary pb-0 ${
          activePath === tabPath ? activeStyle : inactiveStyle
        }`}
        disabled={disabled}
      >
        <div
          className={`${activePath === tabPath ? 'font-weight-medium' : ''}`}
        >
          {formatMessage({
            id: tab,
          })}
        </div>
      </Nav.Link>
    </Nav.Item>
  );

  return disabled ? (
    <OverlayTrigger
      key={tab}
      placement="bottom"
      transition={false}
      overlay={<Tooltip id={`tooltip-${tab}`}>{tooltipMessage}</Tooltip>}
    >
      {TabComponent}
    </OverlayTrigger>
  ) : (
    TabComponent
  );
};
