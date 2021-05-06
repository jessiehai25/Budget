import {RECEIVE_ENTRIES, ADD_ENTRY} from '../actions/entries'


export default function entries (state = {}, action) {
	switch(action.type){
		case RECEIVE_ENTRIES :
		return {
			...state,
			...action.entries
		}
		case ADD_ENTRY:
		console.log(action.entry)
		return {
			...state,
			[action.entry.id]: action.entry
			
		}
		
		default :
			return state
	}
}