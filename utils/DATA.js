export const USER_KEY = 'Budget:user'
export const BUDGETS_KEY = 'Budget:budgets'
export const ENTRIES_KEY = 'Budget:entries'

export const firebaseConfig = {
  apiKey: "AIzaSyAOwU41skP-0myZvwRf-_73J0G--2yrcIU",
  authDomain: "budget-87f6a.firebaseapp.com",
  projectId: "budget-87f6a",
  storageBucket: "budget-87f6a.appspot.com",
  messagingSenderId: "429983338993",
  appId: "1:429983338993:web:053829ffc4dd887b107450",
  measurementId: "G-GLVYWNS4YL"
};

export const user = {
	uid: null,
	name: null,
	salary: 0,
  email: null,
	budgets: [],
  date: null
}
export const budgets = {
	
}
export const entries = {

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

export function _saveEntry (entry) {
  return new Promise((res, rej) => {
    const authedBudget = entry.title;
    const formattedEntry = formatEntry(entry);

    setTimeout(() => {
      entries = {
        ...entries,
        [formattedEntry.id]: formattedEntry
      }
      
      budgets = {
        ...budgets,
        [authedBudget]: {
          ...budgets[authedBudget],
          entries: budgets[authedBudget].entries.concat([formattedEntry.id])
        }
      }

      res(formattedEntry)
    }, 1000)
  })
}