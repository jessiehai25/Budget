import {RECEIVE_USER, SET_USER} from '../actions/user'

export default function user (state = {}, action){
	switch(action.type){
		case RECEIVE_USER:
			return {
			...state,
			...action.user.user
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