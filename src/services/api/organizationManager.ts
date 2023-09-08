/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  OrgaSpaceUser,
  Owner,
  User,
  UserRequestOrganization,
  UserRequestOrganizationState,
  UserRequestSpace,
  UserRequestSpaceState,
  ResponseDelete,
  AxiosOptions,
  Response,
  ResponseError,
  Organization,
  UserOrgaRoleType,
  Space,
  UserSpaceRoleType,
} from '@customTypes/index';
import {
  postFactory,
  getFactory,
  putFactory,
  deleteFactory,
} from './factories';

// TODO: Enviroment Variables
// const baseURL = process.env.VITE_SDK_BACKEND_URL;

// const urlOptionsV1: AxiosOptions = {
//   url:
//     process.env['NODE_process.env'] === 'production'
//       ? (process.env.VITE_SDK_BACKEND_URL as string)
//       : (process.env.VITE_SDK_BACKEND_LOCAL_URL as string),
//   path: '/organizationmanager/api',
//   version: '/v1.0',
// };

const baseURL = 'https://sdk-dev.efs.ai:443';

const urlOptionsV1: AxiosOptions = {
  url: 'http://localhost:8090',
  path: '/organizationmanager/api',
  version: '/v1.0',
};

const urlOptionsV2: AxiosOptions = {
  url: 'http://localhost:8090',
  path: '/organizationmanager/api',
  version: '/v2.0',
};

/* Get all organizations */

const getOrganizations_ = getFactory<Organization[]>(urlOptionsV1, baseURL);

export const getOrganizations = (
  permissions?: 'WRITE' | 'READ',
): Promise<Response<Organization[]> | ResponseError> =>
  getOrganizations_('organization', {
    queryParams: permissions ? { permissions } : {},
  });

/* Get all spaces */

const getSpaces_ = getFactory<Space[]>(urlOptionsV2, baseURL);
export const getSpaces = (
  orgaId: string,
  permissions?: 'WRITE' | 'READ',
): Promise<Response<Space[]> | ResponseError> =>
  getSpaces_('organization/:orgaId/space', {
    pathParams: { orgaId },
    queryParams: permissions ? { permissions } : {},
  });

/* Get one organization by organization id */

const getOrganization_ = getFactory<Organization>(urlOptionsV1, baseURL);
export const getOrganization = (
  id: string,
): Promise<Response<Organization> | ResponseError> =>
  getOrganization_('organization/:id', {
    pathParams: { id },
  });

/* Get one space by space id */

const getSpace_ = getFactory<Space>(urlOptionsV2, baseURL);
export const getSpace = (
  orgaId: string,
  spaceId: string,
): Promise<Response<Space> | ResponseError> =>
  getSpace_('organization/:orgaId/space/:spaceId', {
    pathParams: { orgaId, spaceId },
  });

/* Get organizations with spaces data */

export const getOrganizationsWithSpaces = async () => {
  const listOrgs = await getOrganizations();

  const newOrganizations: Organization[] = await listOrgs.data;
  const spacePromises = listOrgs.ok
    ? newOrganizations.map(async (org: Organization) => {
        let orgWithSpaces = org;
        const getSpacesViaOrgId = await getSpaces(org.id.toString());
        const newSpaces = await getSpacesViaOrgId.data;
        const newSpaceWithId: Space[] = newSpaces.map((space: Space) => ({
          ...space,
          orgId: org.id,
        }));
        orgWithSpaces = { ...org, spaces: newSpaceWithId };
        return orgWithSpaces;
      })
    : [];

  const organizationsWithSpaces = await Promise.all(spacePromises);

  if (organizationsWithSpaces) {
    return organizationsWithSpaces;
  }

  throw new Error();
};

/* Update organization */

const updateOrganization_ = putFactory<Organization, Organization>(
  urlOptionsV1,
  baseURL,
);
export const updateOrganization = (
  payload: Organization,
  id: string | number,
): Promise<Response<Organization> | ResponseError> =>
  updateOrganization_('organization/:id', payload, {
    pathParams: { id },
  });

/* Update space  */

const updateSpace_ = putFactory<Space, Space>(urlOptionsV2, baseURL);
export const updateSpace = (
  payload: Space,
  orgaId: number | string,
  spaceId: number | string,
): Promise<Response<Space> | ResponseError> =>
  updateSpace_('organization/:orgaId/space/:spaceId', payload, {
    pathParams: { orgaId, spaceId },
  });

/* Create organization  */

const createOrganization_ = postFactory<Organization, Organization>(
  urlOptionsV1,
  baseURL,
);
export const createOrganization = (
  payload: Organization,
): Promise<Response<Organization> | ResponseError> =>
  createOrganization_('organization', payload);

