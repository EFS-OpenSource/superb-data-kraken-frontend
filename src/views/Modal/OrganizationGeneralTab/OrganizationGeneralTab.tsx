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

import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Form } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { FiInfo } from 'react-icons/fi';
import {
  Chip,
  FormInput,
  FormRadioButtons,
  FormTextarea,
  Icon,
  OrganizationAddTagPopover,
} from '@components/index';
import { useConvertOrganizationDisplayName } from '@customHooks/index';
import { Organization } from '@customTypes/index';

function OrganizationGeneralTab({
  handleChange,
  modalData,
}: {
  handleChange: (passedData: Organization) => void;
  modalData: Organization;
}) {
  const { formatMessage } = useIntl();

  const handleAddOrgaTag = (tag: { name: string }) => {
    handleChange({
      ...modalData,
      tags: modalData.tags ? [...modalData.tags, tag] : [tag],
    });
  };

  const handleRemoveSpaceTag = (tag: { name: string }) => {
    handleChange({
      ...modalData,
      tags: modalData?.tags?.filter((t) => t.name !== tag.name),
    });
  };

  const [inputName, setInputName] = useState(
    modalData.displayName || modalData.name
  );
  useConvertOrganizationDisplayName(inputName, handleChange, modalData);

  const [description, setDescription] = useState(modalData.description || '');
  const [company, setCompany] = useState(modalData.company || '');

  useEffect(() => {
    handleChange({ ...modalData, description, company });
  }, [company, description, handleChange]);

  return (
    <div className='w-85' style={{ width: '85%' }}>
      <h3 className='font-weight-medium mb-4'>
        {formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })}
      </h3>
      <FormInput
        ariaLabel='name'
        id='name'
        labelText={formatMessage({
          id: 'AddEditOrgSpacesModal.space-name',
        })}
        labelClassName='h6'
        groupClassName='mb-0'
        placeholder={formatMessage({
          id: 'AddEditOrgSpacesModal.space-name',
        })}
        fontSize='sm'
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        required
      />
      <span className='h5'>{`${formatMessage({
        id: 'Overview.container-id',
      })} ${modalData.name}`}</span>
      <FormInput
        ariaLabel='company'
        id='company'
        labelText={formatMessage({
          id: 'AddEditOrgSpacesModal.space-company',
        })}
        labelClassName='h6 mt-2'
        placeholder={formatMessage({
          id: 'AddEditOrgSpacesModal.space-company',
        })}
        fontSize='sm'
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        required
      />
      <FormTextarea
        rows={4}
        id='description'
        ariaLabel='description'
        labelText={`${formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })} (optional)`}
        labelClassName='h6 mb-2'
        placeholder={formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })}
        value={description}
        inputStyle={{}}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        groupClassName='mt-3'
      />

      <Form.Group className='mt-3'>
        <OrganizationAddTagPopover
          handleAddOrgaTag={(name) => {
            handleAddOrgaTag({ name });
          }}
        />
        {modalData.tags &&
          modalData.tags.map((currentTag) => (
            <Chip
              ariaLabel='tagChip'
              key={currentTag.name}
              text={currentTag.name}
              onClick={() => handleRemoveSpaceTag(currentTag)}
              icon={
                <Icon
                  ariaLabel='deleteAddEditModalTag'
                  icon={IoClose}
                  type='button'
                  color='text-light'
                  size={16}
                />
              }
              activeColor='accent'
              size='sm'
            />
          ))}
      </Form.Group>
      <FormRadioButtons
        groupClassName='mb-4 mt-3'
        id='confidentiality'
        labelClassName='font-weight-medium d-flex me-2'
        labelText={formatMessage({
          id: 'AddEditOrgSpacesModal.space-confidentiality',
        })}
        labelToolTipIcon={<Icon icon={FiInfo} size={19} type='button' />}
        labelToolTipText={
          <ul>
            <li>
              {formatMessage({
                id: 'AddEditOrgSpacesModal.orga-confidentiality-public-tooltip',
              })}
            </li>
            <li>
              {formatMessage({
                id: 'AddEditOrgSpacesModal.orga-confidentiality-internal-tooltip',
              })}
            </li>
            <li>
              {formatMessage({
                id: 'AddEditOrgSpacesModal.orga-confidentiality-private-tooltip',
              })}
            </li>
          </ul>
        }
        labelToolTipClassName='sdk-tooltip'
        labelsAndValues={[
          {
            name: formatMessage({
              id: 'AddEditOrgSpacesModal.space-confidentiality-public',
            }),
            value: 'PUBLIC',
          },
          {
            name: formatMessage({
              id: 'AddEditOrgSpacesModal.space-confidentiality-internal',
            }),
            value: 'INTERNAL',
          },
          {
            name: formatMessage({
              id: 'AddEditOrgSpacesModal.space-confidentiality-private',
            }),
            value: 'PRIVATE',
          },
        ]}
        inline
        checkedValue={modalData.confidentiality}
        onChange={(e) => {
          handleChange({
            ...modalData,
            confidentiality: e.target.value,
          });
        }}
      />
    </div>
  );
}

export default OrganizationGeneralTab;
