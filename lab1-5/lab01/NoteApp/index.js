const user = require("./user");
const yargs = require('yargs/yargs');

yargs(process.argv.slice(2))
    .command({
        command: 'list',
        aliases: ['ls'],
        desc: 'Get the list of languages',
        handler: (argv) => {
            console.log(user.list());
        }
    })
    .command({
        command: 'add',
        desc: 'Add new language',
        builder: {
            title: {
                type: 'string',
                demandOption: true,
                describe: 'Language titile'
            },
            level: {
                describe: 'Level of Knowledge',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            user.add({ title: argv.title, level: argv.level });
            console.log({ title: argv.title, level: argv.level });
        }
    })
    .command({
        command: 'read',
        desc: 'Reading a language',
        builder: {
            title: {
                type: 'string',
                demandOption: true,
                describe: 'Language title'
            }
        },
        handler: (argv) => {
            user.read(argv.title);
        }
    })
    .command({
        command: 'remove',
        desc: 'Delete language',
        builder: {
            title: {
                type: 'string',
                demandOption: true,
                describe: 'Remove language'
            }
        },
        handler: (argv) => {
            user.remove(argv.title);
        }
    }).parse()