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

import { useEffect, useMemo, useState } from 'react';
import { useOidcUser } from '@axa-fr/react-oidc';
import { Container } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { LoadingIndicator, Tabs } from '@components/index';
import { Tab, Organization } from '@customTypes/index';
import { getOrganizationsWithSpaces } from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { OrgGrid } from '@views/index';

function HomePage() {
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
          activeStyle="border-bottom border-primary border-1 ms-3 me-4"
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
}

export default HomePage;
