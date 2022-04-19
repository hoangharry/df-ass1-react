export const sortPopular = (a, b) => {
    const resA = Math.floor(a.stargazers_count/6) + a.forks_count;
    const resB = Math.floor(b.stargazers_count/6) + b.forks_count;
    return resB - resA;
}