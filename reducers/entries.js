import {RECEIVE_ENTRIES, ADD_ENTRY, DELETE_ENTRY} from '../actions/entries'


export default function entries (state = {}, action) {
	switch(action.type){
		case RECEIVE_ENTRIES:
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
		
		case DELETE_ENTRY:
			console.log("delete_entry", action)
			const newState = Object.keys(state).reduce((object, key) => {
					if (key !== action.id){
						object[key] = state[key]
					}
					return object
				}, {})
			return {
				...newState,
		}

		default :
			return state
	}
}
