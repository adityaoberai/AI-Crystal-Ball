<script>
    import { user } from '$lib/user';
    import { github } from '$lib/github';

    async function getTopFiveLanguages(username, token) {
        let languageUsage = {};
        
        const repositories = await github.getRepos(username, token);

        for (let repo of repositories) {
            const languages = await github.getLanguages(username, repo.name, token);

            for (let [language, bytesCount] of Object.entries(languages)) {
                if (language in languageUsage) {
                    languageUsage[language] += bytesCount;
                } else {
                    languageUsage[language] = bytesCount;
                }
            }
        }
        return Object.entries(languageUsage).sort((a, b) => b[1] - a[1]).slice(0, 5);
    }

    async function getAccount() {
        const session = await user.getSession();
        const githubToken = session.providerAccessToken;

        const githubUser = await github.getUser(githubToken);
        console.log(githubUser);

        const githubUsername = githubUser.login;

        let languages = await getTopFiveLanguages(githubUsername, githubToken);
        console.log(languages);
    }
</script>

<h1>App</h1>

<button on:click={getAccount}>Check</button>