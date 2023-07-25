import { Confidentiality, Tag, AppConfig, Space } from './spaceTypes';

export interface Organization {
  id: number;
  name: string;
  confidentiality: Confidentiality;
  company: string | undefined;
  spaces: Space[];
  description?: string;
  tags?: Tag[];
  owners?: string[];
  displayName?: string;
  appConfigs?: AppConfig[];
}

export interface OrganizationBaseInfo {
  name: string;
  id: number;
}

export const userOrgaRoleTypes = ['access', 'trustee', 'admin'] as const;
export const orgaRoleTypes = [...userOrgaRoleTypes, 'public'] as const;

export type UserOrgaRoleType = (typeof userOrgaRoleTypes)[number];
export type OrgaRoleType = (typeof orgaRoleTypes)[number];

export const storageTypes = ['space', 'organization'] as const;
export type StorageType = (typeof storageTypes)[number];
