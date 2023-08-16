export interface CreateSASTokenData {
  organization: string;
  space: string;
}
export interface SasTokenResult {
  data: string;
}

export interface CommitData {
  organization: string;
  space: string;
  rootDir: string;
}

export enum UploadResponseState {
  None,
  Success,
  Error,
}

export interface FilesTypeForTable {
  count: number;
  name: string;
  type: string;
  size: string;
  action: JSX.Element;
}
