import { lazy } from 'react';

export const SpaceTabs = (membersTabVisible: boolean) => ({
  General: {
    component: lazy(() => import('./SpaceGeneralTab/SpaceGeneralTab')),
    visiblity: true,
  },
  Members: {
    component: lazy(() => import('./MembersTab/MembersTab')),
    visiblity: membersTabVisible,
  },
  Data: {
    component: lazy(() => import('./SpaceDataTab/SpaceDataTab')),
    visiblity: true,
  },
});

export const OrganizationTabs = (membersTabVisible: boolean) => ({
  General: {
    component: lazy(
      () => import('./OrganizationGeneralTab/OrganizationGeneralTab'),
    ),
    visiblity: true,
  },
  Members: {
    component: lazy(() => import('./MembersTab/MembersTab')),
    visiblity: membersTabVisible,
  },
});
