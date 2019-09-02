import {RECEIVE_USER, SET_USER} from '../actions/user'

export default function user (state = null, action){
	switch(action.type){
		case RECEIVE_USER:
			return {
			...state,
			...action.user
		}
		case SET_USER: 
			return {
				...state,
				...action.user,
			}
		default:
			return state
	}
}