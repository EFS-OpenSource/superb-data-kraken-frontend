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

import {
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  Suspense,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { LoadingIndicator } from '@components/index';
import { ErrorToast, SuccessToast } from '@notifications/index';
import { Button } from 'react-bootstrap';

import {
  createOrganization,
  createSpace,
  updateSpace,
  updateOrganization,
  setOrganizationOwnersByUserId,
  setSpaceOwnersByUserId,
  setSpaceOwnersByEmail,
  setOrganizationRoleByEmail,
  setSpaceRoleByEmail,
  addOrganizationOwnerByEmail,
  addSpaceOwnerByEmail
} from '@services/index';
import {
  Confidentiality,
  Space,
  SpaceState,
  UserOrgaRoleType,
  UserSpaceRoleType,
  OrganizationModalTabNameType,
  SpaceModalTabNameType,
  ModalTypes,
  MapType,
  TabData,
  TabWithoutPath,
  OrgaUser,
  SpaceUser,
  Organization,
  Owner,
  ModalTabNameType,
  OrgaSpaceUser,
} from '@customTypes/index';
import { OrgSpaceModalParent } from '@views/index';
import _ from 'lodash';
import { number } from 'prop-types';

type ManageOrgaSpaceModalProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  owners: Owner[];
  tabNames: ModalTabNameType;
  modalType: ModalTypes;
  tabComponents: MapType;
  roles: readonly string[];
  orgData?: Organization;
  spaceData?: Space;
  users?: OrgaUser[] | SpaceUser[];
  onMutation?: (mutationState: boolean) => void;
  isOwner?: boolean;
};

