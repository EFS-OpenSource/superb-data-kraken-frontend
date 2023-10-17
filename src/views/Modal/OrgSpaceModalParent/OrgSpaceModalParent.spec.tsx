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

import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import OrgSpaceModalParent from './OrgSpaceModalParent';

describe('OrgSpaceModalParent', () => {
  const handleClose = jest.fn();
  const handleSubmit = jest.fn();
  const setActiveKey = jest.fn();
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <OrgSpaceModalParent
          modalType={'createOrganization'}
          modalTabs={[]}
          show={false}
          validated={false}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          activeKey={''}
          setActiveKey={setActiveKey}
          nextButton={<button />}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with modalType editOrganization', () => {
    const { baseElement } = render(
      <TestWrapper>
        <OrgSpaceModalParent
          modalType={'editOrganization'}
          modalTabs={[]}
          show={false}
          validated={false}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          activeKey={''}
          setActiveKey={setActiveKey}
          nextButton={<button />}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with modalType createSpace', () => {
    const { baseElement } = render(
      <TestWrapper>
        <OrgSpaceModalParent
          modalType={'createSpace'}
          modalTabs={[]}
          show={false}
          validated={false}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          activeKey={''}
          setActiveKey={setActiveKey}
          nextButton={<button />}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with modalType editSpace', () => {
    const { baseElement } = render(
      <TestWrapper>
        <OrgSpaceModalParent
          modalType={'editSpace'}
          modalTabs={[]}
          show={false}
          validated={false}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          activeKey={''}
          setActiveKey={setActiveKey}
          nextButton={<button />}
        />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
