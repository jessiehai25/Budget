import {
  USER_KEY, 
  BUDGETS_KEY, 
  ENTRIES_KEY, 
  user, 
  budgets, 
  entries,
} from './DATA'
import {AsyncStorage} from 'react-native'
import firebase from 'firebase'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
  
const firebaseConfig = {
  apiKey: "AIzaSyAOwU41skP-0myZvwRf-_73J0G--2yrcIU",
  authDomain: "budget-87f6a.firebaseapp.com",
  projectId: "budget-87f6a",
  storageBucket: "budget-87f6a.appspot.com",
  messagingSenderId: "429983338993",
  appId: "1:429983338993:web:053829ffc4dd887b107450",
  measurementId: "G-GLVYWNS4YL"
};

let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
}else{
  app = firebase.app()
}

export const db = app.firestore()
export const auth = firebase.auth()

export const addUserToFB = async ({name, salary, email, password, budgets, photoURL}) => {
  const authUser = auth.currentUser;
  await db.collection(authUser.email).doc("user").set({
      name: name,
      salary: salary,
      budgets: budgets,

  })
  .catch((error) => alert(error))
}

export const getUserFrFB = async () => {
  const authUser = auth.currentUser;
  await db.collection(authUser.email).onSnapshot((snapshots) => {
    console.log("snapshots", snapshots)
    snapshots.docs.map((doc)=> ({
      id: doc.id,
      data:doc.data()
    }))
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  })
    
}



export const addBudgetToFB = async ({name, budgetInNumber, date}) => {
  const authUser = auth.currentUser;
  await db.collection(authUser.email).doc("budgets").collection(name).add({
      chatName: name,
      budget: budgetInNumber,
      date: date
  })
  .catch((error) => alert(error))
}


function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatEntry ({ timestamp, title, category, price }) {
  return {
    id: generateUID(),
    timestamp,
    title,
    category,
    price,
  }
}

export function saveEntry (entry) {
  return Promise.all([
      AsyncStorage.getItem(ENTRIES_KEY),
      AsyncStorage.getItem(BUDGETS_KEY)
    ]).then((result) => {
      const entriesDataJ = JSON.parse(result[0])
      const budgetsDataJ = JSON.parse(result[1])
      const authedBudget = entry.category;
      const formattedEntry = formatEntry(entry)
      const entries = {
        ...entriesDataJ,
        [formattedEntry.id]: formattedEntry
      }
      const budgets = {
        ...budgetsDataJ,
        [authedBudget]: {
          ...budgetsDataJ[authedBudget],
          entries: budgetsDataJ[authedBudget].entries.concat([formattedEntry.id])
        }
      }
      console.log("ADD CHECK", entries)
      try{
        AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
        AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets))
      }catch (error) {
        console.log(error)
      }
      
      return formattedEntry
    })
    
}

export function removeEntry (entry) {
  console.log("API0", entry)
  return Promise.all([
      AsyncStorage.getItem(ENTRIES_KEY),
      AsyncStorage.getItem(BUDGETS_KEY)
    ]).then((result) => {
      const entriesDataJ = JSON.parse(result[0])
      const budgetsDataJ = JSON.parse(result[1])
      const authedBudget = entriesDataJ[entry].category
      const entries = Object.keys(entriesDataJ).reduce((object, key) => {
        if (key !== entry){
          object[key] = entriesDataJ[key]
        }
        return object
      }, {})
      const budgets = {
        ...budgetsDataJ,
        [authedBudget]: {
          ...budgetsDataJ[authedBudget],
          entries: budgetsDataJ[authedBudget].entries.filter(ent => ent !== entry)
        }
      }
      console.log("removeEntry", entries)

      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
      AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets))

        return {entries, budgets}
    })
    
}



export function getUser () {
  return AsyncStorage.getItem(USER_KEY)
  .then (results => {
    console.log('AsyncStorage_User')
    if(results === null) {
      AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
      return user
    }else{
      return JSON.parse(results)
    }
  })
}

export function saveUserBudget (name) {
  return AsyncStorage.getItem(USER_KEY)
  .then(results => {
    const user = JSON.parse(results)
    if (user["budgets"] === undefined) {
      const budgets = [name]
      const newUser = {...user, budgets}
      AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
    else {
      const budgetList = user["budgets"]
      const budgets = [...budgetList, name]
      const newUser = {...user, budgets}
      AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
  })
}

export function removeUserBudget (budget) {
  return AsyncStorage.getItem(USER_KEY)
  .then(results => {
    const user = JSON.parse(results)
    const budgetList = user["budgets"]
    const budgets = user.budgets.filter(bud => bud !== budget)
    const newUser = {...user, budgets}
    AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
  )
}

export function getBudgets () {
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then (results => {
    if(results === null) {
      AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets))
      return budgets
    }else{
      return JSON.parse(results)
    }
  })
}

export function getEntries () {
  return AsyncStorage.getItem(ENTRIES_KEY)
  .then (results => {
    
    if(results === null) {
      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
      return entries
    }else{
      return JSON.parse(results)
    }
  })
}

export function getInitialData () {
  return Promise.all([
    getUser(),
    getEntries(),
    getBudgets(),
  ]).then(([user, entries, budgets]) => ({
    user,
    entries,
    budgets,
  }))
}

export function saveUser (user){
  return AsyncStorage.setItem(USER_KEY, JSON.stringify({
    ...user
  }))
}

export function saveBudget (name, budget, date, entries = []){
  return AsyncStorage.mergeItem(BUDGETS_KEY, JSON.stringify({
    [name]:{
      name,
      budget,
      start: date,
      entries,
      end: null
    }
  }))
}



export function removeBudget (bud) {
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then ((results) => {
    const data = JSON.parse(results)
    data[bud] = undefined
    delete data[bud]
    AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(data))
  })
}

export function modifyBudget (name, budget, originalName){
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    const bud = data[originalName]
    const {entries,start, end} = bud
    console.log("API", entries, start, end)
    removeBudget(originalName)
    .then(()=>
      saveBudget (name, budget, entries, date = {start}, end)
      )
    
  })
}
