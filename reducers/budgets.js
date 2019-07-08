import {RECEIVE_BUDGETS, ADD_BUDGET} from '../actions/budgets'


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
		
		default :
			return state
	}
}