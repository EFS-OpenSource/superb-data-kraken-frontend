import { Organization } from './organizationTypes';

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
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

export interface OrgaSpaceUser<T> extends User {
  permissions: T[];
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

export interface UserRequestSpace extends UserRequestOrganization {
  spaceId: string;
}

export interface UserRequestOrganizationState extends UserRequestOrganization {
  id: number;
  created: Date;
  modified: Date;
  state: UserState;
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
  memberName?: string;
  memberEmail: string;
  memberRoles: JSX.Element;
  memberAction: JSX.Element | undefined;
}
