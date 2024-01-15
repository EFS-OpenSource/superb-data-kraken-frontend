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
import { useState as useStateMock } from 'react';
import { render, waitFor } from '@testing-library/react';
import SearchApp from './SearchApp';
import 'cross-fetch/polyfill';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { Filter } from '@customTypes/searchQueryTypes';
import MockOrganization from '@assets/UserData';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('SearchApp', () => {
  const setState = jest.fn();

  beforeEach(() => {
    (useStateMock as jest.Mock).mockImplementation((init) => [init, setState]);
  });
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <SearchApp
          orgData={MockOrganization}
          spaceData={MockOrganization.spaces[0]}
        />
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
  it('do things', (done) => {
    const [searchValue, setSearchValue] = useStateMock<string | undefined>(
      undefined
    );
    const [selectedFilters, setSelectedFilters] = useStateMock<Filter[]>([]);
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <SearchApp />
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();

    waitFor(() => {
      done();
      setSelectedFilters([{ operator: 'sd', property: 'we', value: 'as' }]);
      setSearchValue('hello');
    });
  });
  it('it has orgData & spaceData', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <SearchApp
          orgData={MockOrganization}
          spaceData={MockOrganization.spaces[0]}
        />
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
  it('it has orgData & spaceData, spaceData has NO metadataIndexName', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <SearchApp
          orgData={MockOrganization}
          spaceData={MockOrganization.spaces[1]}
        />
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
  it('it has orgData & NO spaceData', () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <SearchApp orgData={MockOrganization} />
      </TestWrapperNoOIDC>
    );
    expect(baseElement).toBeTruthy();
  });
});