function ManageOrgaSpaceModal({
  show,
  setShow,
  owners,
  users,
  roles,
  orgData,
  spaceData,
  tabComponents,
  tabNames,
  modalType,
  onMutation,
  isOwner,
}: ManageOrgaSpaceModalProps) {
  const intialModalData = () => {
    if (modalType === 'editSpace' && spaceData) {
      return spaceData;
    }
    if (modalType === 'editOrganization' && orgData) {
      return orgData;
    }
    if (modalType === 'createSpace') {
      return {
        id: 0,
        name: '',
        gdprRelevant: false,
        confidentiality: 'INTERNAL' as Confidentiality,
        state: 'OPEN' as SpaceState,
        capabilities: [],
        defaultRetentionTime: 365,
        metadataGenerate: true,
        modified: '',
      };
    }

    return {
      id: 0,
      name: '',
      company: '',
      confidentiality: 'INTERNAL' as Confidentiality,
      spaces: [],
    };
  };

  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const { orgID, spaceID } = useParams();
  const [validated, setValidated] = useState<boolean>(false);
  const [modalTabs, setModalTabs] = useState<(TabData & TabWithoutPath)[]>([]);
  const [modalData, setModalData] = useState<Space | Organization>(
    intialModalData
  );

  const initialOwners = owners.map((owner) => owner.id);

  const [updatedOwners, setUpdatedOwners] = useState<Owner[]>(owners);

  const [initialUsers, setInitialUsers] = useState<OrgaUser[] | SpaceUser[]>(
    []
  );

  const [updatedUsers, setUpdatedUsers] = useState<Record<string, any>>(
    users
      ? users?.map((user) => ({
          email: user.email,
          permissions: user.permissions,
          id: user.id,
        }))
      : []
  );

  useEffect(() => {
    if ('capabilitites' in modalData) {
      const initialUsersSpace = users
        ? users?.map((user) => ({
            ...user,
            permissions: user.permissions as unknown as UserSpaceRoleType,
          }))
        : undefined;
      setInitialUsers(initialUsersSpace as unknown as SpaceUser[]);
    } else {
      const initialUsersOrga = users
        ? users?.map((user) => ({
            ...user,
            permissions: user.permissions as unknown as UserOrgaRoleType,
          }))
        : undefined;
      setInitialUsers(initialUsersOrga as unknown as OrgaUser[]);
    }
  }, [modalData, users]);

  // HANDLE MODAL ENDPOINTS FUNCTIONALITY AND TOAST FEEDBACKS

  const haveOwnersChanged = (initial: string[], updated: string[]): boolean =>
    JSON.stringify(initial.sort()) !== JSON.stringify(updated.sort());

  const stringifyUsers = (usersToStringify: OrgaUser[] | SpaceUser[]) => {
    if (usersToStringify === undefined) return undefined;
    const usersToStringifyFixed: Array<(typeof usersToStringify)[number]> =
      usersToStringify;
    const usersWithEmail = Array.isArray(usersToStringify)
      ? usersToStringifyFixed.filter((user) => user.email != null)
      : [];

    const sortedUsers = usersWithEmail
      .map(({ email, permissions }) => ({
        email,
        permissions,
      }))
      .sort((a: { email: string }, b: { email: string }) =>
        a.email.localeCompare(b.email)
      );

    return JSON.stringify(sortedUsers);
  };

  const haveUsersChanged = (
    initial: OrgaUser[] | SpaceUser[],
    updated: OrgaUser[] | SpaceUser[]
  ): boolean => stringifyUsers(initial) !== stringifyUsers(updated);

  const [activeKey, setActiveKey] = useState(tabNames[0]);

  const updateOrganizationUsersMutation = useMutation(() =>
    updatedUsers
      ?.filter(
        (updatedUser: { email: string; permissions: UserOrgaRoleType }) => {
          const initialUsersFixed: Array<(typeof initialUsers)[number]> =
            initialUsers;

          const initialUser = initialUsersFixed.find(
            (user: { email: string }) => user.email === updatedUser.email
          );
          return (
            !initialUser ||
            JSON.stringify(initialUser.permissions) !==
              JSON.stringify(updatedUser.permissions)
          );
        }
      )
      .map((updatedUser: OrgaUser | SpaceUser) =>
        setOrganizationRoleByEmail(
          orgID as string,
          updatedUser.email,
          updatedUser.permissions as unknown as string[]
        ).then((response) => {
          if (response.ok) {
            queryClient.invalidateQueries(['orgasWithSpaces']);
            queryClient.invalidateQueries(['organization', orgID]);
            queryClient.invalidateQueries(['orgaUsers', orgID]);
          } else {
            ErrorToast(
              'ErrorToast.title-users-edit',
              `User: ${updatedUser.email}`,
              response.data.message,
              response.data.errorCode
            );
          }
        })
      )
  );
  
  // TODO: change with new Endpoint, to make it with bulk
  const addOrganizationOwnerByEmailMutation = useMutation(
    (newOwner: string) =>
    addOrganizationOwnerByEmail(
      orgID as string,
      newOwner
    ),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['orgasWithSpaces']);
        queryClient.invalidateQueries(['organization', orgID]);
        queryClient.invalidateQueries(['orgaOwners', orgID]);
      },
      onError: () => {
        ErrorToast('ErrorToast.title-owners-edit');
      },
    }
  );

  const updateOrganizationOwnersMutation = useMutation(
    (newOwners?: string[]) =>
      setOrganizationOwnersByUserId(
        newOwners || updatedOwners.map(owner => owner.id),
        orgID as string
      ),    
      {
      onSuccess: () => {
        queryClient.invalidateQueries(['orgasWithSpaces']);
        queryClient.invalidateQueries(['organization', orgID]);
        queryClient.invalidateQueries(['orgaOwners', orgID]);
      },
      onError: () => {
        ErrorToast('ErrorToast.title-owners-edit');
      },
    }
  );

  const updateSpaceUsersMutation = useMutation((currentSpaceID: string) =>
    updatedUsers
      ?.filter(
        (updatedUser: {
          email: string;
          permissions: UserOrgaRoleType | UserSpaceRoleType;
        }) => {
          const initialUsersFixed: Array<(typeof initialUsers)[number]> =
            initialUsers;
          const initialUser = initialUsersFixed.find(
            (user: { email: string }) => user.email === updatedUser.email
          );
          return (
            !initialUser ||
            JSON.stringify(initialUser.permissions) !==
              JSON.stringify(updatedUser.permissions)
          );
        }
      )
      .map((updatedUser: OrgaUser | SpaceUser) =>
        setSpaceRoleByEmail(
          orgID as string,
          currentSpaceID,
          updatedUser.email,
          updatedUser.permissions as unknown as string[]
        ).then((response) => {
          if (response.ok) {
            queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
            queryClient.invalidateQueries(['space', spaceID, `o_${orgID}`]);
            queryClient.invalidateQueries([
              'spaceUsers',
              spaceID,
              `o_${orgID}`,
            ]);
          } else {
            ErrorToast(
              'ErrorToast.title-users-edit',
              `User: ${updatedUser.email}`,
              response.data.message,
              response.data.errorCode
            );
          }
        })
      )
  );
  
  // TODO: user new Enpoint, with bulk
  const addSpaceOwnersByEmailMutation = useMutation(
    ({
      currentSpaceID,
      newOwnersEmail,
    } : {
      currentSpaceID: string;
      newOwnersEmail: string;
    }) =>
      addSpaceOwnerByEmail(
        orgID as string,
        currentSpaceID,
        newOwnersEmail
      ),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
        queryClient.invalidateQueries(['space', spaceID, `o_${orgID}`]);
        queryClient.invalidateQueries(['spaceOwners', spaceID, `o_${orgID}`]);
        queryClient.invalidateQueries([
          'spaceUsers',
          spaceID,
          `o_${orgID}`,
        ]);
      },
      onError: () => {
        ErrorToast('ErrorToast.title-owners-edit');
      },
    }
  );

  const updateSpaceOwnersMutation = useMutation(
    ({
      currentSpaceID,
      newOwners,
    }: {
      currentSpaceID: string;
      newOwners?: string[];
    }) =>
      setSpaceOwnersByUserId(
        newOwners || updatedOwners.map(owner => owner.id),
        orgID as string,
        currentSpaceID
      ),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
        queryClient.invalidateQueries(['space', spaceID, `o_${orgID}`]);
        queryClient.invalidateQueries(['spaceOwners', spaceID, `o_${orgID}`]);
      },
      onError: () => {
        ErrorToast('ErrorToast.title-owners-edit');
      },
    }
  );
  
  // TODO: change to email
  const updateSpaceOwnersByEmailMutation = useMutation(
    ({
      currentSpaceID,
      newOwners,
    }: {
      currentSpaceID: string;
      newOwners?: string[];
    }) =>
      setSpaceOwnersByUserId(
        newOwners || updatedOwners.map(owner => owner.id),
        orgID as string,
        currentSpaceID
      ),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
        queryClient.invalidateQueries(['space', spaceID, `o_${orgID}`]);
        queryClient.invalidateQueries(['spaceOwners', spaceID, `o_${orgID}`]);
      },
      onError: () => {
        ErrorToast('ErrorToast.title-owners-edit');
      },
    }
  );

  const createOrganizationMutation = useMutation(
    () =>
      createOrganization(modalData as Organization)
        .then((response) => {
          if (!response.ok) throw new Error(response.data.errorCode);
          return response.data.id;
        })
        .then((response) => {
          updateOrganizationUsersMutation.mutate(response);
        }),
    {
      onSuccess: () => {
        SuccessToast('SuccessToast.title-org-create');
        queryClient.invalidateQueries(['orgasWithSpaces']);
      },
      onError: (error: Error) => {
        ErrorToast('ErrorToast.title-org-create', '', '', error.message);
      },
      onMutate: () => {
        if (onMutation) onMutation(true);
      },
      onSettled: () => {
        if (onMutation) onMutation(false);
      },
    }
  );

  const removeOwnerWithUser = (updated: OrgaUser[] | SpaceUser[]) => {
    const updatedUsersFixed: Array<(typeof updated)[number]> = updated;
    if (updated) {
      const removedUsers = updatedUsersFixed.filter(
        (updatedUser: OrgaUser | SpaceUser) =>
          updatedUser.permissions.length === 0
      );

      if (removedUsers) {
        let newOwners = updatedOwners.map(owner => owner.id).filter((id) => !id.includes('@'));
        removedUsers.forEach((removedUser: OrgaUser | SpaceUser) => {
          if (updatedOwners.map(owner => owner.id).includes(removedUser.id)) {
            newOwners = updatedOwners.map(owner => owner.id).filter((id) => id !== removedUser.id);
          }
        });
        if (haveOwnersChanged(updatedOwners.map(owner => owner.id), newOwners)) {
          if (modalType === 'editSpace') {
            updateSpaceOwnersMutation.mutate({
              newOwners,
              currentSpaceID: spaceID as string,
            });
          } else if (modalType === 'editOrganization') {
            updateOrganizationOwnersMutation.mutate(newOwners);
          }
        }
      }
    }
  };

  const updateOrganizationMutation = useMutation(
    (hasOrganizationChanged?: boolean) =>
      updateOrganization(
        modalData as Organization,
        orgID as string,
        hasOrganizationChanged
      )
        .then((response) => {
          if (!response.ok) throw new Error(response.data.errorCode);
          if (isOwner) {
            if (haveUsersChanged(initialUsers, updatedUsers as SpaceUser[])) {
              removeOwnerWithUser(updatedUsers as SpaceUser[]);
              updateOrganizationUsersMutation.mutate();
            }
          }
          return response;
        })
        .then((response) => {
          if (!response.ok) throw new Error();
          if (isOwner) {
            if (haveOwnersChanged(initialOwners, updatedOwners.map(owner => owner.id))) {
              updateOrganizationOwnersMutation.mutate(updatedOwners.map(owner => owner.id).filter(owner => !owner.includes('@')));

              const newUsersOwners = updatedOwners.map(owner => owner.id).filter(owner => owner.includes('@'));
              if(newUsersOwners.length !== 0) {
                // TODO: mutate with list of OwnersByEmail


                // newUsersOwners.forEach((owner) => {
                //   addOrganizationOwnerByEmailMutation.mutate(owner);
                // })
              }
            }
          }
          return response;
        }),
    {
      onSuccess: () => {
        SuccessToast('SuccessToast.title-org-edit');
        queryClient.invalidateQueries(['orgasWithSpaces']);
        queryClient.invalidateQueries(['organization', orgID]);
      },
      onError: (error: Error) => {
        ErrorToast('ErrorToast.title-org-edit', '', '', error.message);
      },
      onMutate: () => {
        if (onMutation) onMutation(true);
      },
      onSettled: () => {
        if (onMutation) onMutation(false);
      },
    }
  );

  const createSpaceMutation = useMutation(
    () =>
      createSpace(modalData as Space, orgID as string)
        .then((response) => {
          if (!response.ok) throw new Error(response.data.errorCode);
          return response.data.id;
        })
        .then((response) => {
          updateSpaceUsersMutation.mutate(response);
        }),
    {
      onSuccess: () => {
        SuccessToast('SuccessToast.title-space-create');
        queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
      },
      onError: (error: Error) => {
        ErrorToast('ErrorToast.title-space-create', '', '', error.message);
      },
      onMutate: () => {
        if (onMutation) onMutation(true);
      },
      onSettled: () => {
        if (onMutation) onMutation(false);
      },
    }
  );

  const updateSpaceMutation = useMutation(
    (hasSpaceChanged?: boolean) =>
      updateSpace(
        modalData as Space,
        orgID as string,
        spaceID as string,
        hasSpaceChanged
      )
        .then((response) => {
          if (!response.ok) throw new Error(response.data.errorCode);
          if (isOwner) {
            if (haveUsersChanged(initialUsers, updatedUsers as SpaceUser[])) {
              updateSpaceUsersMutation.mutate(spaceID as string);
              removeOwnerWithUser(updatedUsers as SpaceUser[]);
            }
          }
          return response;
        })
        .then((response) => {
          if (!response.ok) throw new Error();
          if (isOwner) {
            if (haveOwnersChanged(initialOwners, updatedOwners.map(owner => owner.id))) {
              updateSpaceOwnersMutation.mutate({
                currentSpaceID: spaceID as string,
              });

              const newUsersOwners = updatedOwners.map(owner => owner.id).filter(owner => owner.includes('@'));
              if(newUsersOwners.length !== 0) {
                // TODO: mutate with list of OwnersByEmail

                let i = 0;
                const addSpaceOwnerByEmailLoop = () => {
                  setTimeout(() => {
                    addSpaceOwnersByEmailMutation.mutate( {
                      currentSpaceID: spaceID as string,
                      newOwnersEmail: newUsersOwners[i]
                    }
                    )
                    i+= 1;
                    if( i < newUsersOwners.length) {
                      addSpaceOwnerByEmailLoop();
                    }
                  }, 500)
                }
                addSpaceOwnerByEmailLoop();
              }
            }
          }
          return response;
        }),

    {
      onSuccess: () => {
        SuccessToast('SuccessToast.title-space-edit');
        queryClient.invalidateQueries(['spaces', `o_${orgID}`]);
        queryClient.invalidateQueries(['space', spaceID, `o_${orgID}`]);
      },
      onError: (error: Error) => {
        ErrorToast('ErrorToast.title-space-edit', '', '', error.message);
      },
      onMutate: () => {
        if (onMutation) onMutation(true);
      },
      onSettled: () => {
        if (onMutation) onMutation(false);
      },
    }
  );

  // SETUP MODAL CONTENT

  const handleModalTabs = useCallback(
    (modals: (OrganizationModalTabNameType | SpaceModalTabNameType)[]) => {
      const components = tabComponents;

      const visibleModals = modals
        .map((ModalID) => {
          const CustomTag = components[ModalID as keyof MapType].component;
          if (components[ModalID as keyof MapType].visiblity) {
            return {
              name: formatMessage({
                id: `OrgaSpaceManagement.${ModalID}`,
              }),
              id: `${ModalID}`,
              modalData: { modalData },
              handleChange: { setModalData },
              initialUsers: { users },
              initialOwners: { owners },
              onUpdateOwners: { setUpdatedOwners },
              onUpdateUsers: { setUpdatedUsers },
              roles: { roles },
              isOwner: { isOwner },
              content: (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  className='d-flex flex-column overflow-scroll'
                >
                  <Suspense fallback={<LoadingIndicator />}>
                    {modalData && (
                      <CustomTag
                        key={ModalID}
                        modalData={modalData}
                        handleChange={setModalData}
                        roles={roles}
                        initialUsers={users}
                        initialOwners={owners}
                        onUpdateOwners={setUpdatedOwners}
                        onUpdateUsers={setUpdatedUsers}
                        isOwner={isOwner}
                      />
                    )}
                  </Suspense>
                </div>
              ),
            };
          }
          return null;
        })
        .filter((object) => object !== null);

      setModalTabs(visibleModals as unknown as (TabData & TabWithoutPath)[]);
    },
    [tabComponents, formatMessage, modalData, users, owners, roles, isOwner]
  );

  let nextButton: JSX.Element;

  switch (activeKey) {
    case tabNames[tabNames.length - 1]:
      nextButton = (
        <Button aria-label='submitButton' type='submit'>
          {formatMessage({
            id: 'AddEditOrgSpacesModal.submit-button',
          })}
        </Button>
      );
      break;

    default:
      nextButton = (
        <Button
          aria-label='nextButton'
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setActiveKey(
              tabNames[
                tabNames.indexOf(activeKey) + 1
              ] as SetStateAction<'General'>
            );
          }}
        >
          {formatMessage({
            id: 'AddEditOrgSpacesModal.next-button',
          })}
        </Button>
      );
  }

  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setActiveKey(tabNames[0]);
    setTimeout(() => {
      setModalData(intialModalData);
    }, 1000);
  };

  const handleSubmit = (event: {
    currentTarget: HTMLInputElement;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      ErrorToast('ErrorToast.title-org-validation');

      return;
    }
    if (modalType === 'createOrganization') {
      createOrganizationMutation.mutate();
    }
    if (modalType === 'createSpace') {
      createSpaceMutation.mutate();
    }
    if (modalType === 'editOrganization') {
      const hasOrganizationChanged = !_.isEqual(orgData, modalData);
      updateOrganizationMutation.mutate(hasOrganizationChanged);
    }
    if (modalType === 'editSpace') {
      const hasSpaceChanged = !_.isEqual(spaceData, modalData);
      updateSpaceMutation.mutate(hasSpaceChanged);
    }
    handleClose();
  };

  useEffect(() => {
    handleModalTabs(
      tabNames as unknown as (
        | OrganizationModalTabNameType
        | SpaceModalTabNameType
      )[]
    );
  }, [handleModalTabs, tabNames]);

  return (
    <OrgSpaceModalParent
      modalType={modalType}
      modalTabs={modalTabs}
      show={show}
      validated={validated}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      activeKey={activeKey}
      setActiveKey={setActiveKey}
      nextButton={nextButton}
    />
  );
}

export default ManageOrgaSpaceModal;
