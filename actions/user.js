export const RECEIVE_USER = 'RECEIVE_USER'
export const SET_USER = 'SET_USER'

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