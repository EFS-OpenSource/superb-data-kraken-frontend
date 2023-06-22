import { useState, useMemo, createContext } from 'react';
import { useLocation } from 'react-router-dom';

interface ActivePathContextProps {
  activePath: string;
  onChangeActivePath: (path: string) => void;
}

export const ActivePathContext = createContext<ActivePathContextProps>({
  activePath: '/home/*',
  onChangeActivePath: (path: string) => path,
});

export const ActivePathContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(
    location.pathname === '/home/overview' ? '/home/*' : location.pathname,
  );

  const onChangeActivePath = (path: string): void => {
    setActivePath(path);
  };

  const memo = useMemo(
    () => ({ activePath, onChangeActivePath }),
    [activePath],
  );

  return (
    <ActivePathContext.Provider value={memo}>
      {children}
    </ActivePathContext.Provider>
  );
};
