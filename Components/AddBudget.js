import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, background} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'
 

class AddBudget extends Component {
	state = {
		name:'',
		budget:'',
        date: Date.now(),
    }

    addB = () => {
    	const {name, budget, date} = this.state
    	const {add} = this.props
    	if (name === '' || budget===''){
            alert('You have not complete')
        }
        else{
        	add({name, budget, date})
        	this.setState(()=>({
                name: '',
                budget: ''
            }))
    	}
	}
    


	render(){
		const {name, budget, date} = this.state

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
				<View style={{alignItems:'center', marginTop:10}}>
					<TouchableOpacity 
						style = {{justifyContent:'center', alignItems:'center',flexDirection:'row'}}
						onPress = {this.addB}
					>
		                <FontAwesome name = 'plus-circle' size = {20} style = {{color: blue}}/>
                        <Text style = {{fontSize:15, color: body}}>  Save</Text>
		            </TouchableOpacity>
	            </View>
	        </View>

		)
	}
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'column',
        borderRadius: 10,
        backgroundColor: 'white',

    },
    inputContainer: {
        flexDirection: 'column',
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
 		color:grey,
 		marginLeft: 15,
 	}
})


export default AddBudget