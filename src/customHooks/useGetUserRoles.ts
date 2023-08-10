import { useEffect, useState, useContext } from 'react';
import { StorageType, SpaceRoleType, spaceRoleTypes } from '@customTypes/index';
import { useOidcUser } from '@axa-fr/react-oidc';
import { UserInfoContext } from '@contexts/UserInfoContextProvider';
// import { useKeycloak } from '@react-keycloak/web';

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
  //   const { tokenParsed, token } = useKeycloak().keycloak;
  const { oidcUser } = useContext(UserInfoContext);
  const [userRoles, setUserRoles] = useState([] as unknown as T[]);

  useEffect(() => {
    if (oidcUser && name) {
      setUserRoles(parseRoles<T>(oidcUser.roles, name, type));
    }
  }, [name, oidcUser, type]);

  if (name) {
    return userRoles;
  }
  return undefined;
};

export const useGetAllRoles = <T>(type: StorageType) => {
  // const { tokenParsed, token } = useKeycloak().keycloak;
  const { oidcUser } = useContext(UserInfoContext);
  const [userRoles, setUserRoles] = useState(
    [] as unknown as Record<string, T>,
  );

  useEffect(() => {
    if (oidcUser) {
      setUserRoles(parseAllRoles<T>(type, oidcUser.roles));
    }
  }, [oidcUser, type]);

  return userRoles;
};
