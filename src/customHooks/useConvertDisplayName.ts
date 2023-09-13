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

import { useEffect } from 'react';
import { Organization, Space } from '@customTypes/index';

export const useConvertSpaceDisplayName = <T extends Space | Organization>(
  inputName: string,
  handleChange: (passedData: T) => void,
  data: T,
) => {
  const regexedName = inputName
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, '');

  let containerName = regexedName;

  if (regexedName.length >= 63) {
    containerName = regexedName.substring(0, 63);
  }

  useEffect(() => {
    if (!('id' in data) || ('id' in data && data.id === 0)) {
      handleChange({
        ...data,
        displayName: inputName,
        name: containerName,
      });
    } else {
      handleChange({ ...data, displayName: inputName });
    }
  }, [containerName, inputName, handleChange]);

  return containerName;
};

export const useConvertOrganizationDisplayName = <
  T extends Space | Organization,
>(
  inputName: string,
  handleChange: (passedData: T) => void,
  data: T,
) => {
  const regexedName = inputName
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/[^a-z0-9]/g, '');

  let containerName = regexedName;

  if (regexedName.length >= 23) {
    containerName = regexedName.substring(0, 23);
  }

  useEffect(() => {
    if (!('id' in data) || ('id' in data && data.id === 0)) {
      handleChange({
        ...data,
        displayName: inputName,
        name: containerName,
      });
    } else {
      handleChange({ ...data, displayName: inputName });
    }
  }, [containerName, inputName, handleChange]);

  return containerName;
};
