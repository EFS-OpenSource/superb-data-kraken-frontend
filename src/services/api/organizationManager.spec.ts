import {
  getOrganizations,
  getSpaces,
  getOrganization,
  getSpace,
  updateOrganization,
  updateSpace,
  deleteSpace,
  setDeletionStateSpace,
  getOrganizationUsers,
  getSpaceUsers,
  setOrganizationRoleById,
  setSpaceRoleById,
  setOrganizationRoleByName,
  setSpaceRoleByName,
  setOrganizationRoleByEmail,
  setSpaceRoleByEmail,
  getOrganizationUserRequests,
  getSpaceUserRequests,
  createOrganizationUserRequest,
  createSpaceUserRequest,
  acceptOrganizationUserRequest,
  acceptSpaceUserRequest,
  declineOrganizationUserRequest,
  declineSpaceUserRequest,
  setOrganizationOwnersByUserId,
  setSpaceOwnersByUserId,
  addOrganizationOwnerByUsername,
  addSpaceOwnerByUsername,
  addOrganizationOwnerByEmail,
  addSpaceOwnerByEmail,
} from '@services/api/organizationManager';
import MockOrganization from '@assets/UserData';

test('getOrganizations function', () => {
  getOrganizations('READ');
});
test('getOrganizations function without permissions', () => {
  getOrganizations();
});

test('getSpaces function', () => {
  getSpaces('org', 'READ');
});
test('getSpaces function without permissions', () => {
  getSpaces('org');
});

// ff
test('getOrganization function', () => {
  getOrganization('orgId');
});
test('getSpace function', () => {
  getSpace('orgId', 'spaceId');
});
test('updateOrganization function', () => {
  updateOrganization(MockOrganization, 'orgId', false);
});
test('updateOrganization function with 3 params', () => {
  updateOrganization(MockOrganization, 'orgId');
});
test('updateSpace function', () => {
  updateSpace(MockOrganization.spaces[0], 'orgId', 'spaceId', false);
});
test('updateSpace function with 3 params', () => {
  updateSpace(MockOrganization.spaces[0], 'orgId', 'spaceId');
});
test('deleteSpace function', () => {
  deleteSpace('orgId', 'spaceId');
});
test('setDeletionStateSpace function', () => {
  setDeletionStateSpace('orgId', 'spaceId', true);
});
test('getOrganizationUsers function', () => {
  getOrganizationUsers('orgId');
});
test('getSpaceUsers function', () => {
  getSpaceUsers('orgId', 'spaceId');
});
test('setOrganizationRoleById function', () => {
  setOrganizationRoleById('orgId', 'userId', ['access']);
});
test('setSpaceRoleById function', () => {
  setSpaceRoleById('orgId', 'spaceId', 'userId', ['access']);
});
test('setOrganizationRoleByName function', () => {
  setOrganizationRoleByName('orgId', 'userId', ['access']);
});
test('setSpaceRoleByName function', () => {
  setSpaceRoleByName('orgId', 'spaceId', 'userId', ['access']);
});
test('setOrganizationRoleByEmail function', () => {
  setOrganizationRoleByEmail('orgId', 'userId', ['access']);
});
test('setSpaceRoleByEmail function', () => {
  setSpaceRoleByEmail('orgId', 'spaceId', 'userId', ['access']);
});
test('getOrganizationUserRequests function', () => {
  getOrganizationUserRequests('orgId');
});
test('getSpaceUserRequests function', () => {
  getSpaceUserRequests('orgId', 'spaceId');
});
test('createOrganizationUserRequest function', () => {
  createOrganizationUserRequest(
    { orgaId: 'orgaId', userId: 'userId', role: 'access' },
    'orgaId'
  );
});
test('createSpaceUserRequest function', () => {
  createSpaceUserRequest(
    { orgaId: 'orgaId', spaceId: 'spaceid', userId: 'userId', role: 'access' },
    'orgaId',
    'spaceId'
  );
});
test('acceptOrganizationUserRequest function', () => {
  acceptOrganizationUserRequest('orgId', 'id');
});
test('acceptSpaceUserRequest function', () => {
  acceptSpaceUserRequest('orgId', 'spaceId', 'id');
});
test('declineOrganizationUserRequest function', () => {
  declineOrganizationUserRequest('orgId', 'id');
});
test('declineSpaceUserRequest function', () => {
  declineSpaceUserRequest('orgId', 'spaceId', 'id');
});
test('setOrganizationOwnersByUserId function', () => {
  setOrganizationOwnersByUserId(['role'], 'orgId');
});
test('setSpaceOwnersByUserId function', () => {
  setSpaceOwnersByUserId(['role'], 'orgId', 'spaceId');
});
test('addOrganizationOwnerByUsername function', () => {
  addOrganizationOwnerByUsername('orgId', 'username');
});
test('addSpaceOwnerByUsername function', () => {
  addSpaceOwnerByUsername('orgId', 'spaceId', 'username');
});
test('addOrganizationOwnerByEmail function', () => {
  addOrganizationOwnerByEmail('orgId', 'email');
});
test('addSpaceOwnerByEmail function', () => {
  addSpaceOwnerByEmail('orgId', 'spaceId', 'email');
});
