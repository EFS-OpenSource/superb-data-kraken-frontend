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

import { Nav } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

interface PrimaryTabProps {
  tab: string;
  activePath?: string;
  activeStyle: string | undefined;
  inactiveStyle: string | undefined;
  tabPath: string;
  disabled?: boolean;
  tooltipMessage?: string;
}

function PrimaryTab({
  tab,
  activePath,
  activeStyle,
  inactiveStyle,
  tabPath,
  disabled,
  tooltipMessage,
}: PrimaryTabProps) {
  const { formatMessage } = useIntl();

  const TabComponent = (
    <Nav.Item className='text-center tab-width'>
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
      placement='bottom'
      transition={false}
      overlay={<Tooltip id={`tooltip-${tab}`}>{tooltipMessage}</Tooltip>}
    >
      {TabComponent}
    </OverlayTrigger>
  ) : (
    TabComponent
  );
}

export default PrimaryTab;
