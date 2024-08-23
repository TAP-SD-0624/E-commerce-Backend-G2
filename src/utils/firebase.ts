import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { CustomError } from '../middleware/customError';
import { firebaseConfigs } from '../config/databaseConfig';

const firebaseConfig = {
    apiKey: firebaseConfigs.apiKey,
    authDomain: firebaseConfigs.authDomain,
    projectId: firebaseConfigs.projectId,
    storageBucket: 'ecommerce-4bddc.appspot.com',
    messagingSenderId: firebaseConfigs.messagingSenderId,
    appId: firebaseConfigs.appId
};

const app = initializeApp(firebaseConfig);
export const fireStorage = getStorage(app);

export const uploadImages = async (images: Array<any>): Promise<Array<string>> => {
    let arr: Array<string> = [];
    for (let i of images) {
        try {
            const filename = new Date().getTime() + '-' + i.originalname;
            const imageRef = ref(fireStorage, 'products/' + filename);
            const snapshot = await uploadBytes(imageRef, i.buffer);
            const imageURL = await getDownloadURL(snapshot.ref);
            arr.push(imageURL);
        } catch (error) {
            throw new CustomError('uploading images faild', 500);
        }
    }
    return arr;
};
