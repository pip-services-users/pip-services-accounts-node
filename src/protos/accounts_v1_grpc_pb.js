// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var accounts_v1_pb = require('./accounts_v1_pb.js');

function serialize_accounts_v1_AccountIdRequest(arg) {
  if (!(arg instanceof accounts_v1_pb.AccountIdRequest)) {
    throw new Error('Expected argument of type accounts_v1.AccountIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_accounts_v1_AccountIdRequest(buffer_arg) {
  return accounts_v1_pb.AccountIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_accounts_v1_AccountLoginRequest(arg) {
  if (!(arg instanceof accounts_v1_pb.AccountLoginRequest)) {
    throw new Error('Expected argument of type accounts_v1.AccountLoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_accounts_v1_AccountLoginRequest(buffer_arg) {
  return accounts_v1_pb.AccountLoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_accounts_v1_AccountObjectReply(arg) {
  if (!(arg instanceof accounts_v1_pb.AccountObjectReply)) {
    throw new Error('Expected argument of type accounts_v1.AccountObjectReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_accounts_v1_AccountObjectReply(buffer_arg) {
  return accounts_v1_pb.AccountObjectReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_accounts_v1_AccountObjectRequest(arg) {
  if (!(arg instanceof accounts_v1_pb.AccountObjectRequest)) {
    throw new Error('Expected argument of type accounts_v1.AccountObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_accounts_v1_AccountObjectRequest(buffer_arg) {
  return accounts_v1_pb.AccountObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_accounts_v1_AccountPageReply(arg) {
  if (!(arg instanceof accounts_v1_pb.AccountPageReply)) {
    throw new Error('Expected argument of type accounts_v1.AccountPageReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_accounts_v1_AccountPageReply(buffer_arg) {
  return accounts_v1_pb.AccountPageReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_accounts_v1_AccountPageRequest(arg) {
  if (!(arg instanceof accounts_v1_pb.AccountPageRequest)) {
    throw new Error('Expected argument of type accounts_v1.AccountPageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_accounts_v1_AccountPageRequest(buffer_arg) {
  return accounts_v1_pb.AccountPageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The accounts service definition.
var AccountsService = exports.AccountsService = {
  get_accounts: {
    path: '/accounts_v1.Accounts/get_accounts',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountPageRequest,
    responseType: accounts_v1_pb.AccountPageReply,
    requestSerialize: serialize_accounts_v1_AccountPageRequest,
    requestDeserialize: deserialize_accounts_v1_AccountPageRequest,
    responseSerialize: serialize_accounts_v1_AccountPageReply,
    responseDeserialize: deserialize_accounts_v1_AccountPageReply,
  },
  get_account_by_id: {
    path: '/accounts_v1.Accounts/get_account_by_id',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountIdRequest,
    responseType: accounts_v1_pb.AccountObjectReply,
    requestSerialize: serialize_accounts_v1_AccountIdRequest,
    requestDeserialize: deserialize_accounts_v1_AccountIdRequest,
    responseSerialize: serialize_accounts_v1_AccountObjectReply,
    responseDeserialize: deserialize_accounts_v1_AccountObjectReply,
  },
  get_account_by_login: {
    path: '/accounts_v1.Accounts/get_account_by_login',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountLoginRequest,
    responseType: accounts_v1_pb.AccountObjectReply,
    requestSerialize: serialize_accounts_v1_AccountLoginRequest,
    requestDeserialize: deserialize_accounts_v1_AccountLoginRequest,
    responseSerialize: serialize_accounts_v1_AccountObjectReply,
    responseDeserialize: deserialize_accounts_v1_AccountObjectReply,
  },
  get_account_by_id_or_login: {
    path: '/accounts_v1.Accounts/get_account_by_id_or_login',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountLoginRequest,
    responseType: accounts_v1_pb.AccountObjectReply,
    requestSerialize: serialize_accounts_v1_AccountLoginRequest,
    requestDeserialize: deserialize_accounts_v1_AccountLoginRequest,
    responseSerialize: serialize_accounts_v1_AccountObjectReply,
    responseDeserialize: deserialize_accounts_v1_AccountObjectReply,
  },
  create_account: {
    path: '/accounts_v1.Accounts/create_account',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountObjectRequest,
    responseType: accounts_v1_pb.AccountObjectReply,
    requestSerialize: serialize_accounts_v1_AccountObjectRequest,
    requestDeserialize: deserialize_accounts_v1_AccountObjectRequest,
    responseSerialize: serialize_accounts_v1_AccountObjectReply,
    responseDeserialize: deserialize_accounts_v1_AccountObjectReply,
  },
  update_account: {
    path: '/accounts_v1.Accounts/update_account',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountObjectRequest,
    responseType: accounts_v1_pb.AccountObjectReply,
    requestSerialize: serialize_accounts_v1_AccountObjectRequest,
    requestDeserialize: deserialize_accounts_v1_AccountObjectRequest,
    responseSerialize: serialize_accounts_v1_AccountObjectReply,
    responseDeserialize: deserialize_accounts_v1_AccountObjectReply,
  },
  delete_account_by_id: {
    path: '/accounts_v1.Accounts/delete_account_by_id',
    requestStream: false,
    responseStream: false,
    requestType: accounts_v1_pb.AccountIdRequest,
    responseType: accounts_v1_pb.AccountObjectReply,
    requestSerialize: serialize_accounts_v1_AccountIdRequest,
    requestDeserialize: deserialize_accounts_v1_AccountIdRequest,
    responseSerialize: serialize_accounts_v1_AccountObjectReply,
    responseDeserialize: deserialize_accounts_v1_AccountObjectReply,
  },
};

exports.AccountsClient = grpc.makeGenericClientConstructor(AccountsService);
