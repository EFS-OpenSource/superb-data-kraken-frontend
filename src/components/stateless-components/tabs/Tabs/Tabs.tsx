import { Tab, Nav } from 'react-bootstrap';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Tab as TabType } from '@customTypes/tabs';
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

const Tabs = ({
  tabs,
  className,
  variant,
  activeStyle,
  inactiveStyle,
  disabledStyle,
}: TabsProps) => {
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
          ),
        )}
      </Nav>
      <Tab.Content
        className="ms-0 flex-grow-1"
        style={{ height: `calc(100%-60px)` }}
      >
        <Routes>
          {tabs.map((tab) => (
            <Route key={tab.path} path={tab.path} element={tab.content} />
          ))}
          <Route path="*" element={<Navigate to={tabs[0].path} replace />} />
        </Routes>
      </Tab.Content>
    </Tab.Container>
  );
};

export default Tabs;
