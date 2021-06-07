export const USER_KEY = 'Budget:user'
export const BUDGETS_KEY = 'Budget:budgets'
export const ENTRIES_KEY = 'Budget:entries'

export const user = {
    	id: 'Jessie',
    	name: 'Jessie',
    	salary: 90000,
    	yearEnd: "March",
    	budgets: ["clothes","transport","misc"]
}
export const budgets = {
	clothes: {
		name: "clothes",
		budget: 4000,
		entries: ["8xf0y6ziyjabvozdd253nd"],
		start: 1617235200000,
		end: null
	},
	transport: {
		name: "transport",
		budget: 5000,
		entries: ["5c9qojr2d1738zlx09afby", "3km0v4hf1ps92ajf4z2ytg"],
		start: 1619782264000,
		end: null
	},
	misc : {
		name: 'misc',
		budget: 4000,
		entries: [],
		start: 1619827200000,
		end: null
	},
}
export const entries = {
	"8xf0y6ziyjabvozdd253nd": {
		id: "8xf0y6ziyjabvozdd253nd",
		title: "zalora",
		category: "clothes",
		price: 200,
		timestamp: 1618853830000
	},
	"5c9qojr2d1738zlx09afby": {
		id: "5c9qojr2d1738zlx09afby",
		title: "mtr",
		category: "transport",
		price: 30,
		timestamp: 1619222400000
	},
	"3km0v4hf1ps92ajf4z2ytg": {
		id: "3km0v4hf1ps92ajf4z2ytg",
		title: "mtr",
		category: "transport",
		price: 300,
		timestamp: 1619222400000
	},
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

    