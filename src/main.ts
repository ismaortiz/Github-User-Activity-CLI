import { argv } from 'node:process';

function main(params: string[]): void{
    if (incorrectUsername(params)) {
        return;
    }
    const username = params[2];
    let fetchUserData = new Promise(async function(resolve, reject) {
        let json_body: object[];
            const response = await fetch(`https://api.github.com/users/${username}/events`);
            if (!response.ok) {
              reject(console.error(`${response.status} ${response.statusText}`));
              return;
            }
            json_body = await response.json();
            resolve(json_body);
    }).then(
        result => printActivity(result),
        error => console.log(error)
    );
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
        console.log("\"" + username + "\"" + " is not a valid username\nUsername may only contain single hyphens and/or alphanumeric characters " +
            "and it can't begin or end with a hyphen\n");
        return true;
    }
    return false;
}

type Event = {
    id: string,
    type: string,
    repo: {
        id: number,
        name: string,
        url: string
    },
    created_at: string
    payload: {
        action: string
        ref: string,
        ref_type: string
    }
};

function printActivity(events: any): void{
    const eve: Event[] = events;
    const capFirst = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
    let sentence: string;
    eve.forEach(event =>{
        switch (event.type) {
            case "CommitCommentEvent":
                sentence = `Commented in a commit at ${event.repo.name}`;
                break;

            case "CreateEvent":
                sentence = `Created a new ${event.payload.ref_type} at ${event.repo.name}`;
                break;

            case "DeleteEvent":
                sentence = `Deleted a ${event.payload.ref_type} at ${event.repo.name}`;
                break;

            case "ForkEvent":
                sentence = `Forked the respository: ${event.repo.name} `;
                break;

            case "IssueCommentEvent":
                // sentence = `"${capFirst(event.payload.action)}" `;
                break;

            case "IssuesEvent":
                sentence = `${capFirst(event.payload.action)} an issue at ${event.repo.name}`;
                break;


            case "PullRequestEvent":
                sentence = `${capFirst(event.payload.action)} a pull request at ${event.repo.name}`;
                break;

            case "PushEvent":
                sentence = `Pushed a commit to ${event.repo.name}`;
                break;

            case "ReleaseEvent":
                break;

            case "WatchEvent":
                sentence = `Starred ${event.repo.name}`;
                break;
        }
        console.log(sentence);
    })
}
main(argv);