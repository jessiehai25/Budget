export const RECEIVE_BUDGETS = 'RECEIVE_BUDGETS'
export const ADD_BUDGET = 'ADD_BUDGET'
export const DELETE_BUDGET = 'DELETE_BUDGET'

export function receiveBudgets (budgets) {
	return {
		type: RECEIVE_BUDGETS,
		budgets
	}
}



export function addBudget (name, budget) {
	return{
		type: ADD_BUDGET,
		name,
		budget
	}
}

export function deleteBudget (bud) {
	return{
		type: DELETE_BUDGET,
		bud
	}
}