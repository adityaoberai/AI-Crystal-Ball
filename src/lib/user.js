import { writable } from "svelte/store";
import { account } from "./appwrite";
import { goto } from "$app/navigation";

const isBrowser = typeof window !== 'undefined';

const createUser = () => {
    const store = writable(null);

    async function init() {
        if(!isBrowser) return;
        try {
            store.set(await account.get());
        } catch (error) {
            store.set(null);
            alert('Please log in to continue');
            goto('/');
        }
    } 
    
    init();

    function login() {
        if(!isBrowser) return;
        account.createOAuth2Session('github', `http://localhost:5173/app`, `http://${window.location.hostname}`);
    }

    function logout() {
        account.deleteSession('current');
    }

    async function getSession() {
        if(!isBrowser) return;
        return await account.getSession('current')
    }

    return {
        subscribe: store.subscribe,
        init,
        login,
        logout,
        getSession
    }
}

export const user = createUser();