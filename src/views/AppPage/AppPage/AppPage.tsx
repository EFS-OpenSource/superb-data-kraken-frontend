import React, {
  JSXElementConstructor,
  ReactElement,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LoadingIndicator, Tabs } from '@components/index';
import {
  OrgaRoleType,
  Organization,
  Capability,
  Space,
  SpaceRoleType,
  AppNameType,
  Tab,
  UserDataState,
} from '@customTypes/index';
// import { FeatureFlags } from '@e-fs-frontend-applications/sdk-frontend/contexts/FeatureContextProvider';
import { getOrganization, getSpace, getSpaces } from '@services/index';
import { useGetRoles } from '@customHooks/index';
import { checkAppAvailability } from '@utils/index';
import { AppEnableConditions } from '@assets/index';
import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc';
import AppPageHeader from '../AppPageHeader/AppPageHeader';

type MapType = {
  [key in AppNameType]: (
    ...args: any
  ) => ReactElement<
    unknown,
    string | JSXElementConstructor<unknown> | React.FunctionComponent
  > | null;
};

const components: MapType = {
  Search: React.lazy(() => import('../../../components/SearchApp/SearchApp')),
  Dashboard: React.lazy(
    () => import('../../IFrames/OpenSearchApp/OpenSearchApp'),
  ),
  Overview: React.lazy(() => import('../Overview/Overview')),
  Description: React.lazy(() => import('../Description/Description')),
  Spaces: React.lazy(() => import('../Spaces/Spaces')),
  FileUpload: React.lazy(() => import('../FileUpload/FileUpload')),
};

interface TabWithData extends Tab {
  orgData: Organization;
  spaceData: Space;
  userDataState: UserDataState;
  tooltipMessage?: string;
}

