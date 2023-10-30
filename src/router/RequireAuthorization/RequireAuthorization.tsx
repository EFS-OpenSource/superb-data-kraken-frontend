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

import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '@components/index';
import validParams from '@utils/validParams';
import { getOrganizationsWithSpaces } from '@services/index';

function RequireAuthorization() {
  const { orgID, spaceID } = useParams();
  const location = useLocation();

  const { data: valid, isLoading } = useQuery(
    ['orgasWithSpacesForAuth'],
    async () => {
      const orgData = await getOrganizationsWithSpaces();

      const validParamsReturn = validParams(orgID, spaceID, orgData);

      return validParamsReturn;
    }
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return valid ? (
    <Outlet />
  ) : (
    <Navigate to='/home/overview' state={{ from: location.pathname }} replace />
  );
}

export default RequireAuthorization;
