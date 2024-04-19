import { db } from '$lib/databases';

export async function load({ params }) {
    let destiny = await db.getDestiny(params.slug);
    
    return {
        destiny
    };
}