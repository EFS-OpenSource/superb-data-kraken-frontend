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
  appConfigs?: AppConfig[];
  capabilities: Capability[];
  confidentiality?: Confidentiality;
  defaultRetentionTime?: number;
  description?: string;
  descriptionRef?: string;
  displayName?: string;
  gdprRelevant: boolean;
  identifier?: string;
  members?: Member[];
  metadataGenerate: boolean;
  metadataIndexName?: string;
  modified: string;
  name: string;
  orgId?: number;
  schemaRef?: string;
  state: SpaceState;
  tags?: Tag[];
  id: number;
  owners?: string[];
}

export const userSpaceRoleTypes = ['user', 'trustee', 'supplier'] as const;
export const spaceRoleTypes = [...userSpaceRoleTypes, 'public'] as const;

export type UserSpaceRoleType = (typeof userSpaceRoleTypes)[number];
export type SpaceRoleType = (typeof spaceRoleTypes)[number];
