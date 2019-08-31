import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/'
import {blue, grey, white} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {addBudget} from '../actions/budgets'
import {saveBudget} from '../utils/api'

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
			<View style = {{padding: 10}}>
			<Text style = {styles.textBeforeInput}>
                    Add New Budget: 
                </Text>

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
	                    placeholder = 'Budget for a year (e.g. 5000)'
	                    style = {styles.inputS}
	                    value = {budget}
	                >
	                </TextInput>
	                <Text style = {styles.equivalent}>
	                	equivalent to ${Math.round(budget/12)} per month
	                </Text>
				</View>
				<TouchableOpacity 
					style = {{justifyContent:'flex-end', alignItems:'flex-end'}}
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
        backgroundColor: white,
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
        color: blue,
        fontSize: 20,
        marginLeft: 15,
    },
    inputS:{
        color: blue,
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