function AppPage() {
  const { orgID, spaceID } = useParams();
  // const { featureFlag } = useContext(FeatureFlags)
  const { isAuthenticated } = useOidc();
  const { idTokenPayload } = useOidcIdToken();
  const { formatMessage } = useIntl();

  const [userDataState, setUserDataState] = useState<UserDataState>();

  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        name: idTokenPayload.name,
        email: idTokenPayload.email,
        roles: idTokenPayload.roles,
      };

      setUserDataState(userData);
    }
  }, [idTokenPayload, isAuthenticated]);

  const { data: orgaData } = useQuery(['organization', orgID], () => {
    if (orgID) {
      return getOrganization(orgID);
    }

    return null;
  });

  const { data: spaceDataQuery } = useQuery(
    ['space', spaceID, `o_${orgID}`],
    () => {
      if (orgID && spaceID) {
        return getSpace(orgID, spaceID);
      }

      return null;
    },
  );

  const { data: orgaSpacesDataQuery } = useQuery(['spaces', orgID], () => {
    if (orgID) {
      return getSpaces(orgID);
    }

    return null;
  });

  const memoOrga = useMemo(() => orgaData, [orgaData]);
  const memoSpace = useMemo(() => spaceDataQuery, [spaceDataQuery]);
  const memoOrgaSpaces = useMemo(
    () => orgaSpacesDataQuery,
    [orgaSpacesDataQuery],
  );

  const [orgData, setOrgData] = useState<Organization>();
  const [spaceData, setSpaceData] = useState<Space>();
  const [orgaSpacesData, setOrgaSpacesData] = useState<Space[]>();
  const [appTabs, setAppTabs] = useState<TabWithData[]>();

  useEffect(() => {
    if (memoOrga && isAuthenticated) {
      setOrgData(memoOrga.data);
    }

    if (memoSpace && isAuthenticated) {
      setSpaceData(memoSpace.data);
    }

    if (memoOrgaSpaces && isAuthenticated) {
      setOrgaSpacesData(memoOrgaSpaces.data);
    }
  }, [memoOrga, memoSpace, memoOrgaSpaces, isAuthenticated]);

  const userSpaceRoles = useGetRoles<SpaceRoleType>(
    memoSpace?.data.name,
    'space',
  );

  const userOrganizationRoles = useGetRoles<OrgaRoleType>(
    memoOrga?.data.name,
    'organization',
  );

  const userRoles = spaceID ? userSpaceRoles : userOrganizationRoles;

  const handleAppTabs = useCallback(
    (appConfig: any) =>
      setAppTabs(
        appConfig.map((AppID: string) => {
          const CustomTag = components[AppID as keyof MapType];

          const capabilities = AppEnableConditions[
            AppID as AppNameType
          ].capabilities
            ?.map((cap: Capability) => ` ${cap}`)
            .join()
            .toLowerCase();

          let orgaSpacesCapabilities: Capability[] = [];

          if (!spaceData && orgaSpacesData) {
            orgaSpacesData?.forEach((value) => {
              value.capabilities.forEach((capabiliy) => {
                orgaSpacesCapabilities.push(capabiliy);
              });
            });

            orgaSpacesCapabilities = [...new Set(orgaSpacesCapabilities)];
          }

          const availability = checkAppAvailability(
            `${AppID}` as AppNameType,
            userRoles as SpaceRoleType[] | OrgaRoleType[],
            spaceData !== undefined
              ? spaceData?.capabilities
              : orgaSpacesCapabilities,
            AppEnableConditions,
          );

          const roles = AppEnableConditions[AppID as AppNameType].roles
            ?.map((role: any) => ` ${role}`)
            .join();

          const intlWrapper = (id: string, c?: string, r?: string) =>
            formatMessage({ id }, { capabilities: c, roles: r });

          const tooltip = () => {
            if (roles && capabilities)
              return intlWrapper(
                'AppPage.Tabs.app-disabled-roles-and-capabilities',
                capabilities,
                roles,
              );
            if (!roles && capabilities)
              return intlWrapper(
                'AppPage.Tabs.app-disabled-capabilities',
                capabilities,
              );
            if (roles && !capabilities)
              return intlWrapper('AppPage.Tabs.app-disabled-roles', roles);
            return undefined;
          };

          return {
            name: `AppPage.${AppID}`,
            id: `${AppID}`,
            level: 'primary',
            variant: 'tabs',
            path: `${AppID}`,
            orgData: { orgData },
            spaceData: { spaceData },
            userDataState: { userDataState },
            disabled: !availability,
            tooltipMessage: tooltip() !== undefined ? tooltip() : undefined,
            content: (
              <div
                style={{ width: '100%', height: '100%', minHeight: '440px' }}
                className="d-flex flex-column overflow-scroll"
              >
                <Suspense fallback={<LoadingIndicator />}>
                  <CustomTag orgData={orgData} spaceData={spaceData} />
                </Suspense>
              </div>
            ),
          };
        }),
      ),
    [
      formatMessage,
      orgData,
      spaceData,
      userDataState,
      orgaSpacesData,
      userRoles,
    ],
  );

  useEffect(() => {
    const orgAppConfig = ['Overview', 'Spaces', 'Search', 'Dashboard'];

    const spcAppConfig = ['Overview', 'Search', 'Dashboard', 'FileUpload'];

    // if (featureFlag.descriptionTab) {
    //   spcAppConfig = [...spcAppConfig, 'Description'];
    // }

    if (!spaceID) {
      handleAppTabs(orgAppConfig);
    } else {
      handleAppTabs(spcAppConfig);
    }
  }, [handleAppTabs, spaceID, orgData, orgaSpacesData]);

  return (
    <div>
      {orgData && <AppPageHeader orgData={orgData} spaceData={spaceData} />}
      <div className="justify-content-center m-0 p-0">
        {appTabs && (
          <Tabs
            tabs={appTabs}
            variant="tabs"
            className="bg-light mb-0 mb-0 sticky-top h3"
            activeStyle="pt-2 pb-2 px-4"
            inactiveStyle="pt-2 pb-2 px-4"
            disabledStyle="text-dark"
          />
        )}
      </div>
    </div>
  );
}

export default AppPage;
