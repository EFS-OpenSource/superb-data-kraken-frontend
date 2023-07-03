import {
  BsSearch,
  BsGrid1X2Fill,
  BsHouseFill,
  BsArrowRepeat,
} from 'react-icons/bs';
// import { SiJupyter } from 'react-icons/si';
import { HomePage, OpenSearchApp, ArgoWorkflow } from 'src/views';
import { SearchApp } from 'src/components';
import { PageInfo } from '../customTypes/pageInfo';

// import { ArgoWorkflow } from '../../pages/ArgoWorkflow';
// import SearchApp from '../../parts/search-app/SearchApp';

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
  {
    nameShort: 'WorkflowManagement.name-short',
    name: 'WorkflowManagement.name',
    description: 'WorkflowManagement.description',
    descriptionDisabled: 'App.disabled',
    path: '/apps/workflow',
    icon: BsArrowRepeat,
    buttonText: 'SdkDashboard.open-button',
    page: ArgoWorkflow,
  },
  // {
  //     nameShort: 'JupyterHub.name-short',
  //     name: 'JupyterHub.name',
  //     description: 'JupyterHub.description',
  //     descriptionDisabled: 'App.disabled',
  //     path: '/apps/jupyterhub',
  //     icon: SiJupyter,
  //     buttonText: 'SdkDashboard.open-button',
  //     page: <JupyterHub />,

  // },
] as unknown as PageInfo[];

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
