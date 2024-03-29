export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS'
export const ADD_BUDGET = 'ADD_BUDGET'
export const DELETE_BUDGET = 'DELETE_BUDGET'
export const EDIT_BUDGET = 'EDIT_BUDGET'
export const ADD_ENTRY_TO_BUDGET = 'ADD_ENTRY_TO_BUDGET'
export const DELETE_ENTRY_TO_BUDGET = 'DELETE_ENTRY_TO_BUDGET'

export function receiveBudgets (budgets) {
	return {
		type: RECEIVE_BUDGETS,
		budgets
	}
}
export function addBudget (name, budget, date, rollOver) {
	return{
		type: ADD_BUDGET,
		name,
		budget,
		date,
		rollOver
	}
}

export function deleteBudget (bud) {
	return{
		type: DELETE_BUDGET,
		bud
	}
}

export function editBudget (name, budget, originalName) {
	return{
		type: EDIT_BUDGET,
		name,
		budget,
		originalName,
	}
}

export function addEntryToBudget(category, id) {
	return{
		type: ADD_ENTRY_TO_BUDGET,
		category,
		id
	}
}

export function deleteEntryToBudget(id, category) {
	return{
		type: DELETE_ENTRY_TO_BUDGET,
		id,
		category,
		

	}
}