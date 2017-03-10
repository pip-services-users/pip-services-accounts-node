let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';
import { RestService } from 'pip-services-runtime-node';

import { IUsersBusinessLogic } from '../../logic/IUsersBusinessLogic';

export class UsersRestService extends RestService {       
	/**
	 * Unique descriptor for the UsersRestService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-users", "rest", "1.0"
	);
    
	private _logic: IUsersBusinessLogic;

    constructor() {
        super(UsersRestService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IUsersBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-users", "*", "*")
		);

		super.link(components);		
	}
    
    private getUsers(req, res) {
        this._logic.getUsers(
            req.params.correlation_id,
            new FilterParams(req.params),
            new PagingParams(req.params),
            this.sendResult(req, res)
        );
    }

    private findUser(req, res) {
        this._logic.findUser(
            req.params.correlation_id,
            req.params.userId || req.params.user_id,
            req.params.email,
            this.sendResult(req, res)
        );
    }

    private getUserById(req, res) {
        this._logic.getUserById(
            req.params.correlation_id,
            req.params.userId,
            this.sendResult(req, res)
        );
    }

    private createUser(req, res) {
        this._logic.createUser(
            req.params.correlation_id,
            req.body,
            this.sendCreatedResult(req, res)
        );
    }

    private updateUser(req, res) {
        this._logic.updateUser(
            req.params.correlation_id,
            req.params.userId,
            req.body,
            this.sendResult(req, res)
        );
    }

    private deleteUser(req, res) {
        this._logic.deleteUser(
            req.params.correlation_id,
            req.params.userId,
            this.sendDeletedResult(req, res)
        );
    }    
        
    protected register() {
        this.registerRoute('get', '/users', this.getUsers);
        this.registerRoute('get', '/users/find', this.findUser);
        this.registerRoute('get', '/users/:userId', this.getUserById);
        this.registerRoute('get', '/users/:userId/find', this.findUser);
        this.registerRoute('post', '/users', this.createUser);
        this.registerRoute('put', '/users/:userId', this.updateUser);
        this.registerRoute('delete', '/users/:userId', this.deleteUser);        
    }
}
