const { Octokit } = require("@octokit/rest");
const octokit = new Octokit
({
    auth: "secret123",
    userAgent: 'myApp v1.2.3',
    previews: ['jean-grey', 'symmetra'],
    timeZone: 'Europe/Amsterdam',
    baseUrl: 'https://api.github.com',

    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    },
    request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0
    }
})
(async() =>  {
    const { data: pullRequest } = await octokit.pulls.get ({
        owner: 'octokit',
        repo: 'rest.js',
        pull_number: 123,
    });
    const { data: diff } = await octokit.pulls.get({
        owner: 'octokit',
        repo: 'rest.js',
        pull_number: 123,
        mediaType: {
            format: 'diff',
        },
    });
    const { data: root } = await octokit.request('GET /');
    await octokit.registerEndpoints({
        misc: {
            getRoot: {
                method: 'GET',
                url: '/'
            },
        },
    });
    octokit.paginate(octokit.issues.listForRepo, {
        owner: 'octokit',
        repo: 'rest.js'
    }).then(issues => {
        // issues is an array of all issue objects
    })

    import {retry} from '@octokit/plugin-retry';
    import {throttling} from '@octokit/plugin-throttling'

    const MyOctokit = Octokit.plugin(retry, throttling);
    const myOctokit = new MyOctokit({
        auth: 'secret123',
        throttling: {
            onRateLimit: (retryAfter, options) => {
                myOctokit.log.warn(
                    `Request quota exhausted for request ${options.method} ${options.url}`
                );
                if (options.request.retryCount === 0) {
                    // only retries once
                    myOctokit.log.info('Retrying after ${retryAfter}  seconds!');
                    return true;
                }
            },
            onAbuseLimit: (retryAfter, options) => {
                // does not retry, only logs a warning
                myOctokit.log.warn (
                    `Abuse detected for request ${options.method} ${options.url}`
                );
            },
        },
        retry: {
            doNotRetry: ['429'],
        },
    });
    const { Octokit } = require('@octokit/rest');
});
