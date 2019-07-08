export const USER_KEY = 'Budget:user'
export const BUDGETS_KEY = 'Budget:budgets'
export const ENTRIES_KEY = 'Budget:entries'

export const user = {
    	id: 'Jessie',
    	name: 'Jessie',
    	salary: "10000",
    	yearEnd: "March",
    	budgets: ["clothes","transport","misc"],
}
export const budgets = {
	"clothes": {
		name: "clothes",
		budget: 4000,
		entries: ["8xf0y6ziyjabvozdd253nd"],
	},
	"transport": {
		name: "transport",
		budget: 5000,
		entries: ["5c9qojr2d1738zlx09afby"],
	},
	"misc" : {
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
	},
	"5c9qojr2d1738zlx09afby": {
		id: "5c9qojr2d1738zlx09afby",
		title: "mtr",
		category: "transport",
		price: 30,
	},
}

    