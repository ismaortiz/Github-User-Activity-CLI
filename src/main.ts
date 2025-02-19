import { argv } from 'node:process';
import {readFileSync} from 'node:fs';

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
};

function printActivity(events: any): void {
    let data: Event[] = events;
    data.forEach(singular_event =>{
        
        switch (singular_event["type"]) {
            case "CommitCommentEvent":
                
                break;

            case "CreateEvent":
                break;

            case "DeleteEvent":
                break;

            case "ForkEvent":
                break;

            case "GollumEvent":
                break;

            case "IssueCommentEvent":
                break;

            case "IssuesEvent":
                break;

            case "MemberEvent":
                break;

            case "PublicEvent":
                break;

            case "PullRequestEvent":
                break;

            case "PullRequestReviewEvent":
                break;

            case "PullRequestReviewCommentEvent":
                break;

            case "PullRequestReviewThreadEvent":
                break;

            case "PushEvent":
                break;

            case "ReleaseEvent":
                break;

            case "SponsorshipEvent":
                break;

            case "WatchEvent":
                break;
            default:
                break;
        }
    })
}
printActivity(readFileSync('C:/Users/Ismael/Projects/myjson.json', 'utf8'))
//main(argv);