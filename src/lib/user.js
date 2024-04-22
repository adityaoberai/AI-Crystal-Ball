import { writable } from "svelte/store";
import { account } from "./appwrite";

const isBrowser = typeof window !== 'undefined';

const createUser = () => {
    const store = writable(null);

    async function init() {
        try {
            let session = await getSession();
            if(!session) throw new Error('No session found');
            store.set(await account.get());
            return true;
        } catch (error) {
            store.set(null);
            return false;
        }
    } 
    
    init();

    function login() {
        if(!isBrowser) return;
        account.createOAuth2Session('github', `https://${window.location.hostname}/app`, `https://${window.location.hostname}`);
    }

    async function getSession() {
        try {
            return await account.getSession('current');
        } catch(err) {
            return null;
        }
    }

    return {
        subscribe: store.subscribe,
        init,
        login,
        getSession
    }
}

export const user = createUser();
