import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { BsFillXCircleFill } from 'react-icons/bs';
import { colors } from '@customTypes/index';

export interface InputChipProps {
  text: string;
  onClose: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: boolean;
  color?: (typeof colors)[number];
}

function InputChip({ text, onClose, size, rounded, color }: InputChipProps) {
  const Chip = (
    <Badge pill={rounded} bg={color}>
      {`${text || 'ChipText'}`}
      <BsFillXCircleFill
        role="button"
        onClick={onClose}
        size={13}
        style={{
          margin: '0px 2px 1px 10px',
        }}
      />
    </Badge>
  );

  switch (size) {
    case 'xs':
      return <h6>{Chip}</h6>;
    case 'sm':
      return <h5>{Chip}</h5>;
    case 'md':
      return <h4>{Chip}</h4>;
    case 'lg':
      return <h2>{Chip}</h2>;
    default:
      return <h6>{Chip}</h6>;
  }
}

InputChip.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  rounded: PropTypes.bool,
  color: PropTypes.oneOf(colors),
};

InputChip.defaultProps = {
  size: 'sm',
  color: 'middle',
  rounded: false,
};

export default InputChip;
