import {USER_KEY, BUDGETS_KEY, ENTRIES_KEY, user, budgets, entries} from './_DATA'
import {AsyncStorage} from 'react-native'

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

export function getBudgets () {
  return AsyncStorage.getItem(BUDGETS_KEY)
  .then (results => {
    console.log('AsyncStorage_Budget')
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
    console.log('AsyncStorage_Entries')
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
    user
  }))
}

export function saveBudget (name, budget){
  return AsyncStorage.mergeItem(BUDGETS_KEY, JSON.stringify({
    [name]:{
      name,
      budget
    }
  }))
}