import { render } from '@testing-library/react';

import TabsWithoutPath from './TabsWithoutPath';

describe('TabsWithoutPath', () => {
  it('should render successfully', () => {
    const onSetActiveKey = jest.fn();
    const { baseElement } = render(
      <TabsWithoutPath
        tabs={[]}
        activeKey={''}
        onSetActiveKey={onSetActiveKey}
      />,
    );
    expect(baseElement).toBeTruthy();
  });
});
