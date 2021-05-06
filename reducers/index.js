import {combineReducers} from 'redux'
import budgets from './budgets'
import user from './user'
import entries from './entries'

export default combineReducers({
	user, 
	entries, 
	budgets,
})