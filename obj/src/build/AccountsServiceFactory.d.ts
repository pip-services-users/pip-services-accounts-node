import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';
export declare class AccountsServiceFactory extends Factory {
    static Descriptor: Descriptor;
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static CouchbasePersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static HttpServiceDescriptor: Descriptor;
    static GrpcServiceDescriptor: Descriptor;
    static CommandableGrpcServiceDescriptor: Descriptor;
    constructor();
}
