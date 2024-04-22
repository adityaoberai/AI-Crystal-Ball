import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('https://appwritecloud.oberai.dev/v1')
    .setProject('aicrystalball');

export const account = new Account(client);
export const databases = new Databases(client);
