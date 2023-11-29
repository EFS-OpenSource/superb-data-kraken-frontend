import { fireEvent, render, screen } from '@testing-library/react';
import TestWrapper from '@utils/TestWrapper/TestWrapper.spec';
import CustomButtonGroup from '@components/stateless-components/CustomButtonGroup/CustomButtonGroup';
import Icon from '@components/stateless-components/Icon/Icon';
import { FaEquals, FaGreaterThan } from 'react-icons/fa';
import { CustomButton } from '@components/index';

const buttonInfo = [
  {
    icon: <Icon icon={FaEquals} size={12} />,
    tooltip: 'Search.equal-button',
    value: 'EQ',
  },
  {
    icon: <Icon icon={FaGreaterThan} size={12} />,
    tooltip: 'Search.greater-than-button',
    value: 'GT',
  },
];
it('should render successfully and buttons should be clickable', () => {
  const onClick = jest.fn();
  const disabled = jest.fn();
  const { baseElement } = render(
    <TestWrapper>
      <CustomButtonGroup
        buttonInfo={buttonInfo}
        onClick={onClick}
        disabled={disabled}
      />
    </TestWrapper>
  );

  const buttons = screen.getAllByRole('button');

  buttons.map((button) => {
    fireEvent.click(button);
  });
});
