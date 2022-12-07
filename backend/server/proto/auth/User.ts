// Original file: proto/auth.proto

import type { Status as _auth_Status } from '../auth/Status';

export interface User {
  'id'?: (number);
  'username'?: (string);
  'status'?: (_auth_Status | keyof typeof _auth_Status);
  'accessToken'?: (number);
}

export interface User__Output {
  'id'?: (number);
  'username'?: (string);
  'status'?: (_auth_Status);
  'accessToken'?: (number);
}
