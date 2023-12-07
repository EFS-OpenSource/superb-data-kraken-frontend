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

import { Organization } from '@customTypes/index';

const MockOrganization: Organization = {
  id: 2,
  name: 'sdkcorestorage',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  confidentiality: 'INTERNAL',
  tags: [{ name: '#storage' }, { name: '#deposit' }],
  company: 'efs',
  owners: [
    'Peter Parker',
    'Paul McCartney',
    'Mary J. Blige',
    'Michael Jackson',
    'Martin Guenduez',
  ],
  displayName: 'sdkcorestorage',
  appConfigs: [],
  spaces: [
    {
      id: 170,
      name: 'sdkdemo',
      identifier: 'sdkdemo',
      defaultRetentionTime: 365,
      description: 'SDK Demo Bereich',
      confidentiality: 'INTERNAL',
      metadataGenerate: true,
      modified: '',
      tags: [
        {
          name: '#sdkDemo',
        },
      ],
      capabilities: ['ANALYSIS', 'METADATA'],
      owners: ['Martin Guenduez'],
      members: [
        {
          name: 'SPACE Benutzer 1',
          email: 'benutzer1@email.com',
          roles: ['admin'],
        },
        {
          name: 'Benutzer 2',
          email: 'benutzer2@email.com',
          roles: ['User', 'Supplier'],
        },
      ],
      appConfigs: [],
      state: 'OPEN',
      displayName: 'sdkdemo',
      schemaRef: '',
      descriptionRef: '',
      metadataIndexName: 'sdkcorestorage_sdkdemo_measurements',
      gdprRelevant: true,
    },
    {
      id: 180,
      name: 'test space',
      identifier: 'test space',
      defaultRetentionTime: 365,
      description: 'test Bereich',
      confidentiality: 'INTERNAL',
      metadataGenerate: true,
      modified: '',
      tags: [
        {
          name: '#sdkDemo',
        },
      ],
      capabilities: [],
      owners: ['Martin Guenduez'],
      members: [
        {
          name: 'SPACE Benutzer 1',
          email: 'benutzer1@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 2',
          email: 'benutzer2@email.com',
          roles: ['User', 'Supplier'],
        },
      ],
      appConfigs: [],
      state: 'CLOSED',
      displayName: 'test',
      schemaRef: '',
      descriptionRef: '',
      gdprRelevant: true,
    },
    {
      id: 181,
      name: 'test space2',
      identifier: 'test space2',
      defaultRetentionTime: 365,
      description: 'test Bereich2',
      confidentiality: 'INTERNAL',
      metadataGenerate: true,
      modified: '',
      tags: [
        {
          name: '#sdkDemo',
        },
      ],
      capabilities: [],
      owners: ['Martin Guenduez'],
      members: [
        {
          name: 'SPACE Benutzer 1',
          email: 'benutzer1@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 2',
          email: 'benutzer2@email.com',
          roles: ['User', 'Supplier'],
        },
      ],
      appConfigs: [],
      state: 'LOCKED',
      displayName: 'test',
      schemaRef: '',
      descriptionRef: '',
      gdprRelevant: true,
    },
    {
      id: 182,
      name: 'test space3',
      identifier: 'test space3',
      defaultRetentionTime: 365,
      description: 'test Bereich3',
      confidentiality: 'INTERNAL',
      metadataGenerate: true,
      modified: '',
      tags: [
        {
          name: '#sdkDemo',
        },
      ],
      capabilities: [],
      owners: ['Martin Guenduez'],
      members: [
        {
          name: 'SPACE Benutzer 1',
          email: 'benutzer1@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 2',
          email: 'benutzer2@email.com',
          roles: ['User', 'Supplier'],
        },
      ],
      appConfigs: [],
      state: 'DELETION',
      displayName: 'test',
      schemaRef: '',
      descriptionRef: '',
      gdprRelevant: true,
    },
    {
      id: 183,
      name: 'test space4',
      identifier: 'test space4',
      defaultRetentionTime: 365,
      description: 'test Bereich3',
      confidentiality: 'INTERNAL',
      metadataGenerate: true,
      modified: '',
      tags: [
        {
          name: '#sdkDemo',
        },
      ],
      capabilities: [],
      owners: ['Martin Guenduez'],
      members: [
        {
          name: 'SPACE Benutzer 1',
          email: 'benutzer1@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 2',
          email: 'benutzer2@email.com',
          roles: ['User', 'Supplier'],
        },
      ],
      appConfigs: [],
      state: 'DELETION',
      displayName: 'test',
      schemaRef: '',
      descriptionRef: '',
      gdprRelevant: true,
    },
  ],
};

export default MockOrganization;
