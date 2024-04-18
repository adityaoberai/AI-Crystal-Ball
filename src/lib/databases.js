import { Permission, Role } from "appwrite";
import { databases } from "./appwrite";

export const db = {
    get: async(documentId) => {
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
    add: async(userId, username, followers, following, languages) => {
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
    }
};