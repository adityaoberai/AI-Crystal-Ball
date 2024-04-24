import { Permission, Role, ID } from 'appwrite';
import { databases } from "./appwrite";
import { env } from '$env/dynamic/public';

const databaseId = env.PUBLIC_APPWRITE_DATABASE_ID;
const githubDataCollectionId = env.PUBLIC_APPWRITE_COLLECTION_ID_GITHUBDATA;
const destinyCollectionId = env.PUBLIC_APPWRITE_COLLECTION_ID_DESTINY;

export const db = {
    getUserData: async(documentId) => {
        try{
            return await databases.getDocument(
                databaseId,
                githubDataCollectionId,
                documentId
            );
        } catch(err){
            return false;
        }
    },

    addUserData: async(userId, username, followers, following, languages) => {
        return await databases.createDocument(
            databaseId,
            githubDataCollectionId,
            userId,
            {
                username,
                followers,
                following,
                languages
            },
            [
                Permission.write(Role.user(userId)), Permission.read(Role.user(userId))
            ]
        )
    },

    addDestiny: async(username, destiny) => {
        return await databases.createDocument(
            databaseId,
            destinyCollectionId,
            ID.unique(),
            {
                username,
                destiny
            }
        )
    },
    
    getDestiny: async(documentId) => {
        try{
            return await databases.getDocument(
                databaseId,
                destinyCollectionId,
                documentId
            );
        } catch(err){
            return {
                username: 'Not found',
                destiny: 'Not found'
            }
        }
    }
};