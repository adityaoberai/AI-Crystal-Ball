import { user } from "$lib/user";

export const prerender = true;

export async function load() {
    let loggedIn = await user.init();
    
    return {
        loggedIn
    };
}