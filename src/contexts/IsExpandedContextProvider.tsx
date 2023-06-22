import React, { ReactNode, useMemo } from 'react';

interface IsExpandedContextProps {
  isExpanded: boolean;
  updateIsExpanded: (isExpanded: boolean) => void;
}

export const IsExpandedContext = React.createContext<IsExpandedContextProps>(
  {} as any,
);

export const IsExpandedContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const updateIsExpanded = (newIsExpanded: boolean): void => {
    setIsExpanded(newIsExpanded);
  };

  const IsExpandedContextValues = useMemo(
    () => ({ isExpanded, updateIsExpanded }),
    [isExpanded],
  );

  return (
    <IsExpandedContext.Provider value={IsExpandedContextValues}>
      {children}
    </IsExpandedContext.Provider>
  );
};
