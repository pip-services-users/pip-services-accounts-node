let _ = require('lodash');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { SenecaService } from 'pip-services-runtime-node';

import { IUsersBusinessLogic } from '../../logic/IUsersBusinessLogic';

export class UsersSenecaService extends SenecaService {       
	/**
	 * Unique descriptor for the UsersSenecaService component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Services, "pip-services-users", "seneca", "1.0"
	);

    private _logic: IUsersBusinessLogic;

    constructor() {
        super(UsersSenecaService.Descriptor);
    }
    
	public link(components: ComponentSet): void {
		this._logic = <IUsersBusinessLogic>components.getOnePrior(
			this, new ComponentDescriptor(Category.BusinessLogic, "pip-services-users", "*", "*")
		);

		super.link(components);		

        this.registerCommands('users', this._logic.getCommands());
	}

}
