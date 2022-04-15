import {
  USER_KEY, 
  BUDGETS_KEY, 
  ENTRIES_KEY, 
  user, 
  budgets, 
  entries,
} from './DATA'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {updateUser, updateBudget, updateWholeBudget, updateWholeEntries} from './firebase'


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

/***************SET INITIAL***************/
export function setAPIUser (user){
  console.log("API", user)
  return AsyncStorage.setItem(USER_KEY, JSON.stringify({
    ...user
  }))
}

export function setAPIBudget (budgets){
  console.log("API", budgets)
  return AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify({
    ...budgets
  }))
}

export function setAPIEntries (entries){
  console.log("API", entries)
  return AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify({
    ...entries
  }))
}

/***************INITIAL***************/

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

export function getUser () {
  return AsyncStorage.getItem(USER_KEY)
  .then (results => {
    if(results === null) {
      AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
      return user
    }else{
      return JSON.parse(results)
    }
  })
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

/***************USER***************/

export function saveUserBudget (name) {
  return AsyncStorage.getItem(USER_KEY)
  .then(results => {
    const user = JSON.parse(results)
    if (user["budgets"] === undefined) {
      const budgets = [name]
      const newUser = {...user, budgets}
      updateUser(newUser)
      AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
    else {
      const budgetList = user["budgets"]
      const budgets = [...budgetList, name]
      const newUser = {...user, budgets}
      updateUser(newUser)
      AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
  })
}

export function removeUserBudget (budget) {
  return AsyncStorage.getItem(USER_KEY)
  .then(results => {
    const user = JSON.parse(results)
    const budgets = user.budgets.filter(bud => bud !== budget)
    const newUser = {
      ...user, 
      budgets:budgets
    }
    console.log(budget, newUser)
    updateUser(newUser)
    AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser))
    }
  )
}

/***************BUDGET***************/

export function saveBudget (name, budget, date, rollOver, entries = []){
  console.log("ROLL2", rollOver)
  const newBudget = {
    [name]:{
      name,
      budget,
      start: date,
      entries,
      end: null,
      rollOver
    }
  }
  saveUserBudget(name)
  getUser()
  .then((results)=> {
    const uid = results.uid
    console.log("UID", newBudget, uid)
    updateBudget(newBudget, uid)
  })
  return AsyncStorage.mergeItem(BUDGETS_KEY, JSON.stringify(newBudget))
}

export function removeBudget (bud) {
  removeUserBudget(bud)
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then ((results) => {
    console.log("API REMOVE", bud)
    const data = JSON.parse(results)
    data[bud] = undefined
    delete data[bud]
    getUser()
    .then((results)=> {
      const uid = results.uid
      console.log("UID", uid)
      updateWholeBudget(data, uid)
    })
    AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(data))
  })
}

export function modifyBudget (name, budget, originalName){
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    const bud = data[originalName.name]
    console.log("MODIFY", bud)
    const {entries,start, end, rollOver} = bud
    const date = start
    console.log("API", entries, date, end)
    removeBudget(originalName.name)
    .then(()=>
      saveBudget (name, budget,  date, rollOver, entries)
      )
    
  })
}


/***************ENTRY***************/

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
      getUser()
      .then((results)=> {
        const uid = results.uid
        try{
          AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
          AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets))
          updateWholeEntries(entries, uid)
          updateWholeBudget(budgets, uid)
        }catch (error) {
          console.log(error)
        }
      })
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
      console.log('chk b4 remove', entriesDataJ, budgetsDataJ)
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
      getUser()
      .then((results)=> {
        const uid = results.uid
        AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
        AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets))
        updateWholeEntries(entries, uid)
        updateWholeBudget(budgets, uid)
      })
        return {entries, budgets}
    })
}
