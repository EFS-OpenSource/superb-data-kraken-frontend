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
  setOrganizationRoleByEmail,
  setSpaceRoleByEmail,
} from '@services/index';
import {
  Confidentiality,
  Space,
  SpaceState,
  UserSpaceRoleType,
  OrganizationModalTabNameType,
  SpaceModalTabNameType,
  ModalTypes,
  MapType,
  TabData,
  TabWithoutPath,
  OrgaSpaceUser,
  Organization,
  UserOrgaRoleType,
  Owner,
  ModalTabNameType,
} from '@customTypes/index';
import { OrgSpaceModalParent } from '@views/index';

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
  users?: OrgaSpaceUser<UserSpaceRoleType | UserOrgaRoleType>[];
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
    intialModalData,
  );

  const initialOwners = owners.map((owner) => owner.id);

  const [updatedOwners, setUpdatedOwners] = useState<string[]>(
    owners.map((owner) => owner.id),
  );

  interface User {
    email: string;
    permissions: ('user' | 'trustee' | 'supplier' | 'access' | 'admin')[];
    id: string;
  }

  const initialUsers = users
    ? users?.map((user) => ({
        email: user.email,
        permissions: user.permissions,
        id: user.id,
      }))
    : undefined;

  const [updatedUsers, setUpdatedUsers] = useState<
    Record<string, any> | undefined
  >(
    users
      ? users?.map((user) => ({
          email: user.email,
          permissions: user.permissions,
          id: user.id,
        }))
      : undefined,
  );

  // HANDLE MODAL ENDPOINTS FUNCTIONALITY AND TOAST FEEDBACKS

  const haveOwnersChanged = (initial: string[], updated: string[]): boolean =>
    JSON.stringify(initial.sort()) !== JSON.stringify(updated.sort());

  const stringifyUsers = (
    usersToStringify: Record<string, any> | undefined,
  ) => {
    if (usersToStringify === undefined) return undefined;

    const usersWithEmail = Array.isArray(usersToStringify)
      ? usersToStringify.filter((user) => user.email != null)
      : [];

    const sortedUsers = usersWithEmail
      .map(({ email, permissions }) => ({ email, permissions }))
      .sort((a: { email: string }, b: { email: string }) =>
        a.email.localeCompare(b.email),
      );

    return JSON.stringify(sortedUsers);
  };

  const haveUsersChanged = (
    initial: Record<string, any> | undefined,
    updated: Record<string, any> | undefined,
  ): boolean => stringifyUsers(initial) !== stringifyUsers(updated);

  const [activeKey, setActiveKey] = useState(tabNames[0]);

  const updateOrganizationUsersMutation = useMutation(() =>
    updatedUsers
      ?.filter((updatedUser: { email: string; permissions: any }) => {
        const initialUser = initialUsers?.find(
          (user: { email: string }) => user.email === updatedUser.email,
        );
        return (
          !initialUser ||
          JSON.stringify(initialUser.permissions) !==
            JSON.stringify(updatedUser.permissions)
        );
      })
      .map((updatedUser: Record<string, any>) =>
        setOrganizationRoleByEmail(
          orgID as string,
          updatedUser.email,
          updatedUser.permissions,
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
              response.data.errorCode,
            );
          }
        }),
      ),
  );

  const updateOrganizationOwnersMutation = useMutation(
    (newOwners?: string[]) =>
      setOrganizationOwnersByUserId(
        newOwners || updatedOwners,
        orgID as string,
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
    },
  );

  const updateSpaceUsersMutation = useMutation((currentSpaceID: string) =>
    updatedUsers
      ?.filter((updatedUser: { email: string; permissions: any }) => {
        const initialUser = initialUsers?.find(
          (user: { email: string }) => user.email === updatedUser.email,
        );
        return (
          !initialUser ||
          JSON.stringify(initialUser.permissions) !==
            JSON.stringify(updatedUser.permissions)
        );
      })
      .map((updatedUser: Record<string, any>) =>
        setSpaceRoleByEmail(
          orgID as string,
          currentSpaceID,
          updatedUser.email,
          updatedUser.permissions,
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
              response.data.errorCode,
            );
          }
        }),
      ),
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
        newOwners || updatedOwners,
        orgID as string,
        currentSpaceID,
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
    },
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
    },
  );

  const removeOwnerWithUser = (updated: Record<string, any> | undefined) => {
    if (updated) {
      const removedUsers = updated.filter(
        (updatedUser: User) => updatedUser.permissions.length === 0,
      );

      if (removedUsers) {
        let newOwners = updatedOwners;
        removedUsers.forEach((removedUser: User) => {
          if (updatedOwners.includes(removedUser.id)) {
            newOwners = updatedOwners.filter((id) => id !== removedUser.id);
          }
        });
        if (haveOwnersChanged(updatedOwners, newOwners)) {
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
    () =>
      updateOrganization(modalData as Organization, orgID as string)
        .then((response) => {
          if (!response.ok) throw new Error(response.data.errorCode);
          if (isOwner) {
            if (haveUsersChanged(initialUsers, updatedUsers)) {
              removeOwnerWithUser(updatedUsers);
              updateOrganizationUsersMutation.mutate();
            }
          }
          return response;
        })
        .then((response) => {
          if (!response.ok) throw new Error();
          if (isOwner) {
            if (haveOwnersChanged(initialOwners, updatedOwners)) {
              updateOrganizationOwnersMutation.mutate(updatedOwners);
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
    },
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
    },
  );

  const updateSpaceMutation = useMutation(
    () =>
      updateSpace(modalData as Space, orgID as string, spaceID as string)
        .then((response) => {
          if (!response.ok) throw new Error(response.data.errorCode);
          if (isOwner) {
            if (haveUsersChanged(initialUsers, updatedUsers)) {
              updateSpaceUsersMutation.mutate(spaceID as string);
              removeOwnerWithUser(updatedUsers);
            }
          }
          return response;
        })
        .then((response) => {
          if (!response.ok) throw new Error();
          if (isOwner) {
            if (haveOwnersChanged(initialOwners, updatedOwners))
              updateSpaceOwnersMutation.mutate({
                currentSpaceID: spaceID as string,
              });
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
    },
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
                  className="d-flex flex-column overflow-scroll"
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
    [tabComponents, formatMessage, modalData, users, owners, roles, isOwner],
  );

  let nextButton: JSX.Element;

  switch (activeKey) {
    case tabNames[tabNames.length - 1]:
      nextButton = (
        <Button aria-label="submitButton" type="submit">
          {formatMessage({
            id: 'AddEditOrgSpacesModal.submit-button',
          })}
        </Button>
      );
      break;

    default:
      nextButton = (
        <Button
          aria-label="nextButton"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setActiveKey(tabNames[tabNames.indexOf(activeKey) + 1] as any);
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
    currentTarget: any;
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
      updateOrganizationMutation.mutate();
    }
    if (modalType === 'editSpace') {
      updateSpaceMutation.mutate();
    }
    handleClose();
  };

  useEffect(() => {
    handleModalTabs(
      tabNames as unknown as (
        | OrganizationModalTabNameType
        | SpaceModalTabNameType
      )[],
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
