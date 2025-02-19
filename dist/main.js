"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = require("node:process");
function main(params) {
    if (incorrectUsername(params)) {
        return;
    }
    const username = params[2];
    let fetchUserData = new Promise(function (resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            let json_body;
            const response = yield fetch(`https://api.github.com/users/${username}/events`);
            if (!response.ok) {
                reject(console.error(`${response.status} ${response.statusText}`));
                return;
            }
            json_body = yield response.json();
            resolve(json_body);
        });
    }).then(result => printActivity(result), error => console.log(error));
}
function incorrectUsername(cli_params) {
    if (cli_params[2] == undefined) {
        console.log("Missing username");
        return true;
    }
    const username = cli_params[2];
    const regex = /\b-{2,}\b|[^a-zA-Z0-9-]|^-|-$/;
    const is_incorrect = regex.test(username);
    if (is_incorrect || username.length < 3) {
        console.log("\"" + username + "\"" + " is not a valid username\nUsername may only contain single hyphens and/or alphanumeric characters " +
            "and it can't begin or end with a hyphen\n");
        return true;
    }
    return false;
}
function printActivity(events) {
    const eve = events;
    const capFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);
    let sentence;
    eve.forEach(event => {
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
    });
}
main(node_process_1.argv);
