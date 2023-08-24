import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Icon } from '@components/index';
import {
  Form,
  Popover,
  OverlayTrigger,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { IoAdd, IoClose } from 'react-icons/io5';

type TagType = {
  name: string;
};

function OrganizationAddTagPopover({
  handleAddOrgaTag,
}: {
  handleAddOrgaTag: (tag: string) => void;
}) {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const [tag, setTag] = useState<TagType>();

  const popoverContainer = useRef<HTMLDivElement>(null);

  const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <Form.Group className="d-flex">
      <Form.Label className="m-0 p-0 d-flex align-items-center h3 font-weight-medium">
        {formatMessage({
          id: 'AddEditOrgSpacesModal.space-tags',
        })}
      </Form.Label>
      <OverlayTrigger
        placement="right"
        trigger="click"
        show={show}
        onToggle={setShow}
        transition={false}
        rootClose
        container={popoverContainer}
        overlay={
          <Popover
            id="organizationTagsPopover"
            style={{
              minWidth: '500px',
              maxWidth: '500px',
            }}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              handleShow(e)
            }
          >
            <Popover.Body className="mb-3">
              <Col className="d-flex justify-content-between m-0 px-4">
                <div className="font-weight-bold my-2">
                  {formatMessage({
                    id: 'AddEditOrgSpacesModal.space-add-tag',
                  })}
                </div>
                <Button
                  aria-label="closePopoverButton"
                  className="font-weight-bold px-0 bg-transparent text-primary border border-0 justify-content-end"
                  onClick={handleClose}
                >
                  <Icon
                    ariaLabel="closeEditModalTagPopover"
                    icon={IoClose}
                    size={24}
                  />
                </Button>
              </Col>

              <Col className="d-flex justify-content-between m-0 px-4">
                <Form.Control
                  aria-label="tagInput"
                  type="text"
                  placeholder="Tag"
                  className="w-75"
                  autoFocus
                  onChange={(e) => setTag({ name: e.target.value })}
                />

                <Button
                  aria-label="addTagButton"
                  variant="primary"
                  className="p-1 px-2"
                  onClick={
                    tag?.name
                      ? () => [
                          handleAddOrgaTag(tag ? tag.name : ''),
                          setTag({ name: '' }),
                          setShow(false),
                        ]
                      : handleClose
                  }
                >
                  {formatMessage({
                    id: 'AddEditOrgSpacesModal.space-add-tag-button',
                  })}
                </Button>
              </Col>
            </Popover.Body>
          </Popover>
        }
      >
        <div className="p-0 ms-2" ref={popoverContainer}>
          <Icon
            ariaLabel="openAddEditSpaceTagPopover"
            type="button"
            icon={IoAdd}
            size={28}
          />
        </div>
      </OverlayTrigger>
    </Form.Group>
  );
}

export default OrganizationAddTagPopover;
