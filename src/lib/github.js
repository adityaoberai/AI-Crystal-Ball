export const github = {
    getUser: async (token) => {
        const url = 'https://api.github.com/user';
        var response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return await response.json();
    },

    getRepos: async (username, token) => {
        const url = `https://api.github.com/users/${username}/repos?sort=created&direction=desc`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return await response.json();
    },

    getLanguages: async (username, repo, token) => {
        const url = `https://api.github.com/repos/${username}/${repo}/languages`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return await response.json();
    }
}