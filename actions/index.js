import {getInitialData} from '../utils/api'
import {receiveUser} from '../actions/user'
import {receiveEntries} from '../actions/entries'
import {receiveBudgets} from '../actions/budgets'

export function handleInitialData () {
	return (dispatch) => {
		return getInitialData()
			.then(({user,entries, budgets})=>{
				console.log("2", budgets)
				dispatch(receiveBudgets(budgets))
				dispatch(receiveUser(user))
				dispatch(receiveEntries(entries))
				
			})
	}
}