<script>
    import { user } from '$lib/user';
    import { goto } from '$app/navigation';
    import Night from '../components/Night.svelte';
    import crystalBall from '$lib/assets/crystalball.png';

    export let data;

    function login() {
        user.login();
    }

    function moveForward() {
        goto('/app')
    }
</script>

<svelte:head>
    <title>AI Crystal Ball</title>
    <meta name="description" content="Find you developer destiny!">
    <meta name="og:image" content="https://aicrystalball.oberai.dev/api/og">
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@adityaoberai1" />
    <meta property="twitter:image" content="https://aicrystalball.oberai.dev/og" />
</svelte:head>

<div class="mainContainer">
    <Night />
    <h1>AI Crystal Ball</h1>
    <h2>Find your developer destiny!</h2>
    <img class="glow" src={crystalBall} alt="crystal ball">
    {#if data.loggedIn}
        <button class="glow" on:click={moveForward}>Reveal your destiny</button>
    {:else}
        <button class="glow" on:click={login}>
            <span class="icon-github"></span>Login with GitHub
        </button>
    {/if}
</div>

<style>
    .mainContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 100vh;
        gap: 4rem;
    }
    
    h1 {
        font-size: 3.5rem;
        margin: 0;
    }

    h2 {
        font-size: 2rem;
        margin: 0;
    }

    img {
        width: 20vw;
        max-width: 500px;
        border-radius: 50%;
    }

    button {
        font-size: 1.75rem;
    }

    span {
        font-size: 2rem;
        margin-right: 4px;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }

        img {
            width: 50vw;
        }

        button {
            font-size: 1.25rem;
        }

        span {
            font-size: 1.5rem;
        }
    }
</style>