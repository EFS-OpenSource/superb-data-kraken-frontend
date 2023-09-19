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
  BsSearch,
  BsGrid1X2Fill,
  BsHouseFill,
  BsArrowRepeat,
} from 'react-icons/bs';
import { HomePage, OpenSearchApp, ArgoWorkflow } from 'src/views';
import { SearchApp } from 'src/components';
import { PageInfo } from '../customTypes/pageInfoTypes';

export const appPageInfo = [
  {
    nameShort: 'HomePage.name-short',
    name: 'HomePage.name',
    description: 'HomePage.description',
    descriptionDisabled: 'App.disabled',
    path: '/home/*',
    icon: BsHouseFill,
    buttonText: 'HomePage.open-button',
    page: HomePage,
  },

  {
    nameShort: 'Search.name-short',
    name: 'Search.name',
    description: 'Search.description',
    descriptionDisabled: 'App.disabled',
    path: '/apps/search',
    icon: BsSearch,
    buttonText: 'SdkDashboard.open-button',
    page: SearchApp,
  },
  {
    nameShort: 'ElasticDashboard.name-short',
    name: 'ElasticDashboard.name',
    description: 'ElasticDashboard.description',
    descriptionDisabled: 'App.disabled',
    path: '/apps/dashboard',
    icon: BsGrid1X2Fill,
    buttonText: 'SdkDashboard.open-button',
    page: OpenSearchApp,
  },
] as unknown as PageInfo[];

console.log(process.env.VITE_WORKFLOW_URL);

if (process.env.VITE_WORKFLOW_URL) {
  appPageInfo.push({
    nameShort: 'WorkflowManagement.name-short',
    name: 'WorkflowManagement.name',
    description: 'WorkflowManagement.description',
    descriptionDisabled: 'App.disabled',
    path: '/apps/workflow',
    icon: BsArrowRepeat,
    buttonText: 'SdkDashboard.open-button',
    page: ArgoWorkflow,
  });
}

export const overViewInfo = [
  {
    nameShort: 'SdkDashboard.name-short',
    name: 'SdkDashboard.name',
    description: 'SdkDashboard.description',
    descriptionDisabled: 'App.disabled',
    path: '/apps',
    icon: BsHouseFill,
    buttonText: 'SdkDashboard.open-button',
    page: HomePage,
  },
] as unknown as PageInfo[];

export const pagesInfo = [
  ...overViewInfo,
  ...appPageInfo,
] as unknown as PageInfo[];
