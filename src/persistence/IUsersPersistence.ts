import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { IPersistence } from 'pip-services-runtime-node';

export interface IUsersPersistence extends IPersistence {
    getUsers(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getUserById(correlationId: string, userId: string, callback: any): void;
    getUserByEmail(correlationId: string, email: string, callback: any): void;
    getUserByIdOrEmail(correlationId: string, userId: string, emailId: string, callback: any): void;
    createUser(correlationId: string, user: any, callback: any): void;
    updateUser(correlationId: string, userId: string, user: any, callback: any): void;
    deleteUser(correlationId: string, userId: string, callback: any): void;
}
