import { render, fireEvent } from '@testing-library/react';
import InputText from './InputText';

describe('InputText', () => {
  test('renders input with correct placeholder', () => {
    const baseElement = render(
      <InputText placeholder="Enter some text" onChange={() => {}} />,
    );
    const input = baseElement.findByText('Home', {
      selector: 'button',
    });
    expect(input).toBeTruthy();
  });

  test('calls onChange callback when input value changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(
      <InputText placeholder="Enter some text" onChange={mockOnChange} />,
    );
    const input = getByPlaceholderText('Enter some text');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });
});
