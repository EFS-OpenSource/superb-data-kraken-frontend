import { render, screen, logRoles, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestWrapperNoOIDC from '@utils/TestWrapper/TestWrapperNoOIDC';
import CustomTable from '@components/CustomTable/CustomTable';

describe('Custom Table', () => {
  const user = userEvent.setup();
  it('should successfully render a CustomTable component', async () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <CustomTable columns={[]} data={[]} tableName={''} />
      </TestWrapperNoOIDC>
    );

    expect(baseElement).toBeTruthy();
  });
  it('should open the global filtering input prompt on click, enter a string to filter and close the filter input', async () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <CustomTable columns={[]} data={[]} tableName={''} withTotalFilter />
      </TestWrapperNoOIDC>
    );

    const globalFilteringButton = screen.getByRole('button', {
      name: 'globalFilterIcon',
    });
    expect(globalFilteringButton).toBeTruthy();
    await user.click(globalFilteringButton);

    const filterInput = screen.getByPlaceholderText('In allen Spalten filtern');
    expect(filterInput).toBeTruthy();

    expect(filterInput.textContent).toBe('');
    await user.type(filterInput, 'filter input');
    waitFor(() => {
      expect(filterInput.textContent).toBe('filter input');
    });

    const closeButton = screen.getByRole('button', { name: 'closeButton' });
    expect(closeButton).toBeTruthy();
    await user.click(closeButton);
  });

  it('should open the column filtering input prompt on click', async () => {
    const { baseElement } = render(
      <TestWrapperNoOIDC>
        <CustomTable
          columns={[]}
          data={[]}
          tableName={''}
          showColumnsFiltering
        />
      </TestWrapperNoOIDC>
    );
    const button = screen.getByRole('button', { name: 'columnsFiltering' });
    await user.click(button);
  });
});
