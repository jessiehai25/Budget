import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'

class EditBudget extends Component {
	
	
	state = {
		name:'',
		budget:0,

	}

	componentDidMount(){
	    const {bud, budgets} = this.props
	    const budget = budgets[bud].budget
	    this.setState(()=> ({
            name: bud,
            budget: budget
        }))

    }
	editB = ()=>{
		const originalName = this.props.bud
        const {name, budget} = this.state
        const {edit} = this.props
    	const {dispatch} = this.props
    	if (name === '' || budget===0){
    		alert('You have not complete')
    	}
    	else{
			edit({name, budget, originalName})
	    	this.setState(()=>({
	    		name: '',
	    		budget: 0
	    	}))

	    }
    }

	render(){
		const {budgets} = this.props
		const {name, budget} = this.state
		console.log("EDITBUDGET",budget, budgets, name)
		
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
	                    onChangeText = {(budget) => this.setState(() => ({budget: parseInt(budget)}))}
	                    placeholder = 'Budget for a year (e.g. 5000)'
	                    style = {styles.inputS}
	                    value = {isNaN(budget.toString())?0 :budget.toString()}
	                    keyboardType={'numeric'}
	                >
	                </TextInput>
	                <Text style = {styles.equivalent}>
	                	equivalent to around ${Math.round(budget/30)} per day
	                </Text>
				</View>

		        <View style = {{alignItems:'center'}}>
			        <TouchableOpacity 
						style = {{justifyContent:'center', alignItems:'center',flexDirection:'row', width:'95%'}}
						onPress = {this.editB}	
						>
						<View style = {styles.button}>
							<FontAwesome name = 'plus-circle' size = {20} style = {{color: brown}}/>
	                		<Text style = {{fontWeight: 'bold', color: white}}>Save</Text>
	                	</View>
			        </TouchableOpacity>
		        </View>
	        </View>


		)
	}
}

const styles = StyleSheet.create({
	container: {
        padding: 30,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 10,
        backgroundColor: 'white',

    },
    container2: {

        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection: 'row',
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    textBeforeInput:{
        color: body,
        fontSize: 20,
    },
    inputS:{
        color: body,
        fontSize: 15,
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        marginTop: 10,
        width: '90%',
 	},
 	equivalent:{
 		color:'grey',
 		marginLeft: 15,
        paddingBottom:30,
 	},
 	button:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: brown,
        padding:9,
        borderRadius: 10,
        flexDirection:'row', 
        width:'100%',
    }
})


export default EditBudget