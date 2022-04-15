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
  const reference = ref(db, 'users/' + user.uid);
  set(reference, user);
}

export function updateUser(user){
  set(ref(db, 'users/' + user.uid), user)
  .then(() => {
    console.log("user saved successfully")
  })
  .catch((error) => {
    Alert(error)
  });
}

export function updateBudget(budget, uid){
  const name = Object.keys(budget)
  set(ref(db, 'budgets/' + uid + '/' + Object.keys(budget)), budget[name])
  .then(() => {
    console.log("budget saved successfully")
  })
  .catch((error) => {
    Alert(error)
  });
}

export function updateWholeBudget(budget, uid){
  set(ref(db, 'budgets/' + uid + '/'), budget)
  .then(() => {
    console.log("budget saved successfully")
  })
  .catch((error) => {
    Alert(error)
  });
}

export function updateWholeEntries(entries, uid){
  set(ref(db, 'entries/' + uid + '/'), entries)
  .then(() => {
    console.log("entries saved successfully")
  })
  .catch((error) => {
    Alert(error)
  });
}
