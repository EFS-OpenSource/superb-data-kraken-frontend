import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '@components/index';
import validParams from '@utils/validParams';
import { getOrganizationsWithSpaces } from '@services/index';

const RequireAuthorization = () => {
  const { orgID, spaceID } = useParams();
  const location = useLocation();

  const { data: valid, isLoading } = useQuery(
    ['orgasWithSpacesForAuth'],
    async () => {
      const orgData = await getOrganizationsWithSpaces();

      const validParamsReturn = validParams(orgID, spaceID, orgData);

      return validParamsReturn;
    },
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }
  return valid ? (
    <Outlet />
  ) : (
    <Navigate to="/home/overview" state={{ from: location.pathname }} replace />
  );
};

export default RequireAuthorization;
