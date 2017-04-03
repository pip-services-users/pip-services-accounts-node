import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { LambdaFunction } from 'pip-services-runtime-node';

import { UsersMicroservice } from '../run/UsersMicroservice';
import { IUsersBusinessLogic } from '../logic/IUsersBusinessLogic';

export class UsersLambdaFunction extends LambdaFunction {
    private _logic: IUsersBusinessLogic;

    constructor() {
        super(new UsersMicroservice());
    }

    public link(components: ComponentSet) {
		this._logic = <IUsersBusinessLogic>components.getOneOptional(
			new ComponentDescriptor(Category.BusinessLogic, "pip-services-users", "*", "*")
		);

        super.link(components);        

        this.registerCommands(this._logic.getCommands());
    }
    
}