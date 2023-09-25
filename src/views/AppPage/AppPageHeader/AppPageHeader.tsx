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

import { useState, useContext, Key, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useOidcIdToken } from '@axa-fr/react-oidc';
import { useIntl } from 'react-intl';
import { Col, Row, Spinner } from 'react-bootstrap';
import {
  BsChevronRight,
  BsChevronUp,
  BsChevronDown,
  BsLock,
  BsUnlock,
  BsDoorClosed,
} from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin6Line, RiDeleteBin2Line } from 'react-icons/ri';
import { ActivePathContext } from '@contexts/index';
import {
  Chip,
  CustomHeader,
  Icon,
  ManageOrgaSpaceModal,
  ConfirmationModal,
} from '@components/index';
import { useGetRoles, useGetOwners } from '@customHooks/index';
import {
  OrgaRoleType,
  UserOrgaRoleType,
  userOrgaRoleTypes,
  OrgaSpaceUser,
  Owner,
  Space,
  UserSpaceRoleType,
  userSpaceRoleTypes,
  OrganizationModalTabNames,
  SpaceModalTabNames,
  OrgSpaceDataType,
  Response,
  ResponseError,
  MapType,
} from '@customTypes/index';
import {
  getOrganizationUsers,
  getSpaceUsers,
  setDeletionStateSpace,
} from '@services/index';
import { SuccessToast, ErrorToast } from '@notifications/index';
import { OrganizationTabs, SpaceTabs } from '@views/index';

const lockBsClasses = 'mx-3 mt-1';
const lockInlineStyles = { transform: 'translate(0%, -25%)' };

