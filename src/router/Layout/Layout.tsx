import { FC, useCallback, useContext, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web'
import { useIntl } from 'react-intl';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// import { useGetAllRoles } from '@e-fs-frontend-applications/apps/sdk-frontend/src/utils/getUserRoles'
// import { SpaceRoleType } from '@e-fs-frontend-applications/apps/sdk-frontend/src/types/spaceTypes'
import { UserAvatar, ApplicationAvatar, NavbarLogos } from '@components/index';
import { IsExpandedContext, ActivePathContext } from '@contexts/index';
import { appPageInfo } from '@assets/index';
// import RestErrorMocker from '../testing/RestErrorMocker'
// import { FeatureFlags } from '../contexts/FeatureContextProvider'

interface LayoutProps {
  onLanguageChange: (language: string) => void;
}

const Layout: FC<LayoutProps> = ({ onLanguageChange }) => {
  // const { featureFlag } = useContext(FeatureFlags)
  // const { keycloak } = useKeycloak()
  const { formatMessage } = useIntl();
  // const spaceRoles = useGetAllRoles<SpaceRoleType>('space')

  // CAUTION: Placeholder
  const spaceRoles: Record<string, any> = ['hello'];

  // const logout = useCallback(() => {
  //   keycloak?.logout();
  // }, [keycloak]);

  const { isExpanded, updateIsExpanded } = useContext(IsExpandedContext);
  const { activePath, onChangeActivePath } = useContext(ActivePathContext);
  const [languageActive, setLanguageActive] = useState<boolean>(true);

  const handleLanguageSelect = (language: string): void => {
    onLanguageChange(language);
    setLanguageActive(!languageActive);
  };

  const handleToggler = (value: boolean): boolean => !value;

  return (
    <Container fluid className="m-0 p-0">
      <Row className="m-0 p-0">
        {/* -- Navigation Bar ----------------------------------------------------------- */}
        <Col
          className="m-0 p-0 vh-100 sticky-top bg-primary"
          style={
            isExpanded
              ? {
                  flex: '0 0 250px',
                }
              : {
                  flex: '0 0 100px',
                }
          }
        >
          {/* -- Logo -------------------------------------------------------------- */}
          <Row
            className={
              isExpanded ? 'mx-0 px-0 mt-4 mb-2' : 'mx-0 px-0 py-4 mt-4 mb-5'
            }
          >
            <Link
              data-testid="logo"
              to="/home"
              className="pointer text-center w-100"
              onClick={() => onChangeActivePath('/home/*')}
            >
              {isExpanded ? (
                <NavbarLogos type="SDK" size="133.5px" color="text-light" />
              ) : (
                <NavbarLogos type="Logo" size="60px" color="text-light" />
              )}
            </Link>
          </Row>
          {/* -- Avatar ------------------------------------------------------------ */}
          <Row
            className={
              isExpanded
                ? 'mx-7 px-0 mt-4 mb-7 justify-content-center'
                : 'mx-2 px-0 mt-4 mb-7 justify-content-center'
            }
          >
            <UserAvatar
              dataTestId="user-avatar"
              size={40}
              color="text-light"
              dropdownItems={
                <>
                  {/* <Dropdown.Item onClick={logout}>
                    {formatMessage({
                      id: 'MainHeader.logout-button',
                    })}
                  </Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Button
                      aria-label="select-de"
                      className="mr-1"
                      size="sm"
                      variant={languageActive ? 'primary' : 'middle'}
                      onClick={() => handleLanguageSelect('de')}
                    >
                      DE
                    </Button>
                    <Button
                      aria-label="select-en"
                      size="sm"
                      variant={!languageActive ? 'primary' : 'middle'}
                      onClick={() => handleLanguageSelect('en')}
                    >
                      EN
                    </Button>
                  </Dropdown.Item>
                </>
              }
            />
          </Row>
          {/* -- Nav Icons ------------------------------------------------------------- */}
          {appPageInfo.map(
            ({ path, icon, nameShort, description, descriptionDisabled }) => (
              <OverlayTrigger
                key={path}
                placement="right"
                overlay={
                  <Tooltip id={path}>
                    {formatMessage({
                      id:
                        Object.keys(spaceRoles).length === 0 &&
                        nameShort === 'Search.name-short'
                          ? descriptionDisabled
                          : description,
                    })}
                  </Tooltip>
                }
              >
                <Row className={isExpanded ? 'mx-0 mb-4' : 'mb-5 m-auto'}>
                  <Col
                    className="p-0"
                    xs={
                      isExpanded
                        ? { span: 2, offset: 2 }
                        : { span: 2, offset: 4 }
                    }
                  >
                    {Object.keys(spaceRoles).length === 0 &&
                    nameShort === 'Search.name-short' ? (
                      <ApplicationAvatar
                        icon={icon}
                        size={32}
                        style={{
                          opacity: 0.6,
                          cursor: 'default',
                        }}
                      />
                    ) : (
                      <Link
                        data-testid="navbar-icon"
                        to={path}
                        onClick={() => onChangeActivePath(path)}
                      >
                        <ApplicationAvatar
                          icon={icon}
                          size={32}
                          isActive={activePath === path}
                        />
                      </Link>
                    )}
                  </Col>
                  {isExpanded && (
                    <Col className="pl-0 pr-0 pt-1 text-decoration-none">
                      <Link
                        to={path}
                        onClick={() => onChangeActivePath(path)}
                        className="text-decoration-none text-middle"
                      >
                        {formatMessage({
                          id: nameShort,
                        })}
                      </Link>
                    </Col>
                  )}
                </Row>
              </OverlayTrigger>
            ),
          )}
          {/* {featureFlag.restErrorMocker && <RestErrorMocker />} */}
          {/* -- Back button ----------------------------------------------------------- */}
          <Container className="position-absolute" style={{ bottom: 35 }}>
            <Row
              data-testid="expand-toggler"
              className={isExpanded ? '' : 'ml-3'}
              onClick={() => updateIsExpanded(handleToggler(isExpanded))}
              style={{ minHeight: '30px' }}
            >
              <Col
                className="p-0"
                xs={
                  isExpanded ? { span: 2, offset: 5 } : { span: 2, offset: 4 }
                }
              >
                <div>
                  {isExpanded ? (
                    <ApplicationAvatar
                      icon={BsChevronLeft}
                      isActive={false}
                      size={32}
                    />
                  ) : (
                    <ApplicationAvatar
                      icon={BsChevronRight}
                      isActive={false}
                      size={32}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
        {/* -- Page Content ----------------------------------------------------------- */}
        <Col className="m-0 p-0" style={{ minWidth: '0' }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
