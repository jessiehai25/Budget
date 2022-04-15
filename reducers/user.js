import {RECEIVE_USER, SET_USER, ADD_USER_BUDGET, EDIT_USER_BUDGET, DELETE_USER_BUDGET} from '../actions/user'

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
			console.log("ADD REDUX", name)
			return {

				...state,
				budgets:[
					...state.budgets,
					name
				]
			}
		/*case EDIT_USER_BUDGET:
			const {newName, originalName} = action
			const oldBudgets = state.budgets
			const removedBudgets = oldBudgets.filter(item => item !== originalName)
			return{
				...state,
				budgets:[
					...removedBudgets,
					newName
				]
			}
			*/

		case DELETE_USER_BUDGET:
			const {budget} = action
			const budgets = state.budgets.filter(bud => bud !== budget)
			console.log("redux", budgets)
			console.log(state)
			return{
				...state,
				budgets: budgets
			}
		default:
			return state
	}
}