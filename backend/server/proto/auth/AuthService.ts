// Original file: proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from '../auth/LoginRequest';
import type { RegisterRequest as _auth_RegisterRequest, RegisterRequest__Output as _auth_RegisterRequest__Output } from '../auth/RegisterRequest';
import type { TokenResponse as _auth_TokenResponse, TokenResponse__Output as _auth_TokenResponse__Output } from '../auth/TokenResponse';

export interface AuthServiceClient extends grpc.Client {
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  Login: grpc.handleUnaryCall<_auth_LoginRequest__Output, _auth_TokenResponse>;
  
  Register: grpc.handleUnaryCall<_auth_RegisterRequest__Output, _auth_TokenResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  Login: MethodDefinition<_auth_LoginRequest, _auth_TokenResponse, _auth_LoginRequest__Output, _auth_TokenResponse__Output>
  Register: MethodDefinition<_auth_RegisterRequest, _auth_TokenResponse, _auth_RegisterRequest__Output, _auth_TokenResponse__Output>
}
