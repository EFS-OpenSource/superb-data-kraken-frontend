import { useEffect, useMemo, useState } from 'react';
import { useOidcUser } from '@axa-fr/react-oidc';
import { Container } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { LoadingIndicator, Tabs } from '@components/index';
import { Tab } from '@customTypes/tabs';
import { getOrganizationsWithSpaces } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { OrgGrid } from '@views/index';
import { Organization } from '@customTypes/index';

const HomePage = () => {
  const { formatMessage } = useIntl();

  const { oidcUser } = useOidcUser();

  const [tabs, setTabs] = useState<Tab[]>();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const { data, isLoading, isError, error } = useQuery(
    ['orgasWithSpaces'],
    () => getOrganizationsWithSpaces(),
  );

  const memoOrgsWithSpaces = useMemo(() => data, [data]);
  const memoToken = useMemo(() => oidcUser, [oidcUser]);

  useEffect(() => {
    if (memoOrgsWithSpaces && memoToken) {
      setOrgs(memoOrgsWithSpaces);
    }
  }, [memoOrgsWithSpaces, memoToken]);

  useEffect(() => {
    if (memoToken) {
      const theTabs = [
        {
          name: 'HomePage.overview',
          id: 'HomePage.overview',
          level: 'primary',
          content: (
            <OrgGrid
              username={memoToken.name as string}
              orgasWithSpaces={orgs}
              userInfo={memoToken}
            />
          ),
          path: 'overview',
        },
      ];
      // if (featureFlag.newsTab) {
      //     theTabs = [
      //         ...theTabs,
      //         {
      //             name: 'HomePage.news',
      //             id: 'HomePage.news',
      //             level: 'primary',
      //             content: (
      //                 <OrgGrid
      //                     username={memoToken.name}
      //                     orgasWithSpaces={orgs}
      //                 />
      //             ),
      //             path: 'news',
      //         },
      //     ]
      // }
      setTabs([...theTabs]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, orgs]);

  return (
    <Container fluid className="mb-8 ps-5 ps-lg-8 pt-5">
      <h1 className="ms-3 mb-4 pe-lg-0 pe-sm-5 pe-3 text-primary">
        {formatMessage({
          id: 'HomePage.title',
        })}
        {oidcUser && `, ${oidcUser.name}`}
      </h1>
      {tabs && (
        <Tabs
          tabs={tabs}
          activeStyle="border-bottom border-primary border-3 ms-3 me-4"
          inactiveStyle="none ms-3 me-4"
          className="h2"
        />
      )}
      {isLoading && <LoadingIndicator />}
      {isError && error instanceof Error && (
        <div className="w-50 text-right">Could not load data</div>
      )}
    </Container>
  );
};

export default HomePage;
