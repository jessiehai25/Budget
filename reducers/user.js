import {RECEIVE_USER, SET_USER, ADD_USER_BUDGET, DELETE_USER_BUDGET} from '../actions/user'

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
		case ADD_USER_BUDGET:
			const name = action.name
			console.log("ADD_USER_BUDGET in reducer!!!!!!!")
			return {

				...state,
				budgets:[
					...state.budgets,
					name
				]
			}
		case DELETE_USER_BUDGET:
		console.log("!!!!")
			const {budget} = action
			const budgets = state.budgets.filter(bud => bud !== budget)
			console.log("DELETE_USER_BUDGET", budgets)
			return{
				...state,
				budgets
			}
		default:
			return state
	}
}