/* Create space  */

const createSpace_ = postFactory<Space, Space>(urlOptionsV2, baseURL);
export const createSpace = (
  payload: Space,
  orgaId: number | string,
): Promise<Response<Space> | ResponseError> =>
  createSpace_('organization/:orgaId/space', payload, {
    pathParams: { orgaId },
  });

/* Delete space  */

const deleteSpace_ = deleteFactory(urlOptionsV2, baseURL);
export const deleteSpace = (
  orgaId: number | string,
  spaceId: number | string,
): Promise<ResponseDelete | ResponseError> =>
  deleteSpace_('organization/:orgaId/space/:spaceId', {
    pathParams: { orgaId, spaceId },
  });

/* Set deletion state of space */

const setDeletionStateSpace_ = putFactory<undefined, Space>(
  urlOptionsV2,
  baseURL,
);
export const setDeletionStateSpace = (
  orgaId: number | string,
  spaceId: number | string,
  willBeDeleted: boolean,
  payload = undefined,
): Promise<Response<Space> | ResponseError> =>
  setDeletionStateSpace_(
    'organization/:orgaId/space/:spaceId/setDeletionState',
    payload,
    {
      pathParams: { orgaId, spaceId },
      queryParams: { willBeDeleted },
    },
  );

/* Get users of organization */

const getOrganizationUsers_ = getFactory<OrgaSpaceUser<UserOrgaRoleType>[]>(
  urlOptionsV1,
  baseURL,
);
export const getOrganizationUsers = (
  orgaId: number | string,
): Promise<Response<OrgaSpaceUser<UserOrgaRoleType>[]> | ResponseError> =>
  getOrganizationUsers_('organization/:orgaId/users', {
    pathParams: { orgaId },
  });

/* Get users of space */

const getSpaceUsers_ = getFactory<OrgaSpaceUser<UserSpaceRoleType>[]>(
  urlOptionsV1,
  baseURL,
);
export const getSpaceUsers = (
  orgaId: number | string,
  spaceId: number | string,
): Promise<Response<OrgaSpaceUser<UserSpaceRoleType>[]> | ResponseError> =>
  getSpaceUsers_('organization/:orgaId/space/:spaceId/users', {
    pathParams: { orgaId, spaceId },
  });

/* Set user role in Organization by user id */

const setOrganizationRoleById_ = putFactory<undefined, User>(
  urlOptionsV1,
  baseURL,
);
export const setOrganizationRoleById = (
  orgaId: number | string,
  userId: number | string,
  roleScopes: string[],
  payload = undefined,
): Promise<Response<User> | ResponseError> =>
  setOrganizationRoleById_('organization/:orgaId/users/:userId', payload, {
    pathParams: { orgaId, userId },
    queryParams: { roleScopes },
  });

/* Set user role in Space by user id */

const setSpaceRoleById_ = putFactory<undefined, User>(urlOptionsV1, baseURL);
export const setSpaceRoleById = (
  orgaId: number | string,
  spaceId: number | string,
  userId: number | string,
  roleScopes: string[],
  payload = undefined,
): Promise<Response<User> | ResponseError> =>
  setSpaceRoleById_(
    'organization/:orgaId/space/:spaceId/users/:userId',
    payload,
    {
      pathParams: { orgaId, spaceId, userId },
      queryParams: { roleScopes },
    },
  );

/* Set user role in Organization by user name */

const setOrganizationRoleByName_ = putFactory<undefined, User>(
  urlOptionsV1,
  baseURL,
);
export const setOrganizationRoleByName = (
  orgaId: number | string,
  userName: string,
  roleScopes: string[],
  payload = undefined,
): Promise<Response<User> | ResponseError> =>
  setOrganizationRoleByName_(
    'organization/:orgaId/users/name/:userName',
    payload,
    {
      pathParams: { orgaId, userName },
      queryParams: { roleScopes },
    },
  );

/* Set user role in Space by user id */

const setSpaceRoleByName_ = putFactory<undefined, User>(urlOptionsV1, baseURL);
export const setSpaceRoleByName = (
  orgaId: number | string,
  spaceId: number | string,
  userName: string,
  roleScopes: string[],
  payload = undefined,
): Promise<Response<User> | ResponseError> =>
  setSpaceRoleByName_(
    'organization/:orgaId/space/:spaceId/users/name/:userName',
    payload,
    {
      pathParams: { orgaId, spaceId, userName },
      queryParams: { roleScopes },
    },
  );

/* Set user role in Organization by user email */

