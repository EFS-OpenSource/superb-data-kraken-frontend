import { ButtonGroup } from 'react-bootstrap';
import { CustomButton } from '@components/index';
import { ButtonInfo } from '@customTypes/index';

export interface FilterBarProps {
  buttonInfo: ButtonInfo[];
  onClick: (value: string) => void;
  disabled: (value: string) => boolean;
}

function CustomButtonGroup({ buttonInfo, onClick, disabled }: FilterBarProps) {
  return (
    <ButtonGroup className=" rounded-lg">
      {buttonInfo.map((button) => (
        <CustomButton
          key={button.tooltip}
          icon={button.icon}
          variant="secondary"
          tooltipMessage={button.tooltip}
          onClick={() => onClick(button.value)}
          buttonDisabled={disabled(button.value)}
        />
      ))}
    </ButtonGroup>
  );
}

export default CustomButtonGroup;