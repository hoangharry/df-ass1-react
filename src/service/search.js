import { Octokit } from "@octokit/core"
export const getReposOrg = async (org) => {
    const octokit = new Octokit();
    // const response = await fetch('https://github.com/orgs/dwarvesf/repositories?sort=stargazers')
    const response = await octokit.request("GET /orgs/{org}/repos", {
        org: org,
        sort: "stars",
    });
    console.log(response);
}

export const getReposUser = async (username) => {
    const octokit = new Octokit();
    const response = await octokit.request('GET /users/{username}/repos', {
        username: username
    });
    console.log(response);
}

export const getReposOrgByStars = async (org) => {
    const octokit = new Octokit();
    const response = octokit.request("GET /search/repositories", {
        q: 'org:' + org,
        sort: 'stars',
        order: 'desc',
    });
    console.log(response);
}

export const getReposUserByStars = async (username) => {
    const octokit = new Octokit();
    const response = octokit.request("GET /search/repositories", {
        q: 'user:' + username,
        sort: 'stars',
        order: 'desc',
    });
    console.log(response);
}