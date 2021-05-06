import {
  USER_KEY, 
  BUDGETS_KEY, 
  ENTRIES_KEY, 
  user, 
  budgets, 
  entries,
  _saveEntry,
} from './_DATA'
import {AsyncStorage} from 'react-native'

export function saveEntry (entry) {
  return _saveEntry(entry)
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
    }3
  })
}

export function getBudgets () {
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then (results => {
    console.log('AsyncStorage_Budget', results)
    if(results === null) {
      console.log('null result')
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
  console.log(user)
  return AsyncStorage.setItem(USER_KEY, JSON.stringify({
    ...user
  }))
}

export function saveBudget (name, budget, entries = []){
  return AsyncStorage.mergeItem(BUDGETS_KEY, JSON.stringify({
    [name]:{
      name,
      budget,
      entries
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
    const entries = bud.entries
    removeBudget(originalName)
    .then(()=>
      saveBudget (name, budget, entries)
      )
    
  })
}
