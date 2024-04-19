import { user } from "$lib/user";
export async function load() {
    let loggedIn = await user.init();
    
    return {
        loggedIn
    };
}