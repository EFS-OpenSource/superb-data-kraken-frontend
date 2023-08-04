import { render } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import { Bs0CircleFill } from 'react-icons/bs';

import Chip from './Chip';

describe('Chip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with xs font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size="xs" />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with md font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size="md" />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with lg font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size="lg" />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with xl font', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip size="xl" />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with icon passed', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip icon={<Bs0CircleFill />} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with icon passed and iconLeft true', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip icon={<Bs0CircleFill />} iconLeft />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully with state:undefined', () => {
    const { baseElement } = render(
      <TestWrapper>
        <Chip state={{ isActive: undefined }} />
      </TestWrapper>,
    );
    expect(baseElement).toBeTruthy();
  });
});
