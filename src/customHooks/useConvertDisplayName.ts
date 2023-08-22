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
