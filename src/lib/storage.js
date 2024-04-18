import { storage } from "./appwrite";
import { ID, Permission, Role } from "appwrite";

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

export const images = {
    upload: async (userId, base64String) => {
        const file = dataURLtoFile(base64String, 'fortune.png');
        return await storage.createFile(
            'future',
            ID.unique(),
            file,
            [
                Permission.write(Role.user(userId))
            ]
        )
    },

    view: (fileId) => {
        return storage.getFileView('future', fileId);
    }
}