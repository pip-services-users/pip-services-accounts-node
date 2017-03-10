import { CommandSet } from 'pip-services-runtime-node';
import { ICommand } from 'pip-services-runtime-node';
import { Command } from 'pip-services-runtime-node';
import { Schema } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { FilterParams } from 'pip-services-runtime-node';
import { PagingParams } from 'pip-services-runtime-node';

import { IUsersBusinessLogic } from './IUsersBusinessLogic';

export class UsersCommandSet extends CommandSet {
    private _logic: IUsersBusinessLogic;

    constructor(logic: IUsersBusinessLogic) {
        super();

        this._logic = logic;

        // Register commands to the business logic
		this.addCommand(this.makeGetUsersCommand());
		this.addCommand(this.makeFindUserCommand());
		this.addCommand(this.makeGetUserByIdCommand());
		this.addCommand(this.makeCreateUserCommand());
		this.addCommand(this.makeRenameUserCommand());
		this.addCommand(this.makeUpdateUserCommand());
		this.addCommand(this.makeDeleteUserCommand());
    }

	private makeGetUsersCommand(): ICommand {
		return new Command(
			this._logic,
			"get_users",
			new Schema()
				.withOptionalProperty("filter", "FilterParams")
				.withOptionalProperty("paging", "PagingParams")
			,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getUsers(correlationId, filter, paging, callback);
            }
		);
	}

	private makeFindUserCommand(): ICommand {
		return new Command(
			this._logic,
			"find_user",
			new Schema()
				.withOptionalProperty("user_id", "string")
				.withOptionalProperty("email", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let email = args.getNullableString("email");
                this._logic.findUser(correlationId, userId, email, callback);
            }
		);
	}

	private makeGetUserByIdCommand(): ICommand {
		return new Command(
			this._logic,
			"get_user_by_id",
			new Schema()
				.withProperty("user_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                this._logic.getUserById(correlationId, userId, callback);
            }
		);
	}

	private makeCreateUserCommand(): ICommand {
		return new Command(
			this._logic,
			"create_user",
			new Schema()
				.withProperty("user", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let user = args.get("user");
                this._logic.createUser(correlationId, user, callback);
            }
		);
	}

	private makeRenameUserCommand(): ICommand {
		return new Command(
			this._logic,
			"rename_user",
			new Schema()
				.withProperty("user_id", "string")
				.withOptionalProperty("new_email", "string")
                .withOptionalProperty("new_name", "string")
            ,
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let newEmail = args.get("new_email");
                let newName = args.get("new_name");
                this._logic.renameUser(correlationId, userId, newEmail, newName, callback);
            }
		);
	}

	private makeUpdateUserCommand(): ICommand {
		return new Command(
			this._logic,
			"update_user",
			new Schema()
				.withProperty("user_id", "string")
				.withProperty("user", "any"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                let user = args.get("user");
                this._logic.updateUser(correlationId, userId, user, callback);
            }
		);
	}
	
	private makeDeleteUserCommand(): ICommand {
		return new Command(
			this._logic,
			"delete_user",
			new Schema()
				.withProperty("user_id", "string"),
            (correlationId: string, args: DynamicMap, callback: (err: any, result: any) => void) => {
                let userId = args.getNullableString("user_id");
                this._logic.deleteUser(correlationId, userId, callback);
			}
		);
	}

}