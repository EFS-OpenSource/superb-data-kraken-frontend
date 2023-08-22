import {
  AppNameType,
  OrgaRoleType,
  Capability,
  SpaceRoleType,
} from '@customTypes/index';

export interface AppDependencyType {
  capabilities?: Capability[];
  roles?: SpaceRoleType[] | OrgaRoleType[];
}

export interface ModalTabDependencyType {
  roles?: SpaceRoleType[];
  owner?: boolean;
}

/* Empty objects of AppEnableConditions show that the App has no dependencies  */

export const AppEnableConditions: Record<AppNameType, AppDependencyType> = {
  Overview: {},
  Description: {},
  Spaces: {},
  Search: { capabilities: ['METADATA'] },
  Dashboard: { capabilities: ['METADATA', 'ANALYSIS'] },
  FileUpload: {
    capabilities: ['STORAGE'],
    roles: ['supplier', 'trustee'],
  },
};
