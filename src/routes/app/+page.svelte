<script>
    import { user } from '$lib/user';
    import { db } from '$lib/databases';
    import { github } from '$lib/github';
	import { onMount } from 'svelte';
    import { images } from '$lib/storage';
    import html2canvas from 'html2canvas';
    import crystalball from '$lib/assets/crystalball.png';

    let fortune = '';
    let loadingMessage = 'Fetching GitHub data...';
    let githubLoading = true;
    let fortuneLoading = '';
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
        fortuneLoading = 'loading';
        const fortuneRequest = await fetch('/app/fortune', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				githubData
			})
		})
        fortuneLoading = 'complete';
        let fortuneRequestBody = await fortuneRequest.json();
        if(fortuneRequest.status == 200){
            fortune += `${fortuneRequestBody.fortune}`;
        } else {
            fortune += `Error occured:\n\n${fortuneRequestBody.error}`;
        }
    }

    function resetFortune() {
        fortune = '';
        fortuneLoading = '';
    }

    function saveImage() {
        html2canvas(document.querySelector('.fortuneMessage')).then(canvas => {
            let link = document.createElement('a');
            link.download = 'fortune.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    function shareTwitter() {
        html2canvas(document.querySelector('.fortuneMessage')).then(async (canvas) => {
            let tweet = encodeURI("Just got my future from the AI Crystal Ball!\n\nTry it out: https://aicrystalball.oberai.dev\n\nBuilt with @appwrite x @sveltejs x @OpenAI\n\nView my destiny:\n")
            let image = await images.upload($user.$id, canvas.toDataURL('image/png'));
            console.log(image)
            let url = images.view(image.$id); console.log(url)
            window.open(`https://twitter.com/intent/tweet?text=${tweet}&url=${encodeURI(url)}`, '_blank');
        });
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
        <div class="crystalball">
            {#if fortuneLoading === ''}
                <img src={crystalball} alt="Crystal Ball">
                <button class="ballbutton" on:click={getFortune}>Reveal your destiny!</button>
            {:else if fortuneLoading === 'loading'}
                <img class="ballglow" src={crystalball} alt="Crystal Ball">
                <button class="ballbutton glow" on:click={getFortune}>Reading your future...</button>                
            {:else if fortuneLoading === 'complete'}
                <div class="fortune">
                    <div class="fortuneMessage">
                        <h1>Five Years from Today</h1>
                        <div class="fortuneMessageBox">
                            <p>{fortune}</p>
                        </div>
                    </div>
                    <div class="fortuneButtons">
                        <button class="saveButton" on:click={saveImage}>Save Image</button>
                        <button class="twitterButton" on:click={shareTwitter}>Share on Twitter</button>
                        <button class="resetButton" on:click={resetFortune}>Want a new fortune?</button>
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
        align-items: center;
        padding: 2rem;
        gap: 1rem;
    }

    .crystalballContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        gap: 1rem;
        height: 100vh;
    }

    .crystalball {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 80%;
        height: 80%;
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

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s infinite linear;
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
            box-shadow: 0 0 3rem rgba(192, 192, 192, 0.8);
        }
    }

    .ballglow {
        animation: ballglow 2s infinite;
    }

    .fortune {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 2rem;
    }

    .fortuneButtons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }

    .fortuneMessage {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 2rem 1rem;
        border: 1px solid var(--color-tertiary-black);
        width: 80%;
        height: auto;
        background-color: var(--color-secondary-gold);
        border-radius: 1rem;
    }

    .fortuneMessage h1 {
        margin: 0;
    }

    .fortuneMessageBox {
        display: flex;
        text-align: center;
        margin: 0 auto;
        border: 1px solid var(--color-tertiary-black);
        width: 90%;
        height: auto;
        background-color: #ffffff;
        border-radius: 3.125rem;
        font-size: 1.2rem;
    }

    .fortuneMessageBox p {
        width: 80%;
        color: var(--color-tertiary-black);
        margin: 1rem auto;
    }
</style>