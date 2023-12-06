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
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  Chip,
  FormInput,
  FormTextarea,
  FormRadioButtons,
  FormCheckbox,
  Icon,
  AddTagPopover,
} from '@components/index';
import { useConvertSpaceDisplayName } from '@customHooks/index';
import { Space, Capabilities, Response } from '@customTypes/index';
import { Form } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { FiInfo } from 'react-icons/fi';

function SpaceGeneralTab({
  handleChange,
  modalData,
}: {
  handleChange: (passedData: Space) => void;
  modalData: Space;
}) {
  const { formatMessage } = useIntl();
  const { orgID, spaceID } = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['space', spaceID, `o_${orgID}`]);

  const handleAddSpaceTag = (tag: { name: string }) => {
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
  useConvertSpaceDisplayName(inputName, handleChange, modalData);

  const [description, setDescription] = useState(modalData.description || '');

  useEffect(() => {
    handleChange({ ...modalData, description });
  }, [description, handleChange]);

  return (
    <div className='w-85' style={{ width: '85%' }}>
      <h3 className='font-weight-medium mb-4'>
        {formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })}
      </h3>
      <FormInput
        id='name'
        ariaLabel='name'
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
        onChange={(e) => {
          setInputName(e.target.value);
        }}
        required
        validationFeedback={formatMessage({
          id: 'AddEditOrgSpacesModal.space-name-validation',
        })}
      />
      <span className='h5 mb-4'>{`${formatMessage({
        id: 'Overview.container-id',
      })} ${modalData.name}`}</span>
      <FormTextarea
        id='description'
        ariaLabel='description'
        groupClassName='mb-4'
        labelText={`${formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })} (optional)`}
        labelClassName='h6'
        placeholder={formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })}
        fontSize='sm'
        value={description}
        inputStyle={{}}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Form.Group className='mb-4'>
        <AddTagPopover
          handleAddTag={(name) => {
            handleAddSpaceTag({ name });
          }}
          tagTitle='AddEditOrgSpacesModal.space-add-tag'
          placeholder='Tag'
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
      <div>
        <FormRadioButtons
          groupClassName='mb-4'
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
                  id: 'AddEditOrgSpacesModal.space-confidentiality-public-tooltip',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'AddEditOrgSpacesModal.space-confidentiality-internal-tooltip',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'AddEditOrgSpacesModal.space-confidentiality-private-tooltip',
                })}
              </li>
            </ul>
          }
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
          disabled={modalData.gdprRelevant}
        />

        {Object.prototype.hasOwnProperty.call(modalData, 'id') && (
          <FormRadioButtons
            id='state'
            groupClassName='mb-4'
            labelClassName='font-weight-medium d-flex'
            labelToolTipIcon={<Icon icon={FiInfo} size={19} type='button' />}
            labelToolTipText={
              <ul>
                <li>
                  {formatMessage({
                    id: 'AddEditOrgSpacesModal.space-state-open-tooltip',
                  })}
                </li>
                <li>
                  {formatMessage({
                    id: 'AddEditOrgSpacesModal.space-state-closed-tooltip',
                  })}
                </li>
                <li>
                  {formatMessage({
                    id: 'AddEditOrgSpacesModal.space-state-locked-tooltip',
                  })}
                </li>
              </ul>
            }
            labelText={formatMessage({
              id: 'AddEditOrgSpacesModal.space-state',
            })}
            labelsAndValues={[
              {
                name: formatMessage({
                  id: 'AddEditOrgSpacesModal.space-state-open',
                }),
                value: 'OPEN',
              },
              {
                name: formatMessage({
                  id: 'AddEditOrgSpacesModal.space-state-closed',
                }),
                value: 'CLOSED',
              },
              {
                name: formatMessage({
                  id: 'AddEditOrgSpacesModal.space-state-locked',
                }),
                value: 'LOCKED',
              },
            ]}
            inline
            checkedValue={modalData.state}
            onChange={(e) => {
              handleChange({
                ...modalData,
                state: e.target.value,
              });
            }}
            disabled={modalData.id === 0}
          />
        )}
      </div>

      <div>
        <FormCheckbox
          labelClassName='font-weight-medium d-flex mb-2'
          labelToolTipIcon={<Icon icon={FiInfo} size={19} type='button' />}
          groupClassName='mb-4'
          labelToolTipText={
            <ul>
              <li>
                {formatMessage({
                  id: 'AddEditOrgSpacesModal.space-capabilities-storage-tooltpip',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'AddEditOrgSpacesModal.space-capabilities-metadata-tooltpip',
                })}
              </li>
              <li>
                {formatMessage({
                  id: 'AddEditOrgSpacesModal.space-capabilities-analysis-tooltpip',
                })}
              </li>
            </ul>
          }
          labelText={formatMessage({
            id: 'AddEditOrgSpacesModal.space-capabilities',
          })}
          id='capabilities'
          labelsAndValues={Capabilities.map((capability) => ({
            name: capability.toLowerCase(),
            value: modalData.capabilities.includes(capability),
          }))}
          onChange={(e) => {
            handleChange(
              e.target.checked
                ? {
                    ...modalData,
                    capabilities: modalData.capabilities
                      ? [
                          ...modalData.capabilities,
                          e.target.value.toUpperCase(),
                        ]
                      : [e.target.value.toUpperCase()],
                  }
                : {
                    ...modalData,
                    capabilities: modalData?.capabilities?.filter(
                      (c) => c !== e.target.value.toUpperCase()
                    ),
                  }
            );
          }}
          inline
        />
      </div>
      <div>
        <FormCheckbox
          disabled={data ? (data as Response<Space>).data.gdprRelevant : false}
          labelClassName='font-weight-medium mb-2'
          labelText={formatMessage({
            id: 'Gdpr.space-checkbox-title',
          })}
          id='gdprRelevant'
          inline
          labelsAndValues={[
            {
              name: formatMessage({
                id: 'Gdpr.space-checkbox-label',
              }),
              value: modalData.gdprRelevant,
            },
          ]}
          onChange={() => {
            handleChange({
              ...modalData,
              gdprRelevant: !modalData.gdprRelevant,
              confidentiality: !modalData.gdprRelevant ? 'PRIVATE' : 'INTERNAL',
            });
          }}
          warning={formatMessage({
            id: 'Gdpr.space-checkbox-warning',
          })}
        />
      </div>
    </div>
  );
}

export default SpaceGeneralTab;
