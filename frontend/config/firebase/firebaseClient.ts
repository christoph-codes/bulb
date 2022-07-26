import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

/**
 * Initialize the firebase app using firebase api keys.
 */
firebase.initializeApp({
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
});
/**
 * Firebase authentication instance with the required credentials.
 * Authentication emulator is set by the firebase env variable.
 */
const auth = firebase.auth();

export default auth;