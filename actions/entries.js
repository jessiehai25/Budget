export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
import {addEntryToBudget} from './budgets'

export function receiveEntries (entries) {
	return {
		type: RECEIVE_ENTRIES,
		entries
	}
}

export function addEntry (entry) {
	return{
		type: ADD_ENTRY,
		entry
	}
}

export function handleAddEntry ({title, category, price, timestamp}){
	console.log("handle", title, category, price, timestamp)
	return (dispatch, getState) => {
		
		return saveEntry({
			title,
			category,
			price,
			timestamp
		})
		.then((entry) => {
			dispatch(addEntry(entry))
			dispatch(addEntry(entry.category, entry.id))
		})
	}
}