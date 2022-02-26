import {firebaseConfig} from './DATA'
import firebase from "firebase/app";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';

initializeApp(firebaseConfig);
const db = getDatabase();
export const auth = getAuth();
export const dbRef = ref(getDatabase());

export function storeUser(user) {
  /***https://docs.expo.dev/guides/using-firebase/***/
  console.log("storeUser_Firebase", user)
  const reference = ref(db, 'users/' + user.uid);
  set(reference, user);
}

export function updateUserBudget(user){
  console.log("firebase", user)
  set(ref(db, 'users/' + user.uid), user)
  .then(() => {
    console.log("saved successfully")
  })
  .catch((error) => {
    Alert(error)
  });
}

