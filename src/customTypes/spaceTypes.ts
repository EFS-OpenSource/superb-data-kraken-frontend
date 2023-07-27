export const Capabilities = [
  'STORAGE',
  'METADATA',
  'ANALYSIS',
] as const; /* TODO connect to /v1.0/capabilities in Organizationmanager */

export type Capability = (typeof Capabilities)[number];

export type AppType = 'SEARCH' | 'UPLOAD' | 'DASHBOARD';

export type SpaceState = 'OPEN' | 'CLOSED' | 'LOCKED' | 'DELETION';

export type Confidentiality = 'PUBLIC' | 'INTERNAL' | 'PRIVATE';

export interface Tag {
  name: string;
}

export interface Member {
  name: string;
  email?: string;
  roles?: string[];
}

export interface AppConfig {
  displayName: string;
  appType: AppType;
  path: string;
}

export interface Space {
  id: number;
  orgId?: number;
  tags?: Tag[];
  capabilities: Capability[];
  owners?: string[];
  appConfigs?: AppConfig[];
  metadataGenerate: boolean;
  name: string;
  identifier?: string;
  defaultRetentionTime?: number;
  state: SpaceState;
  description?: string;
  confidentiality?: Confidentiality;
  displayName?: string;
  schemaRef?: string;
  descriptionRef?: string;
  metadataIndexName?: string;
  gdprRelevant: boolean;
  members?: Member[];
}

export const userSpaceRoleTypes = ['user', 'trustee', 'supplier'] as const;
export const spaceRoleTypes = [...userSpaceRoleTypes, 'public'] as const;

export type UserSpaceRoleType = (typeof userSpaceRoleTypes)[number];
export type SpaceRoleType = (typeof spaceRoleTypes)[number];
