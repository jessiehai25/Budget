export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const DELETE_ENTRY = 'DELETE_ENTRY'
import {addEntryToBudget, deleteEntryToBudget} from './budgets'
import {saveEntry, removeEntry} from '../utils/api'

export function receiveEntries (entries) {
	return{
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

export function deleteEntry (id) {
	return{
		type: DELETE_ENTRY,
		id
	}
}

export function handleAddEntry ({title, category, price, timestamp}){
	return (dispatch, getState) => {
		console.log("handleAddEntry",category)
		return saveEntry({
			title,
			category,
			price,
			timestamp
		})
		.then((entry) => {
			console.log('redux add', entry)
			dispatch(addEntry(entry))
			dispatch(addEntryToBudget(entry.category, entry.id))
		})
	}
}

export function handleDeleteEntry (id, category){
	return (dispatch, getState) => {
		//console.log('redux remove', id)
		return removeEntry(id)
		.then((entry, budgets) => {
			dispatch(deleteEntryToBudget(id, category))
			dispatch(deleteEntry(id))
			
		})
	}
}
