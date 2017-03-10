import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IBusinessLogic } from 'pip-services-runtime-node';

export interface IUsersBusinessLogic extends IBusinessLogic {
    getUsers(correlationId: string, filter: FilterParams, paging: PagingParams, callback): void;
    findUser(correlationId: string, userId: string, email: string, callback): void;
    getUserById(correlationId: string, userId: string, callback): void;
    createUser(correlationId: string, user: any, callback): void;
    renameUser(correlationId: string, userId: string, newEmail: string, newName: string, callback): void;
    updateUser(correlationId: string, userId: string, user: any, callback: any): void;
    deleteUser(correlationId: string, userId: string, callback: any): void;
}
