import { Permission, Role, ID } from "appwrite";
import { databases } from "./appwrite";

export const db = {
    getUserData: async(documentId) => {
        try{
            return await databases.getDocument(
                "crystalball",
                "githubData",
                documentId
            );
        } catch(err){
            return false;
        }
    },

    addUserData: async(userId, username, followers, following, languages) => {
        return await databases.createDocument(
            "crystalball",
            "githubData",
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
            'crystalball',
            'destiny',
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
                'crystalball',
                'destiny',
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