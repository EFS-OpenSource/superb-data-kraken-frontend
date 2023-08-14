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
