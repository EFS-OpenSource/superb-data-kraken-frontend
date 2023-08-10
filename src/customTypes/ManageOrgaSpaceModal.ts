import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from 'react';
import { Organization, Space, Owner, User } from '@customTypes/index';

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

export interface TabData {
  modalData: Space | Organization;
  handleChange: Dispatch<SetStateAction<Space | Organization>>;
  roles?: readonly string[];
  initialUsers?: User[];
  initialOwners?: Owner[];
  onUpdateOwners?: (updatedOwners: string[]) => void;
  onUpdateUsers?: (updatedUsers: Record<string, unknown>[]) => void;
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
