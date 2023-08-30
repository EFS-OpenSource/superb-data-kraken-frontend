import { useIntl } from 'react-intl';
import { FormInput, FormCheckbox, Icon } from '@components/index';
import { Space } from '@customTypes/index';
import { FiInfo } from 'react-icons/fi';

function SpaceDataTab({
  handleChange,
  modalData,
}: {
  handleChange: (passedData: Space) => void;
  modalData: Space;
}) {
  const { formatMessage } = useIntl();
  return (
    <div className="w-85" style={{ width: '85%' }}>
      <h3 className="font-weight-medium mb-4">
        {formatMessage({
          id: 'AddEditOrgSpacesModal.space-description',
        })}
      </h3>
      <FormInput
        id="name"
        ariaLabel="name"
        labelText={formatMessage({
          id: 'AddEditOrgSpacesModal.space-retention-time',
        })}
        labelToolTipIcon={<Icon icon={FiInfo} size={19} type="button" />}
        labelToolTipText={formatMessage({
          id: 'AddEditOrgSpacesModal.space-retention-time-tooltip',
        })}
        labelClassName="h6"
        placeholder={formatMessage({
          id: 'AddEditOrgSpacesModal.space-retention-time',
        })}
        fontSize="sm"
        value={modalData.defaultRetentionTime}
        onChange={(e) => {
          handleChange({
            ...modalData,
            defaultRetentionTime: e.target.value,
          });
        }}
      />

      <FormCheckbox
        groupClassName="mt-3"
        labelClassName="font-weight-medium d-flex"
        labelText={formatMessage({
          id: 'AddEditOrgSpacesModal.metadata',
        })}
        id="metadata"
        labelToolTipIcon={<Icon icon={FiInfo} size={19} type="button" />}
        labelToolTipText={formatMessage({
          id: 'AddEditOrgSpacesModal.metadata-checkbox-tooltip',
        })}
        inline
        labelsAndValues={[
          {
            name: formatMessage({
              id: 'AddEditOrgSpacesModal.metadata-checkbox',
            }),
            value: modalData.metadataGenerate,
          },
        ]}
        onChange={() => {
          handleChange({
            ...modalData,
            metadataGenerate: !modalData.metadataGenerate,
          });
        }}
      />
    </div>
  );
}

export default SpaceDataTab;
