import { Organization, StorageType } from './organizationTypes';
import { Space } from './spaceTypes';

export interface OrgSpaceDataType {
  orgData: Organization | undefined;
  spaceData: Space | undefined;
}

export interface OrgSpaceUserType {
  data: Organization | Space;
  cardType?: StorageType;
  userName?: string;
  orgName?: string;
}

export const AppNames = [
  'Overview',
  'Description',
  'Spaces',
  'Search',
  'Dashboard',
  'FileUpload',
  'CalculatorApp',
] as const;
export type AppNameType = (typeof AppNames)[number];
