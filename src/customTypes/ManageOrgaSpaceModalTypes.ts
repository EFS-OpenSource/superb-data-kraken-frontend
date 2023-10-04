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

import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from 'react';
import {
  Organization,
  Space,
  Owner,
  User,
  OrgaUser,
  SpaceUser,
} from '@customTypes/index';

export type ModalTypes =
  | 'createOrganization'
  | 'editOrganization'
  | 'createSpace'
  | 'editSpace';

export const OrganizationModalTabNames = ['General', 'Members'] as const;
export type OrganizationModalTabNameType =
  (typeof OrganizationModalTabNames)[number];

export const SpaceModalTabNames = ['General', 'Members', 'Data'] as const;
export type SpaceModalTabNameType = (typeof SpaceModalTabNames)[number];

export type ModalTabNameType =
  | typeof OrganizationModalTabNames
  | typeof SpaceModalTabNames;

export interface TabData {
  modalData: Space | Organization;
  handleChange: Dispatch<SetStateAction<Space | Organization>>;
  roles?: readonly string[];
  initialUsers?: User[];
  initialOwners?: Owner[];
  onUpdateOwners?: (updatedOwners: string[]) => void;
  onUpdateUsers?: (updatedUsers: OrgaUser[] | SpaceUser[]) => void;
  isOwner?: boolean;
}

export type MapType = {
  [key in OrganizationModalTabNameType | SpaceModalTabNameType]: {
    component: (
      ...args: TabData[]
    ) => ReactElement<
      unknown,
      string | JSXElementConstructor<unknown> | React.FunctionComponent
    > | null;
    visiblity: true;
  };
};
