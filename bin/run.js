let AccountsProcess = require('../obj/src/container/AccountsProcess').AccountsProcess;

try {
    new AccountsProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
