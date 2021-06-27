import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, background, brown} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'
 

class AddBudget extends Component {
	state = {
		name:'',
		budget:'',
        date: Date.now(),
    }

    addB = () => {
    	const {name, budget, date} = this.state
        const {budgetList} = this.props
    	const {add} = this.props
        let duplicate = false
    	if (name === '' || budget===''){
            alert('You have not complete')
        }
        else{
            budgetList.map((bud)=>{
                if (bud.toLowerCase() === name.toLowerCase()) {
                    duplicate = true
                    alert('This budget exists. Please use another name.')
                }
            })
            if(duplicate=== false){
            	add({name, budget, date})
            	this.setState(()=>({
                    name: '',
                    budget: ''
                }))
            }
    	}
	}
    


	render(){
		const {name, budget, date} = this.state

		return(
			<View style = {styles.container}>
				
				<View style = {styles.inputContainer}>
	                <TextInput
	                    onChangeText = {(name) => this.setState(() => ({name: name}))}
	                    placeholder = 'New Category (e.g. Food)'
	                    style = {styles.inputS}
	                    value = {name}
	                >
	                </TextInput>
	                <TextInput
	                    onChangeText = {(budget) => this.setState(() => ({budget: budget}))}
	                    placeholder = 'Budget for month (e.g. 5000)'
	                    style = {styles.inputS}
	                    value = {budget}
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
						onPress = {this.addB}
					>
                        <View style={styles.button}>
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


export default AddBudget