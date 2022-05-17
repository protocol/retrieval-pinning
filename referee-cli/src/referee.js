const argv = require('minimist')(process.argv.slice(2));
const cwd = process.cwd()
const homedir = require('os').homedir()
const PldrNode = require('../../shared/pldr')
const commands = require('./libs/fn')
const debug = argv.debug !== undefined ? argv.debug : false
const name = argv.name !== undefined ? argv.name : "pldr-referee"
const port = argv.port !== undefined ? argv.port : 7000
const daemon = argv.daemon !== undefined ? true : false
// Print initial conditions if debug is active
if (debug) {
    console.log('--')
    console.log('DEBUG MODE')
    console.log('--')
    console.log('Working dir is:', cwd)
    console.log('Homedir is:', homedir)
    console.log('Referee name is:', name)
}
// Init node folder and configs
const node = new PldrNode(name, port, daemon)
if (daemon) {
    console.log('Loaded identity:', node.returnNodeIdentity())
}
// Detect commands
async function main() {
    if (argv._ !== undefined && argv._[0] !== undefined) {
        if (commands[argv._[0]] !== undefined) {
            if (debug) {
                console.log('Running command: ' + argv._.join(' '))
                console.log('--')
            }
            commands[argv._[0]](node, ...argv._)
        } else {
            console.log('Command not recognized')
        }
    } else {
        console.log('No command found')
    }
}
if (!daemon) {
    main()
} else {
    setTimeout(function () {
        commands.daemon(node)
    }, 5000)
}