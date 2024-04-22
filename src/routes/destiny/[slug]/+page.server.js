import { db } from '$lib/databases';

export const ssr = true;
export const csr = false;

export async function load({ params }) {
    let destiny = await db.getDestiny(params.slug);
    
    return {
        destiny
    };
}