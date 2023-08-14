import { useEffect, useState } from 'react';
import { StorageType, SpaceRoleType, spaceRoleTypes } from '@customTypes/index';
import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc';

export const parseRoles = <T>(
  roles: string[],
  name: string,
  type: StorageType,
): T[] => {
  const userRoles: T[] = [];
  roles.forEach((role: string): void => {
    const splittedRole = role.split('_');

    if (
      (type === 'organization'
        ? splittedRole.includes('org')
        : !splittedRole.includes('org')) &&
      splittedRole.includes(name)
    ) {
      userRoles.push(splittedRole[splittedRole.length - 1] as unknown as T);
    }
  });
  return userRoles;
};

export const parseAllRoles = <T>(
  type: StorageType,
  roles: string[],
): Record<string, T> => {
  let filteredRoles;
  if (type === 'organization') {
    filteredRoles = roles.filter((element) => element.includes('org_'));
  } else
    filteredRoles = roles.filter((element) => {
      const splittedRoleName = element.split('_');
      return splittedRoleName.length === 3 &&
        spaceRoleTypes.includes(
          splittedRoleName[splittedRoleName.length - 1] as SpaceRoleType,
        )
        ? !element.includes('org_')
        : null;
    });

  const groupedRoles = filteredRoles.reduce((acc: any, currentRole) => {
    const splittedRoleName: string[] = currentRole.split('_');
    return {
      ...acc,
      [splittedRoleName[1]]: acc[splittedRoleName[1]]
        ? [...acc[splittedRoleName[1]], splittedRoleName[2]]
        : [splittedRoleName[2]],
    };
  }, {});
  return groupedRoles;
};

export const useGetRoles = <T>(name: string | undefined, type: StorageType) => {
  const [userRoles, setUserRoles] = useState([] as unknown as T[]);
  const { idTokenPayload } = useOidcIdToken();
  const { isAuthenticated } = useOidc();

  useEffect(() => {
    if (isAuthenticated) {
      setUserRoles(
        parseRoles<T>(idTokenPayload.roles, idTokenPayload.name, type),
      );
    }
  }, [idTokenPayload.name, idTokenPayload.roles, isAuthenticated, name, type]);

  if (name) {
    return userRoles;
  }
  return undefined;
};

export const useGetAllRoles = <T>(type: StorageType) => {
  const [userRoles, setUserRoles] = useState(
    [] as unknown as Record<string, T>,
  );
  const { idTokenPayload } = useOidcIdToken();
  const { isAuthenticated } = useOidc();

  useEffect(() => {
    if (isAuthenticated) {
      setUserRoles(parseAllRoles<T>(type, idTokenPayload.roles));
    }
  }, [idTokenPayload.roles, isAuthenticated, type]);

  return userRoles;
};
