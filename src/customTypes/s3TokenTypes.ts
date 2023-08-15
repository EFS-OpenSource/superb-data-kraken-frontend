export interface S3JwtTokenData {
  client_id: string;
  username: string;
  password: string;
  grant_type: string;
}

export interface S3JwtTokenResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  token_type: string;
}

export interface S3AccessKeyResult {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiration: string;
}
