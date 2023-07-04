import { IconType } from 'react-icons/lib';

export interface PageInfo {
  app: boolean;
  nameShort: string;
  name?: string;
  description?: string;
  descriptionDisabled?: string;
  path: string;
  icon: IconType;
  thumbnail?: string;
  buttonText?: string;
  page: React.ElementType;
  type?: string;
}
