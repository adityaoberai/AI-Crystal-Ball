<script>
    import { user } from '$lib/user';
    import Night from '../components/Night.svelte';
    import crystalBall from '$lib/assets/crystalball.png';
	import { onMount } from 'svelte';

    let dialog;

    document.onkeydown = function(event) {
        if (event.key == 'Esc' || event.key == 'Escape') {
            dialog.close();
        }
    };

    function login() {
        user.login();
    }

    function showDialog() {
        dialog.showModal();
    }

    function closeDialog() {
        dialog.close();
    }

    onMount(() => {
        dialog = document.querySelector('dialog');
    });
</script>

<div class="mainContainer">
    <Night />
    <h1>AI Crystal Ball</h1>
    <h2>Find your developer destiny!</h2>
    <img class="glow" src={crystalBall} alt="crystal ball">
    <div class="loginButtonContainer">
        <button class="glow" on:click={login}>
            <span class="icon-github"></span>Login with GitHub
        </button>
        <button class="dialogTriggerButton" on:click={showDialog}>Why is logging in necessary?</button>
    </div>
    <dialog>
        <h2>Why is GitHub login necessary?</h2>
        <p>It is necessary to log in with GitHub because the app uses the GitHub API to get a user's top 5 languages from their recently created repos.</p>
        <p>In order to get this information, the app needs the user's access token from GitHub, which mandates the authentication process.</p>
        <button class="dialogButton" on:click={closeDialog}>Ok</button>
    </dialog>
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

    .loginButtonContainer {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .dialogTriggerButton {
        color: var(--color-secondary-gold);
        background-color: transparent;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1.2rem;
        transition: background-color 0.3s, transform 0.3s;
        border: none;
    }

    .dialogTriggerButton:hover {
        color: var(--color-utility-light);
        border: none;
    }

    .dialogButton {
        font-size: 1rem;
        border-radius: 1rem;
        padding: 0.75rem 1.5rem;
    }

    dialog {
        background-color: var(--color-utility-light);
        color: var(--color-utility-dark);
        border: 2px solid var(--color-secondary-gold);
        border-radius: 1rem;
        padding: 2rem;
    }

    dialog::backdrop {
        background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.8));
        animation: fade-in 1s;
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

        .loginButtonContainer {
            gap: 2rem;
        }
    }
</style>