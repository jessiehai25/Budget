import {RECEIVE_BUDGETS, ADD_BUDGET, DELETE_BUDGET} from '../actions/budgets'


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
		
		default :
			return state
	}
}