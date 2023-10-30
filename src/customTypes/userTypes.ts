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

import { UserSpaceRoleType } from '@customTypes/spaceTypes';
import { UserOrgaRoleType, Organization } from '@customTypes/organizationTypes';

export const States = ['OPEN', 'ACCEPTED', 'DECLINED'] as const;
export type UserState = (typeof States)[number];

export interface UserData {
  name: string;
  email: string;
  roles: string[];
  organizations: Organization[];
}

export interface UserDataState {
  name: string;
  email: string;
  roles: string[];
}

export interface User {
  createdTimestamp: number;
  email: string;
  enabled: boolean;
  firstName: string;
  id: string;
  lastName: string;
  username: string;
}

export interface OrgaSpaceUser<T> extends User {
  permissions: T[];
}

export interface OrgaUser extends User {
  permissions: UserOrgaRoleType | UserOrgaRoleType[];
}

export interface SpaceUser extends User {
  permissions: UserSpaceRoleType | UserSpaceRoleType[];
}

export interface SetOrgaSpaceUser<T> {
  email: string;
  permissions: T[];
}

export interface UserRequestOrganization {
  userId: string;
  orgaId: string;
  role: string;
}

export interface UserRequestOrganizationState extends UserRequestOrganization {
  created: Date;
  id: number;
  modified: Date;
  state: UserState;
}
export interface UserRequestSpace extends UserRequestOrganization {
  spaceId: string;
}

export interface UserRequestSpaceState
  extends UserRequestSpace,
    UserRequestOrganizationState {}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
}

export interface MembersToRenderType {
  memberFirstName?: string;
  memberLastName?: string;
  memberEmail: string;
  memberRoles: JSX.Element;
  memberAction: JSX.Element | undefined;
}
