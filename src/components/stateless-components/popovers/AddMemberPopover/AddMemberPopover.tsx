import { useIntl } from 'react-intl';
import { IoAdd } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon, InputSelectPopover } from '@components/index';

interface AddMemberPopoverType {
  dropdownOptions: readonly string[];
  onSetUserData: (email: string, role: string) => void;
}

function AddMemberPopover({
  dropdownOptions,
  onSetUserData,
}: AddMemberPopoverType) {
  const { formatMessage } = useIntl();

  const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const openPopoverButton = (
    <OverlayTrigger
      placement="right"
      transition={false}
      overlay={
        <Tooltip id="addSpaceTooltip">
          {formatMessage({
            id: 'AddMemberPopover.add-member',
          })}
        </Tooltip>
      }
    >
      <div>
        <Icon
          ariaLabel="openAddMemberPopover"
          icon={IoAdd}
          size={28}
          type="button"
          className="p-0 ms-2"
        />
      </div>
    </OverlayTrigger>
  );

  return (
    <div className="m-0 d-flex align-items-center">
      <h3 className="m-0 p-0 font-weight-medium">
        {formatMessage({
          id: 'OrgaSpaceManagement.Members',
        })}
      </h3>
      <InputSelectPopover
        id="addMemberPopover"
        placement="right"
        style={{
          minWidth: '615px',
          maxWidth: '615px',
        }}
        headline={formatMessage({
          id: 'AddMemberPopover.add-member',
        })}
        inputPlaceholder="Email"
        buttonLabel={formatMessage({
          id: 'AddMemberPopover.addMember-button',
        })}
        handleShow={handleShow}
        popoverOpenButton={openPopoverButton}
        onSend={onSetUserData}
        dropdownOptions={dropdownOptions}
      />
    </div>
  );
}

export default AddMemberPopover;
