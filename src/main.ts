//import { request } from 'node:https';
import { argv } from 'node:process';
import { request, Request } from 'undici-types';

function main(params: string[]) {
    if (incorrectUsername(params)) {
        return;
    }
    const username = params[2];
    console.log("llegó");
    // fetch(`https://api.github.com/users/${username}/events`)
    //  .then((response) => {
    //     console
    //  })
}

function incorrectUsername(cli_params: string[]): boolean{
    if (cli_params[2] == undefined) {
        console.log("Missing username");
        return true;
    }
    const username: string = cli_params[2];
    const regex = /\b-{2,}\b|[^a-zA-Z0-9-]|^-|-$/;
    const is_incorrect = regex.test(username);
    if (is_incorrect || username.length < 3) {
        console.log("\"" + username + "\"" + "is not a valida username\nOnly single hyphens and alphanumeric characters" +
            "and cannot begin or end with a hyphen\n");
        return true;
    }
    return false;
}

main(argv);