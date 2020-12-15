"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountV1Schema = void 0;
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class AccountV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('login', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('deleted', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('active', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('about', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('time_zone', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('theme', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.AccountV1Schema = AccountV1Schema;
//# sourceMappingURL=AccountV1Schema.js.map