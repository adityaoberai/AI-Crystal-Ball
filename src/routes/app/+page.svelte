<script>
    import { user } from '$lib/user';
    import { db } from '$lib/databases';
    import { github } from '$lib/github';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import html2canvas from 'html2canvas';
    import crystalball from '$lib/assets/crystalball.png';

    let destiny = '';
    let loadingMessage = 'Fetching GitHub data...';
    let githubLoading = true;
    let destinyLoading = '';
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

    async function getDestiny() {
        destinyLoading = 'loading';
        document.getElementById("ballClick").disabled = true;
        const destinyRequest = await fetch('/api/destiny', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userData
			})
		})
        destinyLoading = 'complete';
        let destinyRequestBody = await destinyRequest.json();
        if(destinyRequest.status == 200){
            destiny += `${destinyRequestBody.destiny}`;
        } else {
            destiny += `Error occured:\n\n${destinyRequestBody.error}`;
        }
    }

    function resetDestiny() {
        destiny = '';
        destinyLoading = '';
        document.getElementById("ballClick").disabled = false;
    }

    function saveImage() {
        html2canvas(document.querySelector('.destinyMessage')).then(canvas => {
            let link = document.createElement('a');
            link.download = 'destiny.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    async function shareTwitter() {
        let destinyToSave = await db.addDestiny(userData.username, destiny);
        let url = `https://aicrystalball.oberai.dev/destiny/${destinyToSave.$id}`;
        let tweet = encodeURI(`Just discovered my developer destiny from the AI Crystal Ball! 🤩\n\n🔗 Check it out: ${url}\n\nBuilt with @appwrite X @openai 🧑‍💻`);
        window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
    }

    async function getLink() {
        let destinyToSave = await db.addDestiny(userData.username, destiny);
        let url = `https://aicrystalball.oberai.dev/destiny/${destinyToSave.$id}`;
        window.open(url, '_blank');        
    }

    async function initCrystalBall(userId) {
        userData = await db.getUserData(userId);
        if(userData === false){
            const session = await user.getSession();
            const githubToken = session.providerAccessToken;
            
            const githubUser = await github.getUser(githubToken);
            const githubUsername = githubUser.login;
            loadingMessage = `Received user data ${githubUsername} from GitHub`;

            let languages = await getTopFiveLanguages(githubUsername, githubToken);
            userData = await db.addUserData($user.$id, githubUsername, githubUser.followers, githubUser.following, languages);
        }
        githubLoading = false;
    }

    onMount(async () => {
        let loggedIn = await user.init();
        console.log($user);
        if(!loggedIn) {
            goto('/');
        }
        let userId = $user.$id;
        await initCrystalBall(userId);
    })
</script>

{#if githubLoading}
    <div class="mainContainer">
        <div class="loadingContainer">
            <h1>Loading your Profile</h1>
            <div class="loadingContainerBox">
                <img class="ballglow" src={crystalball} alt="Crystal Ball">
                <p>{loadingMessage}</p>
            </div>
        </div>
    </div>
{:else}
    <div class="crystalballContainer mainContainer">
        <div class="crystalball">
            {#if destinyLoading === ''}
                <img src={crystalball} alt="Crystal Ball">
                <button id="ballClick" class="ballbutton" on:click={getDestiny}>Tap here and reveal your destiny!</button>
            {:else if destinyLoading === 'loading'}
                <img class="ballglow" src={crystalball} alt="Crystal Ball">
                <button class="ballbutton glow" on:click={getDestiny}>Reading your future...</button>                
            {:else if destinyLoading === 'complete'}
                <div class="destiny">
                    <div class="destinyMessage">
                        <h1>Five Years from Today</h1>
                        <div class="destinyMessageBox">
                            <p>{destiny}</p>
                        </div>
                    </div>
                    <div class="destinyButtons">
                        <button class="saveButton" on:click={saveImage}>Save Image</button>
                        <button class="copyButton" on:click={getLink}>Get Link to Destiny</button>
                        <button class="twitterButton" on:click={shareTwitter}>Share on Twitter</button>
                        <button class="resetButton" on:click={resetDestiny}>Want a new destiny?</button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
{/if}

<style>
    p {
        white-space: pre-line;
    }

    .loadingContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 1rem;
        padding: 2rem 1rem;
        border: 1px solid var(--color-tertiary-black);
        background-color: var(--color-secondary-gold);
        border-radius: 1rem;
    }

    .loadingContainer h1 {
        margin: 0;
        padding: 0 1rem;
    }

    .loadingContainerBox {
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        padding: 0 1rem;
        border: 1px solid var(--color-tertiary-black);
        height: auto;
        background-color: var(--color-utility-light);
        border-radius: 2rem;
        gap: 1rem;
    }

    @keyframes loadingball {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
    }

    .loadingContainerBox img {
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        animation: loadingball 2s linear infinite;
    }

    .loadingContainerBox p {
        color: var(--color-tertiary-black);
        margin: 1rem auto;
        font-size: 1.5rem;
    }

    .crystalball {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 80%;
        margin: auto;
    }

    .crystalball img {
        border-radius: 50%;
        max-width: 80%;
        width: auto;
        max-height: 50%;
        height: auto;
    }

    .ballbutton {
        padding: 1.8rem 2rem;
        font-size: 1.5rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        font-weight: bolder;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes ballglow {
        0%, 100% {
            box-shadow: 0 0 1rem rgba(192, 192, 192, 0.5);
        }
        50% {
            box-shadow: 0 0 3rem rgba(192, 192, 192, 0.9);
        }
    }

    .ballglow {
        animation: ballglow 2s infinite;
    }

    @media (max-width: 768px) {
        .loadingContainer{
            max-width: 80%;
            width: auto;
            margin: 0 auto;
        }

        .crystalball img {
            border-radius: 50%;
            max-width: 90%;
            width: auto;
            max-height: 70%;
            height: auto;
        }

        .ballbutton {
            padding: 1.5rem;
            font-size: 1rem;
            max-width: 80%;
            font-weight: bolder;
        }
    }
</style>