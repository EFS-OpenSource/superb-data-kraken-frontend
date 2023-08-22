export interface TabWithoutPath {
  name: string;
  content: JSX.Element;
  id: string;
}

export interface Tab extends TabWithoutPath {
  level: string;
  path: string;
  disabled?: boolean;
  tooltipMessage?: string;
}
