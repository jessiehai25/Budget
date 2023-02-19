import {RECEIVE_USER, SET_USER, ADD_USER_BUDGET, EDIT_USER_BUDGET, DELETE_USER_BUDGET, EDIT_SALARY, CHANGE_PASSWORD} from '../actions/user'

export default function user (state = null, action){
	switch(action.type){
		case RECEIVE_USER:
			return {
			...action.user
		}
		case SET_USER: 
			return {
				...state,
				...action.user,
			}
		case ADD_USER_BUDGET:
			const name = action.name
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
			return{
				...state,
				budgets: budgets
			}

		case EDIT_SALARY:
			const {salary} = action
			return{
				...state,
				salary: salary
			}

		case CHANGE_PASSWORD:
			const {newPassword} = action
			console.log("redux change pw", newPassword)
			return{
				...state,
				password: newPassword
			}

		default:
			return state
	}
}