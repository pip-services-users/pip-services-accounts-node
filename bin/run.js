let AccountsProcess = require('../obj/src/container/AccountsProcess').AccountsProcess;

try {
    new AccountsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
