import {RECEIVE_BUDGETS, ADD_BUDGET, DELETE_BUDGET, EDIT_BUDGET} from '../actions/budgets'


export default function budgets (state = {}, action) {
	switch(action.type){
		case RECEIVE_BUDGETS :
			return {
				...state,
				...action.budgets
			}
		case ADD_BUDGET :
			const {name, budget} = action
			return {
				...state,
				[action.name]:{
					name,
					budget,
					entries: []
			}
		}
		case DELETE_BUDGET :
			const {bud} = action
			const newState = Object.keys(state).reduce((object, key) => {
				if (key !== bud){
					console.log(key)
					object[key] = state[key]
				}
				return object
			}, {})
		return {
			...newState,
		}
		case EDIT_BUDGET :
			const {originalName} = action
			const name1 = action.name
			const budget1 = action.budget
			const originalBud = state[originalName]
			const entries = originalBud.entries
			console.log(name1, budget1)
			const removedState = Object.keys(state).reduce((object, key) => {
				if (key !== originalName){
					console.log(key)
					object[key] = state[key]
				}
				return object
			}, {})
		return {
			...removedState,
			[action.name]:{
				name:name1,
				budget:budget1,
				entries
			}
		}

		default :
			return state
	}
}