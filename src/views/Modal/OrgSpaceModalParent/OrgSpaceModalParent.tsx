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

import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import { useIntl } from 'react-intl';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { GrClose } from 'react-icons/gr';
import { Icon, TabsWithoutPath } from '@components/index';
import { ModalTypes, TabData, TabWithoutPath } from '@customTypes/index';
import styles from './OrgSpaceModalParent.module.scss';

function OrgSpaceModalParent({
  modalType,
  modalTabs,
  show,
  validated,
  handleClose,
  handleSubmit,
  activeKey,
  setActiveKey,
  nextButton,
}: {
  modalType: ModalTypes;
  modalTabs: (TabData & TabWithoutPath)[];
  show: boolean;
  validated: boolean;
  handleClose: () => void;
  handleSubmit: (event: {
    currentTarget: HTMLInputElement;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => void;
  activeKey: string;
  setActiveKey: Dispatch<SetStateAction<'General'>>;
  nextButton: JSX.Element;
}) {
  const { formatMessage } = useIntl();

  const ModalTitle = () => {
    let title = 'title';
    if (modalType === 'createOrganization') {
      title = 'AddEditOrgSpacesModal.add-organization';
    } else if (modalType === 'editOrganization') {
      title = 'AddEditOrgSpacesModal.edit-organization';
    } else if (modalType === 'createSpace') {
      title = 'AddEditOrgSpacesModal.add-space';
    } else if (modalType === 'editSpace') {
      title = 'AddEditOrgSpacesModal.edit-space';
    }
    return title;
  };

  return (
    <Modal
      backdrop='static'
      show={show}
      onHide={handleClose}
      animation={false}
      centered
      dialogClassName={styles.spaceModal}
      contentClassName={styles.spaceModalHeight}
    >
      <Modal.Header className='d-flex mt-4 mb-2 border border-0'>
        <h3 className='font-weight-medium flex-grow-1 text-center m-0 p-0'>
          {formatMessage({
            id: ModalTitle(),
          })}
        </h3>

        <Icon
          ariaLabel='closeManageOrgaSpaceModal'
          icon={GrClose}
          type='button'
          size={24}
          onClick={handleClose}
          className='me-4'
        />
      </Modal.Header>

      <Modal.Body className='p-0 m-0 d-flex'>
        <Form
          className='w-100 d-flex align-items-start flex-column flex-grow-1'
          noValidate
          validated={validated}
          onSubmit={
            handleSubmit as unknown as FormEventHandler<HTMLFormElement>
          }
        >
          <TabsWithoutPath
            tabs={modalTabs}
            activeStyle='text-primary font-weight-medium border-0 border-bottom border-primary border-1'
            inactiveStyle='text-primary border-0 text-decoration-none'
            activeKey={activeKey}
            onSetActiveKey={setActiveKey}
          />

          <Row className='mt-4 mx-0 w-100 d-flex justify-content-center'>
            <Col
              xs={{ span: 4, offset: 4 }}
              xl={{ span: 2, offset: 5 }}
              className='m-0 p-0 d-flex justify-content-between'
            >
              <Button
                aria-label='cancelButton'
                variant='outline-primary'
                onClick={handleClose}
              >
                {formatMessage({
                  id: 'AddEditOrgSpacesModal.cancel-button',
                })}
              </Button>
              {modalType === 'editOrganization' || modalType === 'editSpace' ? (
                <Button aria-label='submitButton' type='submit'>
                  {formatMessage({
                    id: 'AddEditOrgSpacesModal.save-button',
                  })}
                </Button>
              ) : (
                nextButton
              )}
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default OrgSpaceModalParent;
