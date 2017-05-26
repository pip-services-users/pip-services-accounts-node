import { IStringIdentifiable } from 'pip-services-commons-node';
export declare class AccountV1 implements IStringIdentifiable {
    constructor(id: string, login: string, name: string);
    id: string;
    login: string;
    name: string;
    create_time: Date;
    active: boolean;
    about: string;
    time_zone: string;
    language: string;
    theme: string;
    custom_hdr: any;
    custom_dat: any;
}
