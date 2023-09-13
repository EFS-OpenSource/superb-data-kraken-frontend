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

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrganizationOwners, getSpaceOwners } from '@services/index';
import { Owner, ResponseError, Response } from '@customTypes/index';

const useGetOwners = (orgaId?: string, spaceId?: string) => {
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

export default useGetOwners;
