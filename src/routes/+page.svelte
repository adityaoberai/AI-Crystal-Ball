<script>
    import { user } from '$lib/user';
    import Night from '../components/Night.svelte';
    import crystalBall from '$lib/assets/crystalball.png';

    function login() {
        user.login();
    }
</script>

<div class="mainContainer">
    <Night />
    <h1>AI Crystal Ball</h1>
    <h2>Find your developer destiny!</h2>
    <img class="glow" src={crystalBall} alt="crystal ball">
    <button class="glow" on:click={login}>
        <span class="icon-github"></span>Login with GitHub
    </button>
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