interface CustomHeaderProps {
  className?: string;
  children: JSX.Element[] | JSX.Element;
}

function CustomHeader({ className, children }: CustomHeaderProps) {
  return <header className={className}>{children}</header>;
}

export default CustomHeader;
