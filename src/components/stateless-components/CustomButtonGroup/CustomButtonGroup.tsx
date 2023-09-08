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
