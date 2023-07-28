import { Organization } from '@customTypes/index';

const MockOrganization: Organization = {
  id: 2,
  name: 'sdkcorestorage',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  confidentiality: 'INTERNAL',
  tags: [{ name: '#storage' }, { name: '#deposit' }],
  company: undefined,
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
        {
          name: 'Benutzer 3',
          email: 'benutzer3@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 4',
          email: 'benutzer4@email.com',
          roles: ['User', 'Trustee'],
        },
        {
          name: 'Benutzer 5',
          email: 'benutzer5@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 6',
          email: 'benutzer6@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 7',
          email: 'benutzer7@email.com',
          roles: ['User', 'Supplier'],
        },
        {
          name: 'Benutzer 8',
          email: 'benutzer8@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 9',
          email: 'benutzer9@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 10',
          email: 'benutzer10@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 11',
          email: 'benutzer11@email.com',
          roles: ['User'],
        },
        {
          name: 'Benutzer 12',
          email: 'benutzer12@email.com',
          roles: ['User', 'Owner'],
        },
        {
          name: 'Benutzer 13',
          email: 'benutzer13@email.com',
          roles: ['User'],
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
  ],
};

export default MockOrganization;
