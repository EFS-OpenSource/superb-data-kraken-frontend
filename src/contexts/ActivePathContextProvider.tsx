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

export function ActivePathContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const location = useLocation();
  const [activePath, setActivePath] = useState(
    location.pathname === '/home/overview' || location.pathname === '/'
      ? '/home/*'
      : location.pathname
  );

  const onChangeActivePath = (path: string): void => {
    setActivePath(path);
  };

  const memo = useMemo(
    () => ({ activePath, onChangeActivePath }),
    [activePath]
  );

  return (
    <ActivePathContext.Provider value={memo}>
      {children}
    </ActivePathContext.Provider>
  );
}
