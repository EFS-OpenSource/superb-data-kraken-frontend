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
import { Bs0CircleFill } from 'react-icons/bs';

import Chip from './Chip';

describe('Chip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with no font size', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size='default' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with xs font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size='xs' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with sm font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size='sm' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with md font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size='md' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with lg font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size='lg' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with xl font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size='xl' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with icon passed', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip icon={<Bs0CircleFill />} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with icon passed and iconLeft true', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip icon={<Bs0CircleFill />} iconLeft />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with state:undefined', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip state={{ isActive: undefined }} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with state:true', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip state={{ isActive: true }} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with state:false', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip state={{ isActive: false }} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with disabled: true', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip disabled={true} />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with tooltip', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip tooltip='Confidentiality.PUBLIC-description' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with activeColor', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip activeColor='primary' inactiveColor='secondary' height='30px' />
      </TestWrapper>
    );
    expect(baseElement).toBeTruthy();
  });
});