const setOrganizationRoleByEmail_ = putFactory<undefined, User>(
  urlOptionsV1,
  baseURL,
);
export const setOrganizationRoleByEmail = (
  orgaId: number | string,
  userEmail: string,
  roleScopes: string[],
  payload = undefined,
): Promise<Response<User> | ResponseError> =>
  setOrganizationRoleByEmail_(
    'organization/:orgaId/users/email/:userEmail',
    payload,
    {
      pathParams: { orgaId, userEmail },
      queryParams: { roleScopes },
    },
  );

/* Set user role in Space by user email */

const setSpaceRoleByEmail_ = putFactory<undefined, User>(urlOptionsV1, baseURL);
export const setSpaceRoleByEmail = (
  orgaId: number | string,
  spaceId: number | string,
  userEmail: string,
  roleScopes: string[],
  payload = undefined,
): Promise<Response<User> | ResponseError> =>
  setSpaceRoleByEmail_(
    'organization/:orgaId/space/:spaceId/users/email/:userEmail',
    payload,
    {
      pathParams: { orgaId, spaceId, userEmail },
      queryParams: { roleScopes },
    },
  );

/* Get organization user requests */

const getOrganizationUserRequests_ = getFactory<UserRequestOrganizationState[]>(
  urlOptionsV1,
  baseURL,
);
export const getOrganizationUserRequests = (
  orgaId: number | string,
): Promise<Response<UserRequestOrganizationState[]> | ResponseError> =>
  getOrganizationUserRequests_('organization/:orgaId/userrequests', {
    pathParams: { orgaId },
  });

/* Get space user requests */

const getSpaceUserRequests_ = getFactory<UserRequestSpaceState[]>(
  urlOptionsV1,
  baseURL,
);
export const getSpaceUserRequests = (
  orgaId: number | string,
  spaceId: number | string,
): Promise<Response<UserRequestSpaceState[]> | ResponseError> =>
  getSpaceUserRequests_('organization/:orgaId/space/:spaceId/userrequests', {
    pathParams: { orgaId, spaceId },
  });

/* Create user request in organization */

const createOrganizationUserRequest_ = postFactory<
  UserRequestOrganization,
  UserRequestOrganizationState
>(urlOptionsV1, baseURL);
export const createOrganizationUserRequest = (
  payload: UserRequestOrganization,
  orgaId: number | string,
): Promise<Response<UserRequestOrganizationState> | ResponseError> =>
  createOrganizationUserRequest_('organization/:orgaId/userrequests', payload, {
    pathParams: { orgaId },
  });

/* Create user request in space */

const createSpaceUserRequest_ = postFactory<
  UserRequestSpace,
  UserRequestSpaceState
>(urlOptionsV1, baseURL);
export const createSpaceUserRequest = (
  payload: UserRequestSpace,
  orgaId: number | string,
  spaceId: number | string,
): Promise<Response<UserRequestSpaceState> | ResponseError> =>
  createSpaceUserRequest_(
    'organization/:orgaId/space/:spaceId/userrequests',
    payload,
    {
      pathParams: { orgaId, spaceId },
    },
  );

/* Accept user request in organization */

const acceptOrganizationUserRequest_ = putFactory<
  undefined,
  UserRequestOrganizationState
>(urlOptionsV1, baseURL);
export const acceptOrganizationUserRequest = (
  orgaId: number | string,
  id: number | string,
  payload = undefined,
): Promise<Response<UserRequestOrganizationState> | ResponseError> =>
  acceptOrganizationUserRequest_(
    'organization/:orgaId/userrequests/:id/accept',
    payload,
    {
      pathParams: { orgaId, id },
    },
  );

/* Accept user request in space */

const acceptSpaceUserRequest_ = putFactory<undefined, UserRequestSpaceState>(
  urlOptionsV1,
  baseURL,
);
export const acceptSpaceUserRequest = (
  orgaId: number | string,
  spaceId: number | string,
  id: number | string,
  payload = undefined,
): Promise<Response<UserRequestSpaceState> | ResponseError> =>
  acceptSpaceUserRequest_(
    'organization/:orgaId/space/:spaceId/userrequests/:id/accept',
    payload,
    {
      pathParams: { orgaId, spaceId, id },
    },
  );

/* Decline user request in organization */

const declineOrganizationUserRequest_ = putFactory<
  undefined,
  UserRequestOrganizationState
>(urlOptionsV1, baseURL);
export const declineOrganizationUserRequest = (
  orgaId: number | string,
  id: number | string,
  payload = undefined,
): Promise<Response<UserRequestOrganizationState> | ResponseError> =>
  declineOrganizationUserRequest_(
    'organization/:orgaId/userrequests/:id/decline',
    payload,
    {
      pathParams: { orgaId, id },
    },
  );

