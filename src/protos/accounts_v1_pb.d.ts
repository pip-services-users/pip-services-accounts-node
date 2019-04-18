// package: accounts
// file: accounts_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class Account extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getLogin(): string;
  setLogin(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAbout(): string;
  setAbout(value: string): void;

  getCreateTime(): string;
  setCreateTime(value: string): void;

  getDeleted(): boolean;
  setDeleted(value: boolean): void;

  getActive(): boolean;
  setActive(value: boolean): void;

  getTimeZone(): string;
  setTimeZone(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  getTheme(): string;
  setTheme(value: string): void;

  getCustomHdr(): string;
  setCustomHdr(value: string): void;

  getCustomDat(): string;
  setCustomDat(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Account.AsObject;
  static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Account, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Account;
  static deserializeBinaryFromReader(message: Account, reader: jspb.BinaryReader): Account;
}

export namespace Account {
  export type AsObject = {
    id: string,
    login: string,
    name: string,
    about: string,
    createTime: string,
    deleted: boolean,
    active: boolean,
    timeZone: string,
    language: string,
    theme: string,
    customHdr: string,
    customDat: string,
  }
}

export class AccountPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<Account>;
  setDataList(value: Array<Account>): void;
  addData(value?: Account, index?: number): Account;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountPage.AsObject;
  static toObject(includeInstance: boolean, msg: AccountPage): AccountPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountPage;
  static deserializeBinaryFromReader(message: AccountPage, reader: jspb.BinaryReader): AccountPage;
}

export namespace AccountPage {
  export type AsObject = {
    total: number,
    dataList: Array<Account.AsObject>,
  }
}

export class AccountPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountPageRequest): AccountPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountPageRequest;
  static deserializeBinaryFromReader(message: AccountPageRequest, reader: jspb.BinaryReader): AccountPageRequest;
}

export namespace AccountPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class AccountPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): AccountPage | undefined;
  setPage(value?: AccountPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: AccountPageReply): AccountPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountPageReply;
  static deserializeBinaryFromReader(message: AccountPageReply, reader: jspb.BinaryReader): AccountPageReply;
}

export namespace AccountPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: AccountPage.AsObject,
  }
}

export class AccountIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getAccountId(): string;
  setAccountId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountIdRequest): AccountIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountIdRequest;
  static deserializeBinaryFromReader(message: AccountIdRequest, reader: jspb.BinaryReader): AccountIdRequest;
}

export namespace AccountIdRequest {
  export type AsObject = {
    correlationId: string,
    accountId: string,
  }
}

export class AccountLoginRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getLogin(): string;
  setLogin(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountLoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountLoginRequest): AccountLoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountLoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountLoginRequest;
  static deserializeBinaryFromReader(message: AccountLoginRequest, reader: jspb.BinaryReader): AccountLoginRequest;
}

export namespace AccountLoginRequest {
  export type AsObject = {
    correlationId: string,
    login: string,
  }
}

export class AccountObjectRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): Account | undefined;
  setAccount(value?: Account): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountObjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AccountObjectRequest): AccountObjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountObjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountObjectRequest;
  static deserializeBinaryFromReader(message: AccountObjectRequest, reader: jspb.BinaryReader): AccountObjectRequest;
}

export namespace AccountObjectRequest {
  export type AsObject = {
    correlationId: string,
    account?: Account.AsObject,
  }
}

export class AccountObjectReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasAccount(): boolean;
  clearAccount(): void;
  getAccount(): Account | undefined;
  setAccount(value?: Account): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AccountObjectReply.AsObject;
  static toObject(includeInstance: boolean, msg: AccountObjectReply): AccountObjectReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AccountObjectReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AccountObjectReply;
  static deserializeBinaryFromReader(message: AccountObjectReply, reader: jspb.BinaryReader): AccountObjectReply;
}

export namespace AccountObjectReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    account?: Account.AsObject,
  }
}

