const {
    Octokit
} = require("@octokit/rest");
const octokit = new Octokit();

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
octokit.repos
    .listForOrg({
        org: "chendaqae",
        type: "public",
    })
    .then(({
        data
    }) => {
        console.log(data);
        
    });