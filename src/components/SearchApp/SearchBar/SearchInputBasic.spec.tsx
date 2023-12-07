import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { SearchInputBasic } from '@components/SearchApp/SearchBar/SearchInputBasic';
import userEvent from '@testing-library/user-event';

test('should trigger onChange and keypress of enter key', async () => {
  const onSetSelectFilters = jest.fn();
  const onSetSearchValue = jest.fn();
  const user = userEvent.setup();
  render(
    <TestWrapperNoOIDC>
      <SearchInputBasic
        searchValue={'search'}
        onSetSelectFilters={onSetSelectFilters}
        onSetSearchValue={onSetSearchValue}
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
test('should trigger handleSearchButton function', async () => {
  const onSetSelectFilters = jest.fn();
  const onSetSearchValue = jest.fn();
  const user = userEvent.setup();
  render(
    <TestWrapperNoOIDC>
      <SearchInputBasic
        searchValue={'search'}
        onSetSelectFilters={onSetSelectFilters}
        onSetSearchValue={onSetSearchValue}
      />
    </TestWrapperNoOIDC>
  );

  const button = screen.getByRole('button');
  await user.click(button);
});
