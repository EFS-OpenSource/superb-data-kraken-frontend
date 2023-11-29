import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import { SearchBar } from '@components/SearchApp/SearchBar/SearchBar';

it('should call handleToggler function', () => {
  const { baseElement } = render(
    <TestWrapperNoOIDC>
      <SearchBar
        searchInputBasic={<div />}
        searchInputAdvanced={<div />}
        onSetSelectFilters={() => []}
        hitCount={5}
        searchDuration={5}
        onSetHitCount={() => 5}
        onSetTableData={() => []}
        onSetSearchValue={() => 'test'}
        onAdvancedModeChange={() => true}
      />
    </TestWrapperNoOIDC>
  );

  const button = screen.getByRole('button');

  fireEvent.click(button);

  console.log(baseElement.innerHTML);
});
