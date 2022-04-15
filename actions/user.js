export const RECEIVE_USER = 'RECEIVE_USER'
export const SET_USER = 'SET_USER'
export const ADD_USER_BUDGET = 'SAVE_USER_BUDGET'
export const EDIT_USER_BUDGET = 'EDIT_USER_BUDGET'
export const DELETE_USER_BUDGET = 'DELETE_USER_BUDGET'

export function receiveUser (user) {
	return {
		type: RECEIVE_USER,
		user
	}
}

export function setUser (user) {
	return {
		type: SET_USER,
		user
	}
}

export function addUserBudget (name) {
	return {
		type: ADD_USER_BUDGET,
		name
	}
}

/*export function editUserBudget (name) {
	return {
		type: EDIT_USER_BUDGET,
		name
	}
}*/

export function deleteUserBudget (budget) {
	return {
		type: DELETE_USER_BUDGET,
		budget
	}
} 