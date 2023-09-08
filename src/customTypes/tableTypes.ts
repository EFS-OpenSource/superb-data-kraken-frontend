import { ColumnDef } from '@tanstack/react-table';
import { MassData, MeasurementIndex } from './measurementIndexTypes';

export type ColumnTypeSearch = ColumnDef<MeasurementIndex>;

export type ColumnTypeData = ColumnDef<MassData>;

export interface MeasurementInfoOverlayColumns extends MassData {
  download: JSX.Element;
}

export interface CustomTableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
  rowCountValues?: number[];
  tableName: string;
  withPagination?: boolean;
  withTotalFilter?: boolean;
  withDropdownColumnSelect?: boolean;
  withDropdownRowCount?: boolean;
  showColumnsFiltering?: boolean;
  customRowCount?: number;
  defaultColumnsVisibility?: any;
  overlayComponent?: boolean;
  onDataOverlayComponent?: (selectedRowData: T) => void;
}

export interface SearchColumns {
  massdata: {
    dateCreated: string[];
    date_created: string[];
    location: string[];
    name: string[];
    size: number[];
  };
  metadata: {
    dateTime: {
      createdAt: string;
    };
    description: string;
    environment: {
      name: string;
    };
    name: string;
    project: {
      confidentiality: string;
      name: string;
      purpose: string;
      type: string;
    };
    scope: {
      confidentiality: string;
      name: string;
      purpose: string;
    };
  };
  organization: string;
  space: string;
  uuid: string;
}
