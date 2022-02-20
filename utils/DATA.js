export const USER_KEY = 'Budget:user'
export const BUDGETS_KEY = 'Budget:budgets'
export const ENTRIES_KEY = 'Budget:entries'

export const user = {
	id: null,
	name: null,
	salary: 0,
  email: null,
	budgets: null,
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