/* Decline user request in space */

const declineSpaceUserRequest_ = putFactory<undefined, UserRequestSpaceState>(
  urlOptionsV1,
  baseURL,
);
export const declineSpaceUserRequest = (
  orgaId: number | string,
  spaceId: number | string,
  id: number | string,
  payload = undefined,
): Promise<Response<UserRequestSpaceState> | ResponseError> =>
  declineSpaceUserRequest_(
    'organization/:orgaId/space/:spaceId/userrequests/:id/decline',
    payload,
    {
      pathParams: { orgaId, spaceId, id },
    },
  );

/* Get organization owners */

const getOrganizationOwners_ = getFactory<Owner[]>(urlOptionsV1, baseURL);
export const getOrganizationOwners = (
  orgaId: string,
): Promise<Response<Owner[]> | ResponseError> =>
  getOrganizationOwners_('organization/:orgaId/owners', {
    pathParams: { orgaId },
  });

/* Get space owners */

const getSpaceOwners_ = getFactory<Owner[]>(urlOptionsV1, baseURL);
export const getSpaceOwners = (
  orgaId: number | string,
  spaceId: number | string,
): Promise<Response<Owner[]> | ResponseError> =>
  getSpaceOwners_('organization/:orgaId/space/:spaceId/owners', {
    pathParams: { orgaId, spaceId },
  });

/* Set organization owners by user id */

const setOrganizationOwnersByUserId_ = putFactory<string[], Organization>(
  urlOptionsV1,
  baseURL,
);
export const setOrganizationOwnersByUserId = (
  payload: string[],
  orgaId: number | string,
): Promise<Response<Organization> | ResponseError> =>
  setOrganizationOwnersByUserId_('organization/:orgaId/owners', payload, {
    pathParams: { orgaId },
  });

/* Set space owners by user id */

const setSpaceOwnersByUserId_ = putFactory<string[], Space>(
  urlOptionsV1,
  baseURL,
);
export const setSpaceOwnersByUserId = (
  payload: string[],
  orgaId: number | string,
  spaceId: number | string,
): Promise<Response<Space> | ResponseError> =>
  setSpaceOwnersByUserId_(
    'organization/:orgaId/space/:spaceId/owners',
    payload,
    {
      pathParams: { orgaId, spaceId },
    },
  );

/* Add owner to organization by username */

const addOrganizationOwnerByUsername_ = putFactory<undefined, Organization>(
  urlOptionsV1,
  baseURL,
);
export const addOrganizationOwnerByUsername = (
  orgaId: number | string,
  userName: string,
  payload = undefined,
): Promise<Response<Organization> | ResponseError> =>
  addOrganizationOwnerByUsername_(
    'organization/:orgaId/owners/name/:userName',
    payload,
    {
      pathParams: { orgaId, userName },
    },
  );

/* Add owner to space by username */

const addSpaceOwnerByUsername_ = putFactory<undefined, Space>(
  urlOptionsV1,
  baseURL,
);
export const addSpaceOwnerByUsername = (
  orgaId: number | string,
  spaceId: number | string,
  userName: string,
  payload = undefined,
): Promise<Response<Space> | ResponseError> =>
  addSpaceOwnerByUsername_(
    'organization/:orgaId/space/:spaceId/owners/name/:userName',
    payload,
    {
      pathParams: { orgaId, spaceId, userName },
    },
  );

/* Add owner to organization by email */

const addOrganizationOwnerByEmail_ = putFactory<undefined, Organization>(
  urlOptionsV1,
  baseURL,
);
export const addOrganizationOwnerByEmail = (
  orgaId: number | string,
  email: string,
  payload = undefined,
): Promise<Response<Organization> | ResponseError> =>
  addOrganizationOwnerByEmail_(
    'organization/:orgaId/owners/email/:email',
    payload,
    {
      pathParams: { orgaId, email },
    },
  );

/* Add owner to space by email */

const addSpaceOwnerByEmail_ = putFactory<undefined, Space>(
  urlOptionsV1,
  baseURL,
);
export const addSpaceOwnerByEmail = (
  orgaId: number | string,
  spaceId: number | string,
  email: string,
  payload = undefined,
): Promise<Response<Space> | ResponseError> =>
  addSpaceOwnerByEmail_(
    'organization/:orgaId/space/:spaceId/owners/email/:email',
    payload,
    {
      pathParams: { orgaId, spaceId, email },
    },
  );
