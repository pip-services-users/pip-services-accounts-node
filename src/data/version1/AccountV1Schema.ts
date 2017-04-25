import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class AccountV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('login', TypeCode.String);
        this.withRequiredProperty('name', TypeCode.String);
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('active', TypeCode.Boolean);
        this.withOptionalProperty('about', TypeCode.String);
        this.withOptionalProperty('timezone', TypeCode.String);
        this.withOptionalProperty('language', TypeCode.String);
        this.withOptionalProperty('theme', TypeCode.String);
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
