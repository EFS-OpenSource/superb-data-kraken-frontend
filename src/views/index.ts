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

import HomePage from './HomePage/HomePage';
import OrgGrid from './OrgGrid/OrgGrid';
import ArgoWorkflow from './IFrames/ArgoWorkflow/ArgoWorkflow';
import OpenSearchApp from './IFrames/OpenSearchApp/OpenSearchApp';
import LoginPage from './LoginPage/LoginPage';
import AppPage from './AppPage/AppPage/AppPage';
import MembersTable from './Modal/MembersTab/MembersTable/MembersTable';
import OrgSpaceModalParent from './Modal/OrgSpaceModalParent/OrgSpaceModalParent';

export * from './Modal/tabComponents';

export {
  HomePage,
  OrgGrid,
  ArgoWorkflow,
  OpenSearchApp,
  LoginPage,
  AppPage,
  MembersTable,
  OrgSpaceModalParent,
};
