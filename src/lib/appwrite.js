import { Client, Account, Databases } from 'appwrite';
import { env } from '$env/dynamic/public';

const client = new Client()
    .setEndpoint(env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(env.PUBLIC_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
