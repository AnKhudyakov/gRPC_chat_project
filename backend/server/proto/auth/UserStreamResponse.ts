// Original file: proto/auth.proto

import type { User as _auth_User, User__Output as _auth_User__Output } from '../auth/User';

export interface UserStreamResponse {
  'users'?: (_auth_User)[];
}

export interface UserStreamResponse__Output {
  'users'?: (_auth_User__Output)[];
}
