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

import { AppDependencyType } from '@assets/index';
import {
  AppNameType,
  OrgaRoleType,
  Capability,
  SpaceRoleType,
} from '@customTypes/index';

const checkAppAvailability = (
  appName: AppNameType,
  roles: SpaceRoleType[] | OrgaRoleType[],
  capabilities: Capability[] | undefined,
  appEnableConditions: Record<AppNameType, AppDependencyType>,
): boolean | undefined => {
  const App = appEnableConditions[appName];

  if (Object.keys(App).length === 0 || !roles || !capabilities) return true;

  if (Object.keys(App).length > 1)
    return (
      roles?.some((role: any) => App.roles?.includes(role)) &&
      capabilities?.some((capability) => App.capabilities?.includes(capability))
    );
  if (Object.keys(App).length === 1 && Object.keys(App).includes('roles'))
    return roles?.some((role: any) => App.roles?.includes(role));
  if (
    Object.keys(App).length === 1 &&
    Object.keys(App).includes('capabilities')
  )
    return capabilities?.some((capability) =>
      App.capabilities?.includes(capability),
    );

  return true;
};

export default checkAppAvailability;
