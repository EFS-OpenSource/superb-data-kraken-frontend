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

import { Tab, Nav } from 'react-bootstrap';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Tab as TabType } from '@customTypes/index';
import PrimaryTab from '../PrimaryTab/PrimaryTab';
import SecondaryTab from '../SecondaryTab/SecondaryTab';

interface TabsProps {
  tabs: TabType[];
  className?: string | undefined;
  variant?: 'tabs' | 'pills' | undefined;
  activeStyle?: string | undefined;
  inactiveStyle?: string | undefined;
  disabledStyle?: string;
}

function Tabs({
  tabs,
  className,
  variant,
  activeStyle,
  inactiveStyle,
  disabledStyle,
}: TabsProps) {
  const location = useLocation();

  return (
    <Tab.Container>
      <Nav
        className={`ms-0 text-primary flex-nowrap ps-lg-0 ps-0 ${className}`}
        variant={variant}
        defaultActiveKey={tabs[0].path}
      >
        {tabs.map((tab) =>
          tab.level === 'primary' ? (
            <PrimaryTab
              tab={tab.name}
              key={tab.name}
              activePath={location.pathname.replace(/^.+[/]/, '')}
              activeStyle={activeStyle}
              inactiveStyle={tab.disabled ? disabledStyle : inactiveStyle}
              tabPath={tab.path}
              disabled={tab.disabled}
              tooltipMessage={
                tab.tooltipMessage ? tab.tooltipMessage : undefined
              }
            />
          ) : (
            <SecondaryTab
              tab={tab.name}
              key={tab.name}
              disabled={tab.disabled}
            />
          )
        )}
      </Nav>
      <Tab.Content
        className='ms-0 flex-grow-1'
        style={{ height: `calc(100%-60px)` }}
      >
        <Routes>
          {tabs.map((tab) => (
            <Route key={tab.path} path={tab.path} element={tab.content} />
          ))}
          <Route path='*' element={<Navigate to={tabs[0].path} replace />} />
        </Routes>
      </Tab.Content>
    </Tab.Container>
  );
}

export default Tabs;
