import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { useOidcIdToken, useOidc } from '@axa-fr/react-oidc';
import {
  CustomCard,
  InputText,
  CustomCardTitle,
  CustomCardBody,
  Icon,
  LoadingIndicator,
} from '@components/index';
import {
  OrgaRoleType,
  Organization,
  Space,
  userSpaceRoleTypes,
  Owner,
  UserDataState,
} from '@customTypes/index';
import { getSpaces } from '@services/index';
import { useGetOwners, useGetRoles } from '@customHooks/index';
import {
  Col,
  Container,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';

// import { SpaceModalTabNames } from '@e-fs-frontend-applications/apps/sdk-frontend/src/types/ManageOrgaSpaceModal';
// import { SpaceTabs } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/tabComponents';
// import { ManageOrgaSpaceModal } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/ManageOrgaSpaceModal';

interface SpaceType {
  orgData: Organization;
  userDataState: UserDataState;
}

function Spaces({ orgData, userDataState }: SpaceType) {
  const { formatMessage } = useIntl();
  const { orgID } = useParams();
  const [userName] = useState<string>(userDataState?.name);
  const { idTokenPayload } = useOidcIdToken();
  const { isAuthenticated } = useOidc();
  const [show, setShow] = useState<boolean>(false);
  const [fetchActive, setFetchActive] = useState<boolean>(false);
  const [spaces, setSpaces] = useState<Space[]>();
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>();

  const orgaOwners = useGetOwners(orgID as string);

  const isOwner = (): boolean => {
    if (isAuthenticated !== undefined) {
      return orgaOwners
        .map((owner: { id: string }) => owner.id)
        .includes(idTokenPayload.sub as string);
    }
    return false;
  };

  const userInfo: Owner = {
    firstName: isAuthenticated ? (idTokenPayload.given_name as string) : '',
    lastName: isAuthenticated ? (idTokenPayload.family_name as string) : '',
    id: isAuthenticated ? (idTokenPayload.sub as string) : '',
  }; /* //TODO Merge with userDataState or the context, which provides the userInfos */

  const userOrgaRoles = useGetRoles<OrgaRoleType>(
    orgData?.name,
    'organization',
  );

  const { data, isLoading } = useQuery(['spaces', `o_${orgID}`], () =>
    getSpaces(orgID as string),
  );

  const memoSpaces = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoSpaces) {
      setSpaces(memoSpaces.data);
      setFilteredSpaces(memoSpaces.data);
    }
  }, [memoSpaces]);

  const onAddNewSpaceHandler = () => {
    setShow(true);
  };

  const filterSpacesData = (input: string) => {
    if (spaces)
      return setFilteredSpaces(
        spaces.filter(
          (space) =>
            JSON.stringify(space).toLowerCase().indexOf(input.toLowerCase()) !==
            -1,
        ),
      );
    return null;
  };

  return (
    <Container fluid className="mx-7 my-6">
      <Row className="ms-1 mb-0">
        <Col className="d-flex">
          <h3 className="align-items-center font-weight-medium m-0">
            {formatMessage({
              id: 'AppPage.Spaces',
            })}
          </h3>
          {(isOwner() ||
            (userOrgaRoles !== undefined &&
              userOrgaRoles.includes('admin'))) && (
            <>
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip id="addSpaceTooltip">
                    {formatMessage({
                      id: 'AddEditOrgSpacesModal.add-space',
                    })}
                  </Tooltip>
                }
              >
                <div className="ms-2">
                  {!fetchActive ? (
                    <Icon
                      ariaLabel="openManageOrgaSpaceModal"
                      icon={IoAdd}
                      size={28}
                      type="button"
                      onClick={onAddNewSpaceHandler}
                    />
                  ) : (
                    <Spinner
                      className="mt-1 ms-2"
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </OverlayTrigger>
              {/* {show &&
              orgData &&
              (isOwner() ||
                (userOrgaRoles !== undefined &&
                  userOrgaRoles.includes('admin'))) && (
                <ManageOrgaSpaceModal
                  show={show}
                  setShow={setShow}
                  orgData={orgData}
                  owners={[userInfo] as Owner[]}
                  tabComponents={SpaceTabs(true) as any}
                  tabNames={SpaceModalTabNames}
                  modalType="createSpace"
                  roles={userSpaceRoleTypes}
                  onMutation={setFetchActive}
                />
              )} */}
            </>
          )}
        </Col>
      </Row>
      <Row className="ms-1 mt-3 mb-0">
        <InputText
          placeholder={formatMessage({
            id: 'Search.name-short',
          })}
          onChange={filterSpacesData}
        />
      </Row>
      {isLoading && <LoadingIndicator />}
      <Col className="d-flex flex-row flex-wrap mt-2 gap-3">
        {filteredSpaces &&
          filteredSpaces.map((space: Space) => (
            <Link
              key={space.id}
              to={`/org/${orgData.id}/space/${space.id}/Overview`}
              className="my-3 mx-3"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <CustomCard
                key={space.id}
                style={{
                  width: '660px',
                  height: '340px',
                }}
                cardTitleElement={
                  <CustomCardTitle data={space} cardType="space" />
                }
                cardBodyElement={
                  <CustomCardBody
                    data={space}
                    userName={userName}
                    cardType="space"
                  />
                }
              />
            </Link>
          ))}
      </Col>
    </Container>
  );
}

export default Spaces;
