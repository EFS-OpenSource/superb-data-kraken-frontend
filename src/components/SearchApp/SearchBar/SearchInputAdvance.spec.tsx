import { render, screen, waitFor } from '@testing-library/react';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { SearchInputAdvanced } from '@components/SearchApp/SearchBar/SearchInputAdvanced';
import userEvent from '@testing-library/user-event';

test('should render successfully', () => {
  const onSetSelectFilters = jest.fn();
  const onSetSearchValue = jest.fn();
  const onReducedIndexAttributes = jest.fn();
  render(
    <TestWrapperNoOIDC>
      <SearchInputAdvanced
        criteria={undefined}
        data={[]}
        searchValue={undefined}
        onSetSearchValue={onSetSearchValue}
        onSetSelectFilters={onSetSelectFilters}
        onReducedIndexAttributes={onReducedIndexAttributes}
      />
    </TestWrapperNoOIDC>
  );
});
test('should trigger onChange in input field', async () => {
  const onSetSelectFilters = jest.fn();
  const onSetSearchValue = jest.fn();
  const onReducedIndexAttributes = jest.fn();
  const user = userEvent.setup();
  render(
    <TestWrapperNoOIDC>
      <SearchInputAdvanced
        criteria={undefined}
        data={[]}
        searchValue={undefined}
        onSetSearchValue={onSetSearchValue}
        onSetSelectFilters={onSetSelectFilters}
        onReducedIndexAttributes={onReducedIndexAttributes}
      />
    </TestWrapperNoOIDC>
  );

  const input = screen.getByRole('textbox');
  await user.type(input, 'test');

  await user.keyboard('[Enter]');
  waitFor(() => {
    expect(input.textContent).toBe('test');
  });
});
test('should trigger onChange in SelectWithAutocomplete', async () => {
  const onSetSelectFilters = jest.fn();
  const onSetSearchValue = jest.fn();
  const onReducedIndexAttributes = jest.fn();
  const user = userEvent.setup();
  const { baseElement } = render(
    <TestWrapperNoOIDC>
      <SearchInputAdvanced
        criteria={undefined}
        data={[]}
        searchValue={undefined}
        onSetSearchValue={onSetSearchValue}
        onSetSelectFilters={onSetSelectFilters}
        onReducedIndexAttributes={onReducedIndexAttributes}
      />
    </TestWrapperNoOIDC>
  );

  console.log(baseElement.innerHTML);

  const input = screen.getByText('Attribut');
  // await user.type(input, 'test');
});
