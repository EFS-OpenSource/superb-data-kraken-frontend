import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Placement } from '@popperjs/core/lib/enums';
import PropTypes, { bool, oneOf, string } from 'prop-types';
import { colors } from '@customTypes/index';

export interface CustomButtonProps {
  icon: JSX.Element;
  onClick: (event: unknown) => void;
  size?: 'lg' | 'sm';
  buttonDisabled?: boolean;
  tooltipMessage?: string;
  placementTooltip?: Placement;
  variant?: (typeof colors)[number];
  variantDisabled?: (typeof colors)[number];
}

function CustomButton({
  size,
  icon,
  buttonDisabled,
  onClick,
  tooltipMessage,
  placementTooltip,
  variant,
  variantDisabled,
}: CustomButtonProps) {
  const { formatMessage } = useIntl();

  return (
    <OverlayTrigger
      placement={placementTooltip}
      overlay={
        <Tooltip id={`tooltip-${tooltipMessage}`}>
          {formatMessage({
            id: tooltipMessage,
          })}
        </Tooltip>
      }
    >
      <Button
        className="border border-dark"
        size={size}
        variant={buttonDisabled ? variantDisabled : variant}
        disabled={buttonDisabled}
        onClick={onClick}
      >
        {icon}
      </Button>
    </OverlayTrigger>
  );
}

CustomButton.propTypes = {
  buttonDisabled: bool,
  tooltipMessage: string,
  placementTooltip: oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'bottom',
    'right',
    'left',
    'top-start',
    'bottom-start',
    'right-start',
    'left-start',
    'top-end',
    'bottom-end',
    'right-end',
    'left-end',
  ]),
  variant: oneOf(colors),
  variantDisabled: oneOf(colors),
  size: oneOf(['sm', 'lg']),
};

CustomButton.defaultProps = {
  buttonDisabled: false,
  tooltipMessage: 'Tooltip',
  placementTooltip: 'top-start',
  variant: 'secondary',
  variantDisabled: 'dark',
  size: 'sm',
};

export default CustomButton;