function AppPageHeader({ orgData, spaceData }: OrgSpaceDataType) {
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const { orgID, spaceID } = useParams();
  const [headerIsCollapsed, setHeaderIsCollapsed] = useState<boolean>(true);
  const { activePath, onChangeActivePath } = useContext(ActivePathContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fetchActive, setFetchActive] = useState<boolean>(false);
  const { idTokenPayload } = useOidcIdToken();
  const [isOwner, setIsOwner] = useState(false);

  const owners = useGetOwners(orgID as string, spaceID as string);

  useEffect(() => {
    if (idTokenPayload.sub) {
      setIsOwner(
        owners.map((owner: Owner) => owner.id).includes(idTokenPayload.sub),
      );
    }
  }, [idTokenPayload, isOwner, owners]);

  const userOrgaRoles = useGetRoles<OrgaRoleType>(
    orgData?.name,
    'organization',
  );

  const isAdmin = userOrgaRoles ? userOrgaRoles.includes('admin') : false;

  const { data } = useQuery({
    queryKey: spaceData
      ? ['spaceUsers', spaceID, `o_${orgID}`]
      : ['orgaUsers', orgID],
    queryFn: (): any => {
      if (orgData && !spaceData) {
        return getOrganizationUsers(orgData.id);
      }
      if (orgData && spaceData) {
        return getSpaceUsers(orgData.id, spaceData.id);
      }
      const response:
        | ResponseError
        | Response<OrgaSpaceUser<UserSpaceRoleType>[]>
        | Response<OrgaSpaceUser<UserOrgaRoleType>[]> = data.ok
        ? data
        : undefined;

      return response;
    },
    enabled: isOwner || isAdmin,
  });

  let iconState;
  let tooltipState;
  const dataForState = (): Space | Record<string, undefined> =>
    spaceData ? (spaceData as Space) : { state: undefined };

  switch (dataForState().state) {
    case 'OPEN':
      iconState = BsUnlock;
      tooltipState = 'Lock.open-description';
      break;
    case 'LOCKED':
      iconState = BsLock;
      tooltipState = 'Lock.locked-description';
      break;
    case 'CLOSED':
      iconState = BsDoorClosed;
      tooltipState = 'Lock.closed-description';
      break;
    case 'DELETION':
      iconState = RiDeleteBin2Line;
      tooltipState = 'Lock.deletion-description';
      break;
    case undefined:
      iconState = undefined;
      tooltipState = 'Lock.open-description';
      break;
    default:
      iconState = BsUnlock;
      tooltipState = 'Lock.open-description';
  }

  const orgDisplayName =
    orgData?.displayName && orgData.displayName.length > 40
      ? `${orgData.displayName.substring(0, 40)}...`
      : orgData?.displayName;

  const orgContainerName =
    !orgData?.displayName && orgData?.name && orgData.name.length > 40
      ? `${orgData.name.substring(0, 40)}...`
      : orgData?.name;

  const spaceDisplayName =
    spaceData?.displayName && spaceData.displayName.length > 40
      ? `${spaceData.displayName.substring(0, 40)}...`
      : spaceData?.displayName;

  const spaceContainerName =
    !spaceData?.displayName && spaceData?.name && spaceData.name.length > 40
      ? `${spaceData.name.substring(0, 40)}...`
      : spaceData?.name;

  const membersTabVisible = isOwner || isAdmin;

  const onHeaderCollapseHandler = () => {
    setHeaderIsCollapsed((prev) => !prev);
  };

  const handleDeletionStateSpace = () => {
    setDeletionStateSpace(
      orgID as string,
      spaceID as string,
      !(spaceData?.state === 'DELETION'),
    ).then((response) => {
      if (response.ok) {
        queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
        queryClient.invalidateQueries(['space', spaceID, `o_${orgID}`]);
        SuccessToast(
          !(spaceData?.state === 'DELETION')
            ? 'SuccessToast.title-space-deletion'
            : 'SuccessToast.title-space-revoke-deletion',
        );
      } else
        ErrorToast(
          !(spaceData?.state === 'DELETION')
            ? 'ErrorToast.title-space-deletion'
            : 'ErrorToast.title-space-revoke-deletion',
          '',
          '',
          response.data.statusCode,
        );
    });
  };

  const stateAndConfidentiality = spaceData ? (
    <>
      {iconState && (
        <span className="ms-2 mt-3">
          <Icon
            icon={iconState}
            tooltip={tooltipState}
            toolptipPlacement="bottom"
            size={24}
            className={lockBsClasses}
            style={lockInlineStyles}
          />
        </span>
      )}
      <span className="ms-2 mt-3">
        <Chip
          text={spaceData.confidentiality}
          activeColor="outline-accent"
          activeTextColor="accent"
          disabled
        />
      </span>
    </>
  ) : (
    <>
      {iconState && (
        <span className="ms-2 mt-3">
          <Icon
            icon={iconState}
            tooltip={tooltipState}
            toolptipPlacement="bottom"
            size={24}
            className={lockBsClasses}
            style={lockInlineStyles}
          />
        </span>
      )}
      <span className="ms-2 mt-3">
        <Chip
          text={orgData ? orgData.confidentiality : ''}
          activeColor="outline-accent"
          activeTextColor="accent"
          disabled
        />
      </span>
    </>
  );

  return (
    <CustomHeader className="w-100 h-100 bg-light">
      <>
        {showModal && orgData && spaceData && (
          <ManageOrgaSpaceModal
            show={showModal}
            setShow={setShowModal}
            orgData={orgData}
            users={data && data.ok ? data.data : undefined}
            spaceData={spaceData}
            owners={owners}
            tabComponents={SpaceTabs(membersTabVisible) as any}
            tabNames={SpaceModalTabNames}
            modalType="editSpace"
            roles={userSpaceRoleTypes}
            onMutation={setFetchActive}
            isOwner={isOwner}
          />
        )}

        {showModal && orgData && !spaceData && (
          <ManageOrgaSpaceModal
            show={showModal}
            setShow={setShowModal}
            orgData={orgData}
            users={data && data.ok ? data.data : undefined}
            owners={owners}
            tabComponents={OrganizationTabs(membersTabVisible) as any}
            tabNames={OrganizationModalTabNames}
            modalType="editOrganization"
            roles={userOrgaRoleTypes}
            onMutation={setFetchActive}
            isOwner={isOwner}
          />
        )}
      </>
      <Row className="justify-content-between ms-2">
        {headerIsCollapsed && (
          <div className="d-flex align-items-center ">
            <div className="d-flex ms-1 pb-1">
              {spaceID ? (
                <div className="mt-3 pb-3">
                  <Link to={`/org/${orgData?.id}`} className="text-primary">
                    {orgData?.displayName ? orgDisplayName : orgContainerName}
                  </Link>
                </div>
              ) : (
                <div className="mt-3 pb-3">
                  {orgData?.displayName ? orgDisplayName : orgContainerName}
                </div>
              )}
              {spaceID ? (
                <span className="ms-2 mt-3 text-testaccent font-weight-medium">
                  <Icon
                    icon={BsChevronRight}
                    type="icon"
                    className="pb-1 pe-2"
                    size={24}
                  />
                  {spaceData?.displayName
                    ? spaceDisplayName
                    : spaceContainerName}
                </span>
              ) : (
                ''
              )}
              {stateAndConfidentiality}
            </div>
            <Col className="d-flex align-items-center justify-content-end">
              <Icon
                ariaLabel="collapseHeaderIcon"
                icon={headerIsCollapsed ? BsChevronDown : BsChevronUp}
                type="button"
                size={30}
                className="me-5"
                onClick={onHeaderCollapseHandler}
              />

              {((!spaceData && (userOrgaRoles?.includes('admin') || isOwner)) ||
                (spaceData &&
                  spaceData.state !== 'DELETION' &&
                  userOrgaRoles?.includes('admin')) ||
                isOwner) &&
                (!fetchActive ? (
                  <Icon
                    ariaLabel="editIcon"
                    icon={MdEdit}
                    type="button"
                    size={30}
                    className="me-3"
                    onClick={() => setShowModal(true)}
                  />
                ) : (
                  <Spinner
                    className="me-4"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ))}

              {spaceData && isOwner && (
                <>
                  <Icon
                    ariaLabel="deleteIcon"
                    icon={
                      spaceData.state === 'DELETION'
                        ? RiDeleteBin2Line
                        : RiDeleteBin6Line
                    }
                    type="button"
                    size={28}
                    className="me-5"
                    onClick={() => setShow(true)}
                    color={
                      spaceData.state === 'DELETION'
                        ? 'text-danger'
                        : 'text-primary'
                    }
                    tooltip={
                      spaceData.state === 'DELETION'
                        ? 'AppPageHeader.space-state-deletion-tooltip'
                        : undefined
                    }
                    toolptipPlacement="bottom"
                  />

                  <ConfirmationModal
                    show={show}
                    onSetShow={setShow}
                    onHandleSubmit={handleDeletionStateSpace}
                    confirmButtonText={
                      spaceData.state === 'DELETION'
                        ? 'Button.delete-revoke'
                        : 'Button.delete'
                    }
                    message={
                      spaceData.state === 'DELETION'
                        ? 'AppPageHeader.confirmation-modal-revoke-deletion-message'
                        : 'AppPageHeader.confirmation-modal-delete-message'
                    }
                  />
                </>
              )}
            </Col>
          </div>
        )}
      </Row>
      <Row className={headerIsCollapsed ? 'd-none ms-1' : 'd-flex ms-1'}>
        <div className="d-flex pb-4">
          <div>
            <div className="d-flex">
              {spaceID ? (
                <div className="ms-2 mt-3 pb-3">
                  <Link to={`/org/${orgData?.id}`} className="text-primary">
                    {orgData?.displayName ? orgDisplayName : orgContainerName}
                  </Link>
                </div>
              ) : (
                <div className="ms-2 mt-3 pb-3">
                  {orgData?.displayName ? orgDisplayName : orgContainerName}
                </div>
              )}
              {spaceID ? (
                <span className="ms-2 mt-3 text-testaccent font-weight-medium">
                  <Icon
                    icon={BsChevronRight}
                    type="icon"
                    className="pb-1 pe-2"
                    size={24}
                  />
                  {spaceData?.displayName
                    ? spaceDisplayName
                    : spaceContainerName}
                </span>
              ) : (
                ''
              )}
              {stateAndConfidentiality}
            </div>
            <div className="d-flex ms-2">
              <span className="mt-1">
                <Chip
                  text={orgData ? orgData.name : ''}
                  activeColor="accent"
                  disabled
                />
              </span>
              <span className="mt-1">
                {spaceData && spaceData.tags
                  ? spaceData.tags.map((tag: { name: string }) => (
                      <Chip
                        key={tag.name}
                        text={tag.name}
                        activeColor="accent"
                        disabled
                      />
                    ))
                  : orgData &&
                    orgData.tags &&
                    orgData.tags.map((tag: { name: string }) => (
                      <Chip
                        key={tag.name}
                        text={tag.name}
                        activeColor="accent"
                        disabled
                      />
                    ))}
              </span>
            </div>
          </div>
          {!headerIsCollapsed && (
            <Col className="d-flex align-items-center justify-content-end h-50 mt-2">
              <Icon
                ariaLabel="collapseHeaderIcon"
                icon={headerIsCollapsed ? BsChevronDown : BsChevronUp}
                type="button"
                size={30}
                className="me-5"
                onClick={onHeaderCollapseHandler}
              />

              {((!spaceData && (userOrgaRoles?.includes('admin') || isOwner)) ||
                (spaceData &&
                  spaceData.state !== 'DELETION' &&
                  userOrgaRoles?.includes('admin')) ||
                isOwner) &&
                (!fetchActive ? (
                  <Icon
                    ariaLabel="editIcon"
                    icon={MdEdit}
                    type="button"
                    size={30}
                    className="me-3"
                    onClick={() => setShowModal(true)}
                  />
                ) : (
                  <Spinner
                    className="me-4"
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ))}

              {spaceData && isOwner && (
                <>
                  <Icon
                    ariaLabel="deleteIcon"
                    icon={
                      spaceData.state === 'DELETION'
                        ? RiDeleteBin2Line
                        : RiDeleteBin6Line
                    }
                    type="button"
                    size={28}
                    className="me-5"
                    onClick={() => setShow(true)}
                    color={
                      spaceData.state === 'DELETION'
                        ? 'text-danger'
                        : 'text-primary'
                    }
                    tooltip={
                      spaceData.state === 'DELETION'
                        ? 'AppPageHeader.space-state-deletion-tooltip'
                        : undefined
                    }
                    toolptipPlacement="bottom"
                  />

                  {/* <ConfirmationModal
                show={show}
                onSetShow={setShow}
                onHandleSubmit={handleDeletionStateSpace}
                confirmButtonText={
                  spaceData.state === 'DELETION'
                    ? 'Button.delete-revoke'
                    : 'Button.delete'
                }
                message={
                  spaceData.state === 'DELETION'
                    ? 'AppPageHeader.confirmation-modal-revoke-deletion-message'
                    : 'AppPageHeader.confirmation-modal-delete-message'
                }
              /> */}
                </>
              )}
            </Col>
          )}
        </div>
      </Row>
    </CustomHeader>
  );
}

export default AppPageHeader;
