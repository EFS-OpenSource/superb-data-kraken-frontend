import { ReactNode, createContext, useMemo } from 'react';
import { useOidcIdToken } from '@axa-fr/react-oidc';

export const UserInfoContext = createContext({
  oidcUser: { roles: [''], sub: '' },
});

export const UserInfoContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { idTokenPayload } = useOidcIdToken();

  const UserInfoContextValues = useMemo(
    () => ({ idTokenPayload }),
    [idTokenPayload],
  );

  return (
    <UserInfoContext.Provider value={idTokenPayload}>
      {children}
    </UserInfoContext.Provider>
  );
};
