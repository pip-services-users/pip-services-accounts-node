"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class AccountV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('login', pip_services_commons_node_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('active', pip_services_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('timezone', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('theme', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.AccountV1Schema = AccountV1Schema;
//# sourceMappingURL=AccountV1Schema.js.map