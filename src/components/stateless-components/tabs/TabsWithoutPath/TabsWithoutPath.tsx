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

import { Tabs, Tab } from 'react-bootstrap';
import { TabWithoutPath } from '@customTypes/index';

interface TabsProps {
  tabs: TabWithoutPath[];
  activeKey: string;
  onSetActiveKey: (key: any) => void;
  className?: string | undefined;
  variant?: 'tabs' | 'pills' | undefined;
  activeStyle?: string | undefined;
  inactiveStyle?: string | undefined;
}

function TabsWithoutPath({
  tabs,
  activeKey,
  onSetActiveKey,
  className,
  variant,
  activeStyle,
  inactiveStyle,
}: TabsProps) {
  return (
    <h3 className="ps-6 w-100">
      <Tabs
        activeKey={activeKey}
        onSelect={(k) => onSetActiveKey(k as string)}
        className={`mb-4 border-0 ${className}`}
        transition={false}
        variant={variant}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            title={tab.name}
            eventKey={tab.id}
            tabClassName={tab.id === activeKey ? activeStyle : inactiveStyle}
          >
            {tab.content}
          </Tab>
        ))}
      </Tabs>
    </h3>
  );
}

export default TabsWithoutPath;
