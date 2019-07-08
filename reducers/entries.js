import {RECEIVE_ENTRIES, } from '../actions/entries'


export default function entries (state = {}, action) {
	switch(action.type){
		case RECEIVE_ENTRIES :
		return {
			...state,
			...action.entries
		}
		
		default :
			return state
	}
}