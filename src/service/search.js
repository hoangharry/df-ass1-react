import { Octokit } from "@octokit/core"
export const getReposOrg = async (org) => {
    const octokit = new Octokit();
    const response = await octokit.request("GET /orgs/{org}/repos", {
        org: org,
    });
    return response;
}

export const getReposUser = async (username) => {
    const octokit = new Octokit();
    const response = await octokit.request('GET /users/{username}/repos', {
        username: username
    });
    return response;
}

export const getReposByStars = async (username, page, isOrigin = false) => {
    const octokit = new Octokit();
    let query = 'user:' + username;
    if (!isOrigin) {
        query = query + '+fork:true';
    }
    const response = octokit.request("GET /search/repositories", {
        q: query,
        sort: 'stars',
        order: 'desc',
        page: page,

    });
    return response;
}

// export const getOriginalRepos = async (username, page) => {
//     const octokit = new Octokit();
//     const response = octokit.request("GET /search/repositories", {
//         q: 'user:' + username,
//         sort: 'stars',
//         order: 'desc',
//         page: page,
//     });
//     return response;
// }

export const checkOrgOrUser = async (kw) => {
    const octokit = new Octokit();
    const response = octokit.request("GET /users/{username}", {
        username: kw,
    });
    return response;
}