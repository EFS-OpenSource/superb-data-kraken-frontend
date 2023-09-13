/*
Copyright (C) 2023 e:fs TechHub GmbH (sdk@efs-techhub.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */

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
