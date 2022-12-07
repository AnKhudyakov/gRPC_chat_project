// Original file: proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from '../auth/LoginRequest';
import type { MessageRequest as _auth_MessageRequest, MessageRequest__Output as _auth_MessageRequest__Output } from '../auth/MessageRequest';
import type { RegisterRequest as _auth_RegisterRequest, RegisterRequest__Output as _auth_RegisterRequest__Output } from '../auth/RegisterRequest';
import type { RegisterResponse as _auth_RegisterResponse, RegisterResponse__Output as _auth_RegisterResponse__Output } from '../auth/RegisterResponse';
import type { StreamMessage as _auth_StreamMessage, StreamMessage__Output as _auth_StreamMessage__Output } from '../auth/StreamMessage';
import type { StreamRequest as _auth_StreamRequest, StreamRequest__Output as _auth_StreamRequest__Output } from '../auth/StreamRequest';
import type { TokenResponse as _auth_TokenResponse, TokenResponse__Output as _auth_TokenResponse__Output } from '../auth/TokenResponse';
import type { UserStreamResponse as _auth_UserStreamResponse, UserStreamResponse__Output as _auth_UserStreamResponse__Output } from '../auth/UserStreamResponse';

export interface AuthServiceClient extends grpc.Client {
  ChatStream(argument: _auth_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_StreamMessage__Output>;
  ChatStream(argument: _auth_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_StreamMessage__Output>;
  chatStream(argument: _auth_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_StreamMessage__Output>;
  chatStream(argument: _auth_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_StreamMessage__Output>;
  
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_TokenResponse__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _auth_RegisterRequest, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _auth_RegisterRequest, callback: grpc.requestCallback<_auth_RegisterResponse__Output>): grpc.ClientUnaryCall;
  
  SendMessage(argument: _auth_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _auth_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _auth_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _auth_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _auth_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _auth_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _auth_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _auth_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  UserStream(argument: _auth_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_UserStreamResponse__Output>;
  UserStream(argument: _auth_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_UserStreamResponse__Output>;
  userStream(argument: _auth_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_UserStreamResponse__Output>;
  userStream(argument: _auth_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_auth_UserStreamResponse__Output>;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatStream: grpc.handleServerStreamingCall<_auth_StreamRequest__Output, _auth_StreamMessage>;
  
  Login: grpc.handleUnaryCall<_auth_LoginRequest__Output, _auth_TokenResponse>;
  
  Register: grpc.handleUnaryCall<_auth_RegisterRequest__Output, _auth_RegisterResponse>;
  
  SendMessage: grpc.handleUnaryCall<_auth_MessageRequest__Output, _google_protobuf_Empty>;
  
  UserStream: grpc.handleServerStreamingCall<_auth_StreamRequest__Output, _auth_UserStreamResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  ChatStream: MethodDefinition<_auth_StreamRequest, _auth_StreamMessage, _auth_StreamRequest__Output, _auth_StreamMessage__Output>
  Login: MethodDefinition<_auth_LoginRequest, _auth_TokenResponse, _auth_LoginRequest__Output, _auth_TokenResponse__Output>
  Register: MethodDefinition<_auth_RegisterRequest, _auth_RegisterResponse, _auth_RegisterRequest__Output, _auth_RegisterResponse__Output>
  SendMessage: MethodDefinition<_auth_MessageRequest, _google_protobuf_Empty, _auth_MessageRequest__Output, _google_protobuf_Empty__Output>
  UserStream: MethodDefinition<_auth_StreamRequest, _auth_UserStreamResponse, _auth_StreamRequest__Output, _auth_UserStreamResponse__Output>
}
