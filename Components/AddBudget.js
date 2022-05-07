import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, background, brown, inputOutline} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'
import BouncyCheckbox from "react-native-bouncy-checkbox";

class AddBudget extends Component {
	state = {
		name:'',
		budget:'',
        date: Date.now(),
        rollOver: false,
        nameFocus:inputOutline,
        budgetFocus:inputOutline
    }

    addB = () => {
    	const {name, budget, date, rollOver} = this.state
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
            	add({name, budget, date, rollOver})
            	this.setState(()=>({
                    name: '',
                    budget: ''
                }))
            }
    	}
	}

    onFocusName() {
        this.setState({
            nameFocus: brown
        })
    }
    onBlurName() {
        this.setState({
          nameFocus: inputOutline
        })
    }

    onFocusBudget() {
        this.setState({
            budgetFocus: brown
        })
    }
    onBlurBudget() {
        this.setState({
          budgetFocus: inputOutline
        })
    }
 
	render(){
		const {name, budget, date, rollOver, budgetFocus, nameFocus} = this.state
		return(
			<View style = {styles.container}>
				
				<View style = {styles.inputContainer}>
	                <TextInput
	                    onChangeText = {(name) => this.setState(() => ({name: name, budgetFocus:false, nameFocus:true}))}
	                    placeholder = 'New Category (e.g. Food)'
	                    style = {[styles.inputS, {borderColor:this.state.nameFocus}]}
	                    value = {name}
                        onFocus={ () => this.onFocusName() }
                        onBlur={ () => this.onBlurName() }
	                >
	                </TextInput>
	                <TextInput
	                    onChangeText = {(budget) => this.setState(() => ({budget: budget, budgetFocus:true, nameFocus:false}))}
	                    placeholder = 'Budget for month (e.g. 5000)'
	                    style = {[styles.inputS, {borderColor:this.state.budgetFocus}]}
	                    value = {isNaN(budget.toString())?0 :budget.toString()}
                        keyboardType={'numeric'}
                        onFocus={ () => this.onFocusBudget() }
                        onBlur={ () => this.onBlurBudget() }
	                >
	                </TextInput>
	                <Text style = {[styles.text,styles.equivalent, {paddingBottom:10}]}>
	                	equivalent to around ${Math.round(budget/30)} per day
	                </Text>
				</View>
				<View style = {{alignItems:'center'}}>
                    {/*
                    <View style = {{width:'100%', borderRadius:10, }}>
                        <BouncyCheckbox
                            style= {{padding:5}}
                            size={20}
                            fillColor={brown}
                            unfillColor="#FFFFFF"
                            text={`rollover budget`}
                            iconStyle={{ borderColor: brown }}
                            textStyle={{color:body, fontSize: 15, textDecorationLine: "none"}}
                            onPress={(rollOver: boolean) => this.setState(() => ({rollOver: rollOver}))}
                        />
                        <Text style = {{color:body, fontSize: 11, marginLeft:42}}>remaining budget of previous month will roll over to next month</Text>
                    </View>
                    */}
                    <View style = {{padding:10}}/>
					<TouchableOpacity 
						style = {{justifyContent:'center', alignItems:'center',flexDirection:'row', width:'95%'}}
						onPress = {this.addB}
					>
                        <View style={styles.button}>
    		                <FontAwesome name = 'plus-circle' size = {20} style = {{color: white}}/>
                            <Text style = {[styles.text, {fontWeight: 'bold', color: white}]}> Save</Text>
                        </View>
		            </TouchableOpacity>
	            </View>
	        </View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:white,
        borderRadius:10,
        padding:30,
    },
    text:{
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto', 
      color:body
    },
    inputContainer: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    inputS:{
        color: body,
        fontSize: 15,
        borderColor: inputOutline,
        borderRadius: 5,
        borderWidth: 1,

        padding: 10,
        marginTop: 10,
        width: '100%',
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