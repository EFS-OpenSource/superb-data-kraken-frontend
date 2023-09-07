import { useRef, useState, CSSProperties } from 'react';
import { useIntl } from 'react-intl';
import { Icon } from '@components/index';
import { UserOrgaRoleType, UserSpaceRoleType } from '@customTypes/index';
import { Button, Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { IoClose } from 'react-icons/io5';
import { Placement } from 'node_modules/@restart/ui/esm/usePopper';

interface InputSelectPopoverType {
  id: string;
  placement: Placement;
  buttonLabel: string;
  popoverOpenButton: JSX.Element;
  dropdownOptions: readonly string[];
  handleShow: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  headline?: string;
  style?: CSSProperties;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputValue?: string;
  disabled?: boolean;
  onSend?: (inputText: string, dropdownOption: string) => void;
}

function InputSelectPopover({
  id,
  placement,
  style,
  headline,
  inputLabel,

  inputPlaceholder,
  inputValue,
  disabled,
  buttonLabel,
  popoverOpenButton,
  handleShow,
  onSend,
  dropdownOptions,
}: InputSelectPopoverType) {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);

  const popoverContainer = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setShow(false);
  };

  const [dropdownOption, setDropdownOption] = useState<
    UserSpaceRoleType | UserOrgaRoleType
  >();

  const onRoleSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownOption(e.target.value as UserSpaceRoleType | UserOrgaRoleType);
  };

  const [inputText, setInputText] = useState(inputValue || '');

  const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddData = () => {
    let dataToSend;

    if (inputText !== undefined && dropdownOption) {
      dataToSend = {
        inputText,
        dropdownOption,
      };
      if (onSend) {
        onSend(dataToSend.inputText, dataToSend.dropdownOption);
        setInputText('');
        setDropdownOption(dropdownOptions.includes('user') ? 'user' : 'access');
      }
    } else return;

    // TODO send data to corresponding endpoint

    setShow(false);
  };

  return (
    <OverlayTrigger
      placement={placement}
      trigger="click"
      show={show}
      onToggle={setShow}
      transition={false}
      rootClose
      container={popoverContainer}
      overlay={
        <Popover id={id} style={style} onClick={handleShow}>
          <Popover.Body>
            <Col className="d-flex justify-content-between m-0 px-4">
              <div className="font-weight-bold my-2">{headline}</div>

              <Icon
                ariaLabel={`close-${id}`}
                type="button"
                icon={IoClose}
                size={24}
                onClick={handleClose}
              />
            </Col>
            {inputLabel && (
              <Col className="d-flex justify-content-between m-0 px-4">
                <small>
                  <strong>{inputLabel}</strong>
                </small>
              </Col>
            )}
            <Col className="d-flex justify-content-between m-0 px-4">
              {inputPlaceholder && (
                <input
                  type="text"
                  value={inputValue}
                  placeholder={inputPlaceholder}
                  disabled={disabled}
                  onChange={(e) => onChangeNameHandler(e)}
                />
              )}
              <select
                aria-label="role"
                name="role"
                id="role"
                className="p-1 pe-2"
                onChange={(e) => onRoleSelectHandler(e)}
              >
                <option value="">
                  --
                  {formatMessage({
                    id: 'ApplyRolesPopover.select-role',
                  })}
                  --
                </option>
                {dropdownOptions.map((spaceRole) => (
                  <option key={spaceRole} value={spaceRole}>
                    {spaceRole}
                  </option>
                ))}
              </select>
              <Button
                aria-label={`${id}-addButton`}
                variant="primary"
                className="p-1 px-2"
                onClick={handleAddData}
              >
                {buttonLabel}
              </Button>
            </Col>
          </Popover.Body>
        </Popover>
      }
    >
      <div ref={popoverContainer}>{popoverOpenButton}</div>
    </OverlayTrigger>
  );
}

export default InputSelectPopover;
