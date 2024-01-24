// Octokit.js
// https://github.com/octokit/core.js#readme
const {Octokit} = require("octokit")
const octokit = new Octokit({
    auth: require("./config.json").token
})

async function main() {
    const response = await octokit.request('GET /repos/{owner}/{repo}/events', {
        owner: 'karyeet',
        repo: 'dishonest-commits',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    const pushDates = response.data
        .filter(event => event.type === "PushEvent")
        .map(event => event.created_at);

    console.log(pushDates);
};

main();