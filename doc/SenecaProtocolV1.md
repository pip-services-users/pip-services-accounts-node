# Seneca Protocol (version 1) <br/> User Accounts Microservice

User accounts microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        localhost: 'localhost', // Microservice localhost
        port: 8809, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'accounts',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [AccountV1 class](#class1)
* [DataPage<AccountV1> class](#class2)
* [cmd: 'get_accounts'](#operation1)
* [cmd: 'get_account_by_id'](#operation2)
* [cmd: 'get_account_by_login'](#operation3)
* [cmd: 'get_account_by_id_or_login'](#operation4)
* [cmd: 'create_account'](#operation5)
* [cmd: 'rename_account'](#operation6)
* [cmd: 'update_account'](#operation7)
* [cmd: 'delete_account'](#operation8)

## Data types

### <a name="class1"></a> AccountV1 class

Represents a account account with his ID, name, email, password and key settings.
It also tracks signup/signin dates and authentication attempts. 

**Properties:**
- id: string - unique account id
- name: string - full account name (first and last name)
- login: string - user login or primary email if controller is configured so
- create_time: Date - date and time when account account was created
- active: boolean - true if account account is active, and false for disabled accounts
- time_zone: int - account selected timezone
- language: string - account selected language (and culture)
- theme: string - account selected application color theme
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

### <a name="class2"></a> DataPage<AccountV1> class

Represents a paged result with subset of requested Account objects

**Properties:**
- data: [AccountV1] - array of retrieved Account page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_accounts'

Retrieves a list of accounts by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - search: string - (optional) search substring to find in source, type or message
  - id: string - (optional) account id
  - login: string - (optional) user login
  - name: stromg - (optional) user name
  - from\_create\_time: Date - (optional) start of the time range
  - to\_create\_time: Date - (optional) end of the time range
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0)
  - take: int - (optional) page length (default: 100)
  - total: boolean - (optional) include total counter into paged result (default: false)

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<AccountV1> - retrieved Account objects in plain array or page format

### <a name="operation2"></a> Cmd: 'get\_account\_by_id'

Get a account by its unique id

**Arguments:** 
- account_id: string - (optional) unique account id

**Returns:**
- err: Error - occured error or null for success
- result: AccountV1 - Account account or null if account wasn't found

### <a name="operation3"></a> Cmd: 'get\_account\_by_login'

Retrieves account by user login

**Arguments:** 
- login: string - user login

**Returns:**
- err: Error - occured error or null for success
- result: AccountV1 - retrieved Account account

### <a name="operation4"></a> Cmd: 'get\_account\_by\_or\_login'

Retrieves account by unique id or user login

**Arguments:** 
- idOrLogin: string - account id or user login

**Returns:**
- err: Error - occured error or null for success
- result: AccountV1 - retrieved Account account

### <a name="operation5"></a> Cmd: 'create_account'

Creates a new account in the system.

**Arguments:** 
- account: AccountV1 - user accunt

**Returns:**
- err: Error - occured error or null for success
- result: AccountV1 - created Account account

### <a name="operation6"></a> Cmd: 'update_account'

Changes account account settings such as time_zone, language, theme.

**Arguments:** 
- account: AccountV1 - account account with new settings (partial updates are supported)

**Returns:**
- err: Error - occured error or null for success
- result: AccountV1 - updated Account account

### <a name="operation7"></a> Cmd: 'delete\_account\_by_id'

Deletes account account from the system (use it carefully!)

**Arguments:** 
- account_id: string - unique account id

**Returns:**
- err: Error - occured error or null for success
