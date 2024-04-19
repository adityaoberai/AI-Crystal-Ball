import { writable } from "svelte/store";
import { account } from "./appwrite";
import { goto } from "$app/navigation";

const isBrowser = typeof window !== 'undefined';

const createUser = () => {
    const store = writable(null);

    async function init() {
        try {
            store.set(await account.get());
        } catch (error) {
            store.set(null);
        }
    } 
    
    init();

    async function isLoggedIn() {
        try {
            await account.get();
            return true;
        } catch(err) {
            return false;
        }
    }

    function login() {
        if(!isBrowser) return;
        account.createOAuth2Session('github', `https://${window.location.hostname}/app`, `https://${window.location.hostname}`);
    }

    async function getSession() {
        if(!isBrowser) return;
        return await account.getSession('current')
    }

    return {
        subscribe: store.subscribe,
        init,
        isLoggedIn,
        login,
        getSession
    }
}

export const user = createUser();