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

import React, { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Icon } from '@components/index';
import { Tag } from '@customTypes/index';
import {
  Form,
  Popover,
  OverlayTrigger,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { IoAdd, IoClose } from 'react-icons/io5';

interface PopoverProps {
  handleAddTag: (tag: string) => void;
  placeholder: string;
  tagTitle?: string;
  openIcon?: JSX.Element;
}

function AddTagPopover({
  handleAddTag,
  tagTitle,
  placeholder,
  openIcon,
}: PopoverProps) {
  const { formatMessage } = useIntl();
  const [show, setShow] = useState(false);
  const [tag, setTag] = useState<Tag>();

  const popoverContainer = useRef<HTMLDivElement>(null);

  const handleShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setShow(false);
  };

  return (
    <Form.Group className="d-flex m-0">
      {tagTitle && (
        <Form.Label className="m-0 p-0 d-flex align-items-center h3 font-weight-medium">
          {formatMessage({
            id: tagTitle,
          })}
        </Form.Label>
      )}
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
            id="spaceTagsPopover"
            style={{
              minWidth: '615px',
              maxWidth: '615px',
            }}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
              handleShow(e)
            }
          >
            <Popover.Body>
              <Col className="d-flex justify-content-between m-0 px-4">
                {tagTitle && (
                  <div className="font-weight-bolder my-2">
                    {formatMessage({
                      id: tagTitle,
                    })}
                  </div>
                )}
                <Button
                  aria-label="closePopoverButton"
                  className="font-weight-bold px-0 bg-transparent text-primary border border-0 justify-content-end"
                  onClick={handleClose}
                >
                  <Icon
                    ariaLabel="closeAddEditModalTagPopover"
                    icon={IoClose}
                    size={24}
                  />
                </Button>
              </Col>

              <Col className="d-flex justify-content-between m-0 px-4">
                <Form.Control
                  aria-label="tagInput"
                  type="text"
                  placeholder={placeholder}
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
                          handleAddTag(tag ? tag.name : ''),
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
        <div className="p-0 mb-0 me-2" ref={popoverContainer}>
          {openIcon || (
            <Icon
              ariaLabel="openAddEditSpaceTagPopover"
              type="button"
              icon={IoAdd}
              size={28}
            />
          )}
        </div>
      </OverlayTrigger>
    </Form.Group>
  );
}

export default AddTagPopover;
