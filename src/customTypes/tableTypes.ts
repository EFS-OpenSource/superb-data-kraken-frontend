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
