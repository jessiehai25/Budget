import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/'
import {blue, grey, white, body} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {addBudget} from '../actions/budgets'
import {addUserBudget} from '../actions/user'
import {saveBudget, saveUserBudget} from '../utils/api'


class AddBudget extends Component {
	state = {
		name:'',
		budget:''
    }

    addBudget = () => {
    	const {name, budget} = this.state
    	const budgetInNumber = parseInt(budget)
    	const bud = {name, budgetInNumber}
    	const {dispatch} = this.props
    	if (name === '' || budget===''){
    		alert('You have not complete')
    	}
    	else{
	    	dispatch(addBudget(name, budgetInNumber))
	    	dispatch(addUserBudget(name))
	    	console.log("Add Budget")
	    	saveUserBudget(name)
	    	saveBudget(name, budgetInNumber)
	    	this.setState(()=>({
	    		name: '',
	    		budget: ''
	    	}))
	    	this.props.navigation.goBack()

	    }
    }


	render(){
		const {name, budget} = this.state

		return(
			<View style = {styles.container}>
				
				<View style = {styles.inputContainer}>
	                <TextInput
	                    onChangeText = {(name) => this.setState(() => ({name: name}))}
	                    placeholder = 'Category (e.g. Food)'
	                    style = {styles.inputS}
	                    value = {name}
	                >
	                </TextInput>
	                <TextInput
	                    onChangeText = {(budget) => this.setState(() => ({budget: budget}))}
	                    placeholder = 'Budget for month (e.g. 5000)'
	                    style = {styles.inputS}
	                    value = {budget}
	                >
	                </TextInput>
	                <Text style = {styles.equivalent}>
	                	equivalent to around ${Math.round(budget/30)} per day
	                </Text>
				</View>
				<View style={{height:'100%', alignItems:'center'}}>
					<TouchableOpacity 
						style = {{justifyContent:'center', alignItems:'flex-start'}}
						onPress = {this.addBudget}
					>
		                	<FontAwesome name = 'plus-circle' size = {30} style = {{color: blue}}/>
		            </TouchableOpacity>
	            </View>
	        </View>

		)
	}
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection: 'row',
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        borderRadius: Platform.OS === 'ios' ? 7 : 2,
        shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: 'rgba(0,0,0,0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
    },
    inputContainer: {
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'flex-start'
    },
    textBeforeInput:{
        color: body,
        fontSize: 20,
        marginLeft: 15,
    },
    inputS:{
        color: body,
        fontSize: 20,
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        marginTop: 10,
        width: '90%',
 	},
 	equivalent:{
 		color:grey,
 		marginLeft: 15,
 	}
})


export default connect()(AddBudget)