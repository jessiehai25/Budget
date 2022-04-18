import {RECEIVE_BUDGETS, ADD_BUDGET, DELETE_BUDGET, EDIT_BUDGET, ADD_ENTRY_TO_BUDGET, DELETE_ENTRY_TO_BUDGET} from '../actions/budgets'


export default function budgets (state = {}, action) {
	switch(action.type){
		case RECEIVE_BUDGETS :
			return {
				...action.budgets
			}
		
		case ADD_BUDGET :
			const {name, budget, date, rollOver} = action
			return {
				...state,
				[action.name]:{
					name,
					budget,
					start: date,
					entries: [],
					end: null,
					rollOver
			}
		}
		case DELETE_BUDGET :
			const {bud} = action
			const newState = Object.keys(state).reduce((object, key) => {
				if (key !== bud){
					object[key] = state[key]
				}
				return object
			}, {})
			console.log("REDUCER", newState)
			return {
				...newState,
			}
		case EDIT_BUDGET :
			const {originalName} = action
			const name1 = action.name
			const budget1 = action.budget
			const originalBud = state[originalName.name]
			console.log("originalBud", originalBud)
			const {entries, start, end} = originalBud
			console.log(name1, budget1, entries)
			const removedState = Object.keys(state).reduce((object, key) => {
				if (key !== originalName.name){
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
				entries,
				start,
				end
			}
		}

		case ADD_ENTRY_TO_BUDGET :
			const {category, id} = action
			console.log("budget_add_entry", action)
			return{
				...state,
				[category]:{
					...state[category],
					entries: state[category].entries.concat(id)
				}
			}

		case DELETE_ENTRY_TO_BUDGET :
			console.log("budget_delete_entry", action)
			console.log("new_budget_check",state[action.category].entries.filter(ent => ent !== action.id))
			return{
				...state,
				[action.category]:{
					...state[action.category],
					entries: state[action.category].entries.filter(ent => ent !== action.id)
				}
			}

		default :
			return state
	}
}

