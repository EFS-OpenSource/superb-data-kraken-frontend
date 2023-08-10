import { useState, useContext, Key } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { ActivePathContext, UserInfoContext } from '@contexts/index';
import { Chip, CustomHeader, Icon } from '@components/index';
// import { HomeButton } from '@e-fs-frontend-applications/shared/stateless-components-bootstrap';
import { Row, Spinner } from 'react-bootstrap';
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
} from '@customTypes/index';
import {
  getOrganizationUsers,
  getSpaceUsers,
  setDeletionStateSpace,
} from '@services/index';

// import {
//   OrganizationTabs,
//   SpaceTabs,
// } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/tabComponents';
// import { ManageOrgaSpaceModal } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/ManageOrgaSpaceModal';
import { SuccessToast, ErrorToast } from '@notifications/index';
// import { ConfirmationModal } from '@e-fs-frontend-applications/apps/sdk-frontend/src/parts/popovers/generic-popovers/ConfirmationModal';

const lockBsClasses = 'mx-3 mt-1';
const lockInlineStyles = { transform: 'translate(0%, -25%)' };

function AppPageHeader({ orgData, spaceData }: OrgSpaceDataType) {
  const queryClient = useQueryClient();
  const { formatMessage } = useIntl();
  const { orgID, spaceID } = useParams();
  // const { token, tokenParsed } = useKeycloak().keycloak; // replace with OIDC
  const { oidcUser } = useContext(UserInfoContext);
  const [headerIsCollapsed, setHeaderIsCollapsed] = useState<boolean>(true);
  const { activePath, onChangeActivePath } = useContext(ActivePathContext);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fetchActive, setFetchActive] = useState<boolean>(false);

  const owners = useGetOwners(orgID as string, spaceID as string);
  const isOwner =
    oidcUser && oidcUser.sub
      ? owners.map((owner: Owner) => owner.id).includes(oidcUser.sub)
      : false;

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
    enabled: isOwner,
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
  const userOrgaRoles = useGetRoles<OrgaRoleType>(
    orgData?.name,
    'organization',
  );

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
        <span className="ml-2 mt-3">
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
      <span className="ml-2 mt-3">
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
        <span className="ml-2 mt-3">
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
      <span className="ml-2 mt-3">
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
      {/* <>
        {showModal && orgData && spaceData && (
          <ManageOrgaSpaceModal
            show={showModal}
            setShow={setShowModal}
            orgData={orgData}
            users={data && data.ok ? data.data : undefined}
            spaceData={spaceData}
            owners={owners}
            tabComponents={SpaceTabs(isOwner) as any}
            tabNames={SpaceModalTabNames}
            modalType="editSpace"
            roles={userSpaceRoleTypes}
            onMutation={setFetchActive}
          />
        )}

        {showModal && orgData && !spaceData && (
          <ManageOrgaSpaceModal
            show={showModal}
            setShow={setShowModal}
            orgData={orgData}
            users={data && data.ok ? data.data : undefined}
            owners={owners}
            tabComponents={OrganizationTabs(isOwner) as any}
            tabNames={OrganizationModalTabNames}
            modalType="editOrganization"
            roles={userOrgaRoleTypes}
            onMutation={setFetchActive}
          />
        )}
      </> */}
      <Row className="justify-content-between ml-2">
        {!headerIsCollapsed && <div>HELLO</div>}
        {headerIsCollapsed && (
          <div className="d-flex align-items-center">
            <div style={{ marginTop: '-3' }}>
              <div>HELLO</div>
            </div>
            <div className="d-flex ml-3 pb-1" style={{ paddingTop: '2px' }}>
              {spaceID ? (
                <div className="ml-2 mt-3 pb-3">
                  <Link
                    to={`/org/${orgData?.id}`}
                    className="text-primary text-decoration-none"
                  >
                    {orgData?.displayName ? orgDisplayName : orgContainerName}
                  </Link>
                </div>
              ) : (
                <div className="ml-2 mt-3 pb-3">
                  {orgData?.displayName ? orgDisplayName : orgContainerName}
                </div>
              )}
              {spaceID ? (
                <span className="ml-2 mt-3 font-weight-medium">
                  <Icon
                    icon={BsChevronRight}
                    type="icon"
                    className="pb-1 pr-2"
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
          </div>
        )}
        <div className="mr-4 mt-3">
          <Icon
            ariaLabel="collapseHeaderIcon"
            icon={headerIsCollapsed ? BsChevronDown : BsChevronUp}
            type="button"
            size={30}
            className="mr-5"
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
                className="mr-3"
                onClick={() => setShowModal(true)}
              />
            ) : (
              <Spinner
                className="mt-3 mr-4"
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
                className="mr-5"
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
        </div>
      </Row>
      <Row className={headerIsCollapsed ? 'd-none ml-1' : 'd-flex ml-1'}>
        <div className="d-flex pb-4">
          <div>
            <div className="d-flex">
              {spaceID ? (
                <div className="ml-4 mt-3 pb-3">
                  <Link
                    to={`/org/${orgData?.id}`}
                    className="text-primary text-decoration-none"
                  >
                    {orgData?.displayName ? orgDisplayName : orgContainerName}
                  </Link>
                </div>
              ) : (
                <div className="ml-4 mt-3 pb-3">
                  {orgData?.displayName ? orgDisplayName : orgContainerName}
                </div>
              )}
              {spaceID ? (
                <span className="ml-2 mt-3 font-weight-medium">
                  <Icon
                    icon={BsChevronRight}
                    type="icon"
                    className="pb-1 pr-2"
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
            <div className="d-flex ml-4">
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
        </div>
      </Row>
    </CustomHeader>
  );
}

export default AppPageHeader;
