import { user } from "$lib/user";
export async function load() {
    await user.init();
    let loggedIn = await user.isLoggedIn();
    
    return {
        loggedIn
    }
}