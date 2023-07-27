import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { Tabs } from '@components/index';
import { Tab } from '@customTypes/tabs';
import { useOidcUser, useOidc } from '@axa-fr/react-oidc';

function HomePage() {
  const { formatMessage } = useIntl();
  const [tabs] = useState<Tab[]>([]);

  const { oidcUser, oidcUserLoadingState } = useOidcUser();

  const theTabs = [
    {
      name: 'HomePage.overview',
      id: 'HomePage.overview',
      level: 'primary',
      content: (
        <div className="w-100 d-flex">
          <p className="m-auto pt-6">Test</p>
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">User information</h5>
              <p className="card-text">
                {oidcUser ? JSON.stringify(oidcUser) : 'nicht eingeloggt'}
              </p>
            </div>
          </div>
        </div>
      ),
      // content: isLoading ? (
      //   <LoadingIndicator />
      // ) : (
      //   <OrgGrid username={memoToken.name} orgasWithSpaces={orgs} />
      // ),
      path: 'overview',
    },
  ];

  return (
    <Container fluid className="mb-8 pl-5 pl-lg-8 pt-5">
      <h1 className="ml-3 mb-4 pr-lg-0 pr-sm-5 pr-3 text-primary">
        {formatMessage({
          id: 'HomePage.title',
        })}
        {/* , {memoToken && memoToken.name} */}
      </h1>
      {tabs && (
        <Tabs
          tabs={theTabs}
          activeStyle="border-bottom border-primary border-3 ml-3 mr-4"
          inactiveStyle="none ml-3 mr-4"
          className="h2"
        />
      )}
    </Container>
  );
}

export default HomePage;
