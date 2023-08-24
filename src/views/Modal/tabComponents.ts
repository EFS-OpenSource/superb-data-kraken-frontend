import { lazy } from 'react';

export const SpaceTabs = (isOwner: boolean) => ({
  General: {
    component: lazy(() => import('./SpaceGeneralTab/SpaceGeneralTab')),
    visiblity: true,
  },
  Members: {
    component: lazy(() => import('./MembersTab/MembersTab')),
    visiblity: isOwner,
  },
  Data: {
    component: lazy(() => import('./SpaceDataTab/SpaceDataTab')),
    visiblity: true,
  },
});

export const OrganizationTabs = (isOwner: boolean) => ({
  General: {
    component: lazy(
      () => import('./OrganizationGeneralTab/OrganizationGeneralTab'),
    ),
    visiblity: true,
  },
  Members: {
    component: lazy(() => import('./MembersTab/MembersTab')),
    visiblity: isOwner,
  },
});
