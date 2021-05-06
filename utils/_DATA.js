export const USER_KEY = 'Budget:user'
export const BUDGETS_KEY = 'Budget:budgets'
export const ENTRIES_KEY = 'Budget:entries'

export const user = {
    	id: 'Jessie',
    	name: 'Jessie',
    	salary: 90000,
    	yearEnd: "March",
    	budgets: ["clothes","transport","misc"],
}
export const budgets = {
	clothes: {
		name: "clothes",
		budget: 4000,
		entries: ["8xf0y6ziyjabvozdd253nd"],
	},
	transport: {
		name: "transport",
		budget: 5000,
		entries: ["5c9qojr2d1738zlx09afby", "3km0v4hf1ps92ajf4z2ytg"],
	},
	misc : {
		name: 'misc',
		budget: 4000,
		entries: [],
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

export function _saveEntry ({ timestamp, title, category, price }) {
  return new Promise((res, rej) => {
  	console.log("_saveEntry1", title)
    const formattedEntry = formatEntry({ 
    	timestamp, 
    	title, 
    	category, 
    	price 
    });
    console.log("formattedEntry", formattedEntry, [formattedEntry.id])
    setTimeout(() => {
      entries = {
        ...entries,
        [formattedEntry.id]: formattedEntry,
      }
      AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries))
      console.log("_saveEntry3", entries)
      budgets = {
        ...budgets,
        [category]: {
          ...budgets[category],
          entries: budgets[category].entries.concat([formattedEntry.id])
        }
      }
      AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets))

      res(formattedEntry)
    }, 1000)
  })
}
    