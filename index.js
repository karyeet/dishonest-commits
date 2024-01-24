// Octokit.js
// https://github.com/octokit/core.js#readme
const {Octokit} = require('octokit')
const octokit = new Octokit({
    auth: require('./config.json').token
})

async function main() {
    const response = await octokit.request('GET /repos/{owner}/{repo}/events', {
        owner: 'karyeet',
        repo: 'dishonest-commits',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    console.log(response.data);
    const pushDates = response.data
        .filter(event => event.type === 'PushEvent')
        .map(event => Date(event.created_at).toLocaleString('en-US',{
            timeZone: 'America/Los_Angeles'
        }));

    console.log(pushDates);
};

main();