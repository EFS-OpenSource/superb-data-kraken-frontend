import { Container, Tabs } from 'react-bootstrap';

function HomePage() {
  return (
    <Container fluid className="mb-8 pl-5 pl-lg-8 pt-5">
      <h1 className="ml-3 mb-4 pr-lg-0 pr-sm-5 pr-3 text-primary">
        Hello World
        {/* {formatMessage({
                    id: 'HomePage.title',
                })} */}
        {/* , {memoToken && memoToken.name} */}
      </h1>
      {/* {tabs && ( */}
      <Tabs
        // tabs={tabs}
        // activeStyle="border-bottom border-primary border-3 ml-3 mr-4"
        // inactiveStyle="none ml-3 mr-4"
        className="h2"
      />
      {/* )} */}
    </Container>
  );
}

export default HomePage;
