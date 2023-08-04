import { useCallback, useEffect, useState, useContext } from 'react';
import {
  Chip,
  ChipGroup,
  CustomCard,
  InputText,
  CustomCardTitle,
  CustomCardBody,
} from '@components/index';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Col, Row, Spinner } from 'react-bootstrap';
import { IoAdd } from 'react-icons/io5';
// import { ManageOrgaSpaceModal } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/ManageOrgaSpaceModal';
// import { OrganizationModalTabNames } from '@e-fs-frontend-applications/apps/sdk-frontend/src/types/ManageOrgaSpaceModal';
// import { OrganizationTabs } from '@e-fs-frontend-applications/apps/sdk-frontend/src/components/manage-orgas-spaces/tabComponents';
import {
  Organization,
  userOrgaRoleTypes,
  Space,
  Owner,
} from '@customTypes/index';
import { ActivePathContext } from '@contexts/index';

interface OrgGridProps {
  username: string;
  orgasWithSpaces: Organization[];
  userInfo: any;
}

const customCardStyle = {
  width: '660px',
  height: '340px',
};

const OrgGrid = ({ username, orgasWithSpaces, userInfo }: OrgGridProps) => {
  const { formatMessage } = useIntl();

  const { activePath, onChangeActivePath } = useContext(ActivePathContext);
  const [userName] = useState<string>(username);
  const [orgsData, setOrgsData] = useState<Organization[]>([
    ...orgasWithSpaces,
  ]);
  const [spacesData, setSpacesData] = useState<Space[]>([
    ...orgasWithSpaces.flatMap((org) =>
      org.spaces.map((space: Space) => space),
    ),
  ]);

  const sdkAdmin = (): Owner[] | undefined => {
    if (
      userInfo &&
      userInfo.roles &&
      userInfo.given_name &&
      userInfo.family_name &&
      userInfo.sub &&
      userInfo.roles.includes('org_create_permission')
    ) {
      const owners = [
        {
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          id: userInfo.sub,
        },
      ];
      return owners;
    }
    return undefined;
  };

  const SpaceOrgaFilterChips = [
    {
      label: 'all',
      value: formatMessage({
        id: 'Organizations.all',
      }),
    },
    {
      label: 'organizations',
      value: formatMessage({
        id: 'Organizations.all-organizations',
      }),
    },
    {
      label: 'spaces',
      value: formatMessage({
        id: 'Organizations.all-spaces',
      }),
    },
  ];

  const [checkedFilters, setCheckedFilters] = useState<string[]>(['all']);
  const [searchInput, setSearchInput] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fetchActive, setFetchActive] = useState<boolean>(false);
  const [filteredOrganizations, setFilteredOrganizations] =
    useState<Organization[]>(orgsData);
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(spacesData);

  const filterOrgsData = useCallback(() => {
    setFilteredOrganizations(
      orgsData.filter(
        (org) =>
          JSON.stringify(org)
            .toLowerCase()
            .indexOf(searchInput.toLowerCase()) !== -1,
      ),
    );
  }, [orgsData, searchInput]);

  const filterSpacesData = useCallback(() => {
    setFilteredSpaces(
      spacesData.filter(
        (org) =>
          JSON.stringify(org)
            .toLowerCase()
            .indexOf(searchInput.toLowerCase()) !== -1,
      ),
    );
  }, [spacesData, searchInput]);

  const onFilterChipHandler = useCallback(() => {
    setFilteredOrganizations(orgsData);
    setFilteredSpaces(spacesData);

    if (
      checkedFilters.includes('organizations') &&
      checkedFilters.includes('spaces')
    ) {
      filterOrgsData();
      filterSpacesData();
      setShowAll(false);
    }

    if (
      checkedFilters.includes('organizations') &&
      !checkedFilters.includes('spaces')
    ) {
      if (showAll) {
        const index = checkedFilters.indexOf('all');
        checkedFilters.splice(index, 1);
        setShowAll(false);
      }

      filterOrgsData();
      setFilteredSpaces([]);
    }

    if (
      checkedFilters.includes('spaces') &&
      !checkedFilters.includes('organizations')
    ) {
      if (showAll) {
        const index = checkedFilters.indexOf('all');
        checkedFilters.splice(index, 1);
        setShowAll(false);
      }

      filterSpacesData();
      setFilteredOrganizations([]);
    }

    if (
      !checkedFilters.includes('spaces') &&
      !checkedFilters.includes('organizations')
    ) {
      filterSpacesData();
      filterOrgsData();
      setCheckedFilters(['all']);
      setShowAll(true);
    }

    if (checkedFilters.includes('all') && !showAll) {
      setFilteredSpaces(spacesData);
      setFilteredOrganizations(orgsData);
      setShowAll(true);
      if (checkedFilters.includes('organizations')) {
        const index = checkedFilters.indexOf('organizations');
        checkedFilters.splice(index, 1);
      }
      if (checkedFilters.includes('spaces')) {
        const index = checkedFilters.indexOf('spaces');
        checkedFilters.splice(index, 1);
      }
    }
  }, [
    filterSpacesData,
    filterOrgsData,
    checkedFilters,
    orgsData,
    spacesData,
    showAll,
  ]);

  const onSearchHandler = useCallback(
    (search: string) => {
      if (checkedFilters.includes('organizations')) {
        filterOrgsData();
      }
      if (checkedFilters.includes('spaces')) {
        filterSpacesData();
      }
      if (checkedFilters.includes('all')) {
        filterOrgsData();
        filterSpacesData();
      }
      if (!search && checkedFilters.includes('all')) {
        setFilteredOrganizations(orgsData);
        setFilteredSpaces(spacesData);
      }
      if (!search && !checkedFilters.includes('all')) {
        onFilterChipHandler();
      }
    },
    [
      filterOrgsData,
      filterSpacesData,
      onFilterChipHandler,
      checkedFilters,
      orgsData,
      spacesData,
    ],
  );

  useEffect(() => {
    onSearchHandler(searchInput);
  }, [onSearchHandler, searchInput]);

  useEffect(() => {
    setOrgsData([...orgasWithSpaces]);
    setSpacesData([
      ...orgasWithSpaces.flatMap((org) =>
        org.spaces.map((space: Space) => space),
      ),
    ]);
  }, [orgasWithSpaces]);

  return (
    <section className="mb-4 ms-0 ps-0 pt-3">
      {/* {sdkAdmin() !== undefined && (
        <ManageOrgaSpaceModal
          show={showModal}
          setShow={setShowModal}
          owners={sdkAdmin() as Owner[]}
          tabComponents={OrganizationTabs(true) as any}
          tabNames={OrganizationModalTabNames}
          modalType="createOrganization"
          roles={userOrgaRoleTypes}
          onMutation={setFetchActive}
        />
      )} */}
      <Col className="ms-3 ps-0 d-flex">
        <InputText
          className="mb-2 me-11"
          placeholder={formatMessage({
            id: 'Search.name-short',
          })}
          onChange={setSearchInput}
        />
        {sdkAdmin() !== undefined && (
          <Chip
            ariaLabel="addOrganizationButton"
            height="38px"
            text={formatMessage({
              id: 'Organizations.add-organization',
            })}
            icon={
              fetchActive ? (
                <Spinner
                  className="ms-2"
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <IoAdd size={28} />
              )
            }
            size="md"
            activeColor="accent"
            onClick={() => setShowModal(true)}
            disabled={fetchActive}
          />
        )}
      </Col>
      <Col className="ps-3">
        <ChipGroup
          size="sm"
          inactiveColor="outline-accent"
          activeColor="accent"
          activeTextColor="#ffffff"
          options={SpaceOrgaFilterChips}
          checked={checkedFilters}
          onChange={onFilterChipHandler}
        />
      </Col>
      <Row className="ps-3">
        {filteredOrganizations.length < 1 && filteredSpaces.length < 1 && (
          <h1 className="text-center pt-8 text-lg">NO DATA FOUND</h1>
        )}
        <Col className="d-flex flex-row flex-wrap">
          {filteredOrganizations.map((organization: Organization) => (
            <Link
              key={organization.id}
              to={`/org/${organization.id}/Overview`}
              className="my-3 ms-0 me-6"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={() => {
                onChangeActivePath(`/org/${organization.id}/Overview`);
              }}
            >
              <CustomCard
                style={customCardStyle}
                cardTitleElement={
                  <CustomCardTitle
                    data={organization}
                    userName={userName}
                    cardType="organization"
                  />
                }
                cardBodyElement={<CustomCardBody data={organization} />}
              />
            </Link>
          ))}

          {filteredSpaces?.map((space: Space) => (
            <Link
              key={space.id}
              to={`/org/${space.orgId}/space/${space.id}/Overview`}
              className="my-3 ms-0 me-6"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
              onClick={() => {
                onChangeActivePath(
                  `/org/${space.orgId}/space/${space.id}/Overview`,
                );
              }}
            >
              <CustomCard
                key={space.id}
                style={customCardStyle}
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
      </Row>
    </section>
  );
};

export default OrgGrid;
