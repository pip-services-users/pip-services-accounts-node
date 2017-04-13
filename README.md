# User Accounts Microservice

This is a user account management microservice from Pip.Services library. 
* Registers users and creates their accounts
* Keeps key user descriptions and settings (about, location, language, theme, ...)

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has optional dependencies on the following microservices:
- [pip-services-activities-node](https://github.com/pip-services-users/pip-services-activities-node) - to log user activities (signup, signin, change settings)

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-users/pip-clients-accounts-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-users/pip-services-accounts-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yaml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-accounts"
  description: "User accounts microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-accounts:persistence:file:default:1.0"
  path: "./data/accounts.json"

- descriptor: "pip-services-accounts:controller:default:default:1.0"

- descriptor: "pip-services-accounts:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-accounts-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-accounts-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.UsersHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Register a new user
client.createUser(
    null,
    { 
        name: 'Test User',
        email: 'somebody@somewhere.com'
    },
    function (err, user) {
        ...
    }
);
```

```javascript
// Get the user account
client.getUserByEmail(
    null,
    'somebody@somewhere.com',
    function(err, user) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.
