import { ReactElement } from 'react';
import Iframe from 'react-iframe';
import { Organization, Space } from '@customTypes/index';

interface DashboardAppProps {
  orgData?: Organization;
  spaceData?: Space;
}

function DashboardApp({ orgData, spaceData }: DashboardAppProps): ReactElement {
  // const dashboardInfo = orgData?.appConfigs.find(
  //     (appConfig) => appConfig.appType === 'DASHBOARD'
  // )

  const orgURL =
    typeof orgData !== 'undefined'
      ? (process.env.VITE_DASHBOARD_URL as string) + orgData.name
      : (process.env.VITE_DASHBOARD_URL as string);

  const tenantURL =
    typeof spaceData !== 'undefined' ? `${orgURL}_${spaceData.name}` : orgURL;

  return (
    <div style={{ height: '100vh' }}>
      <Iframe
        url={tenantURL}
        width="100%"
        height="100%"
        id="iframe-dash"
        className="Dashboards-iframe-class"
        position="relative"
        overflow="scroll"
        frameBorder={0}
      />
    </div>
  );
}

export default DashboardApp;
