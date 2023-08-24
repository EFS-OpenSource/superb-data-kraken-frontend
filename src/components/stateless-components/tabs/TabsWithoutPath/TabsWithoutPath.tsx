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
