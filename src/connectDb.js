// import tools from firebase
import { initializeApp, getApps, cert } from 'firebase-admin/app';
// import firestore from firebase
import { getFirestore} from 'firebase-admin/firestore';

// import my credentials to connect to firebase
import myCredentials from '../credentials.js';

//write a function to connect to firebase
export default function connectDb() {
// first check to see if we are already connected...
if(getApps().length === 0) {
// if not connect...
initializeApp({
    credential: cert(myCredentials)
});
}
//either way...
// return the connection to firestore
return getFirestore();
}

