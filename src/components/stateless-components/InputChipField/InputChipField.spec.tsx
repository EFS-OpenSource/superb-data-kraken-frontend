import { fireEvent, render, screen } from '@testing-library/react';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { InputChipField } from '@components/index';

it('should render successfully', () => {
  const selectedFilters = jest.fn();
  const onReducedIndexAttributes = jest.fn();
  const onSetTableData = jest.fn();
  const selecteonSetHitCountdFilters = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <InputChipField
        selectedFilters={[]}
        indexAttributes={[]}
        reducedIndexAttributes={[]}
        onSelectedFilters={selectedFilters}
        onReducedIndexAttributes={onReducedIndexAttributes}
        onSetTableData={onSetTableData}
        onSetHitCount={selecteonSetHitCountdFilters}
      />
    </TestWrapperNoOIDC>
  );
});
it('should render with selectedFilters and click the available buttons', () => {
  const selectedFilters = jest.fn();
  const onReducedIndexAttributes = jest.fn();
  const onSetTableData = jest.fn();
  const selecteonSetHitCountdFilters = jest.fn();

  const { baseElement } = render(
    <TestWrapperNoOIDC>
      <InputChipField
        selectedFilters={[
          { operator: 'string', property: 'string', value: 'string' },
        ]}
        indexAttributes={[]}
        reducedIndexAttributes={[]}
        onSelectedFilters={selectedFilters}
        onReducedIndexAttributes={onReducedIndexAttributes}
        onSetTableData={onSetTableData}
        onSetHitCount={selecteonSetHitCountdFilters}
      />
    </TestWrapperNoOIDC>
  );

  const buttons = screen.getAllByRole('button');
  buttons.forEach((button) => {
    fireEvent.click(button);
  });
});
