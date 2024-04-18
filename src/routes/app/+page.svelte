<script>
    import { user } from '$lib/user';
    import { db } from '$lib/databases';
    import { github } from '$lib/github';
	import { onMount } from 'svelte';
    import crystalball from '$lib/assets/crystalball.jpg';

    let fortune = '';
    let loadingMessage = 'Fetching GitHub data...';
    let githubLoading = true;
    let fortuneLoading = false;
    let userData = {};

    async function getTopFiveLanguages(username, token) {
        let languageUsage = {};
        
        const repositories = await github.getRepos(username, token);
        loadingMessage = `Checking 30 most-recently created repos...`;
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
        loadingMessage = `Confirmed top 5 used languages...`;
        return Object.entries(languageUsage).sort((a, b) => b[1] - a[1]).slice(0, 5).map(a => a[0]);
    }

    async function getFortune() {
        const githubData=`GitHub username: ${userData.username}\nFollowers: ${userData.followers}\nFollowing: ${userData.following}\nTop 5 languages:\n${userData.languages.join(',')}`;
        fortuneLoading = true;
        const fortuneRequest = await fetch('/app/fortune', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				githubData
			})
		})
        fortuneLoading = false;
        let fortuneRequestBody = await fortuneRequest.json();
        if(fortuneRequest.status == 200){
            fortune += `${fortuneRequestBody.fortune}`;
        } else {
            fortune += `Error occured:\n\n${fortuneRequestBody.error}`;
        }
    }

    function resetFortune() {
        fortune = '';
    }

    function saveImage() {
        alert('This is just a test function');
    }

    function shareTwitter() {
        alert('This is just a test function');
    }

    async function initCrystalBall() {
        userData = await db.get($user.$id);
        if(userData === false){
            const session = await user.getSession();
            const githubToken = session.providerAccessToken;
            
            const githubUser = await github.getUser(githubToken);
            const githubUsername = githubUser.login;
            loadingMessage = `Received user data ${githubUsername} from GitHub`;

            let languages = await getTopFiveLanguages(githubUsername, githubToken);
            userData = await db.add($user.$id, githubUsername, githubUser.followers, githubUser.following, languages);
        }
        githubLoading = false;
    }

    onMount(async () => {
        await user.init();
        await initCrystalBall();
    })
</script>

{#if githubLoading}
    <div class="loadingContainer">
        <div class="spinner"></div>
        <p>{loadingMessage}</p>
    </div>
{:else}
    <div class="crystalballContainer">
        <h1>Crystal Ball</h1>
        <img class="crystalball" src={crystalball} alt="Crystal Ball">
        <button on:click={getFortune}>
            {#if fortuneLoading}
                <div class="spinner"></div>
            {/if}
            Get Fortune
        </button>
        <p>{fortune}</p>
        {#if fortune !== ''}
            <div class="fortuneButtons">
                <button class="saveButton" on:click={saveImage}>Save Image</button>
                <button class="twitterButton" on:click={shareTwitter}>Share on Twitter</button>
                <button class="resetButton" on:click={resetFortune}>Want a new fortune?</button>
            </div>
        {/if}
    </div>
{/if}

<style>
    p {
        white-space: pre-line;
    }

    .loadingContainer {
        display: flex;
        align-items: center;
        padding: 2rem;
        gap: 1rem;
    }

    .crystalballContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        gap: 1rem;
    }

    .crystalball {
        max-width: 30vw;
        max-height: 30vh;
    }

    button {
        padding: 0.5rem 1rem;
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s infinite linear;
    }

    .fortuneButtons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>