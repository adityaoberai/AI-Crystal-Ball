<script>
    import { user } from '$lib/user';
	import { onMount } from 'svelte';

    function login() {
        user.login();
    }

    onMount(async () => {
        user.logout();
    });
</script>

<h1>AI Crystal Ball</h1>

<button on:click={login}>Login with GitHub</button>