import { writable } from "svelte/store";
import { account } from "./appwrite";

const isBrowser = typeof window !== 'undefined';

const createUser = () => {
    const store = writable(null);

    async function init() {
        if(!isBrowser) return;
        try {
            store.set(await account.get());
        } catch (error) {
            store.set(null);
        }
    } 
    
    init();

    function login() {
        if(!isBrowser) return;
        account.createOAuth2Session('github', `http://localhost:5173/app`, `http://localhost:5173/app`);
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