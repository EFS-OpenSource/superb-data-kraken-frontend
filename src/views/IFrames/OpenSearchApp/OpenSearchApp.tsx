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
