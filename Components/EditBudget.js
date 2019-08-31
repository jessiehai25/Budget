import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, darkBlue} from '../utils/colors'

class EditBudget extends Component {
	state = {
		name:'',
		budget:'',

	}
	constructor(props) { 
		super(props); 
		const bud = this.props.navigation.state.params.bud
		this.state = { 
			name: bud, 
			budget: props.budgets[bud].budget.toString()
		} 
	} 

	render(){
		console.log(this.props)
		const {user, budgets} = this.props
		const {name, budget} = this.state
		const bud = this.props.navigation.state.params.bud
		return(
			<View style = {{padding: 10}}>

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
					
		        </View>
		        
			        <TouchableOpacity 
						style = {{justifyContent:'center', alignItems:'center'}}	
						>
						<View style = {[styles.container,{backgroundColor:blue,justifyContent:'center', alignItems:'center'}]}>
	                		<Text style = {[styles.inputS,{color:white}]} >
	                			Save
	                		</Text>
	                	</View>
			        </TouchableOpacity>
		        
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
        alignItems: 'center',

        color: blue,
        fontSize: 20,
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        width: '90%',
 	},
 	equivalent:{
 		color:grey,
 		marginLeft: 15,
 	}
})

function mapStateToProps({user, budgets}){
  return{
    user,
    budgets,
  }
}

export default connect(mapStateToProps)(EditBudget)