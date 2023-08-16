import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrganizationOwners, getSpaceOwners } from '@services/index';
import { Owner, ResponseError, Response } from '@customTypes/index';

// eslint-disable-next-line import/prefer-default-export
export const useGetOwners = (orgaId?: string, spaceId?: string) => {
  const [owners, setOwners] = useState<Owner[]>([]);

  const { data } = useQuery(
    spaceId ? ['spaceOwners', spaceId, `o_${orgaId}`] : ['orgaOwners', orgaId],
    (): any => {
      if (orgaId && spaceId) {
        return getSpaceOwners(orgaId, spaceId);
      }
      if (orgaId && !spaceId) return getOrganizationOwners(orgaId);

      const response: ResponseError | Response<Owner[]> = data ?? {
        data: [],
      };

      return response;
    },
  );

  useEffect(() => {
    if (data) {
      setOwners(data.data);
    }
  }, [data]);

  return owners;
};
