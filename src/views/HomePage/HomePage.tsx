import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import Tabs from 'src/components/stateless-components/tabs/Tabs/Tabs';
import { Tab } from 'src/types/tabs';

function HomePage() {
  const { formatMessage } = useIntl();
  const [tabs, setTabs] = useState<Tab[]>([]);

  const theTabs = [
    {
      name: 'HomePage.overview',
      id: 'HomePage.overview',
      level: 'primary',
      content: (
        <div className="w-100 d-flex">
          <p className="m-auto pt-6">Test</p>
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
