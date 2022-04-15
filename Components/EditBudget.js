import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown, inputOutline} from '../utils/colors'
import {FontAwesome} from '@expo/vector-icons'
import BouncyCheckbox from "react-native-bouncy-checkbox";

class EditBudget extends Component {
	state = {
		name:'',
		budget:0,
		rollOver:false,
		nameFocus:inputOutline,
        budgetFocus:inputOutline
	}
	componentDidMount(){
	    const {bud, budgets} = this.props
	    console.log("EditBudget1", budgets, "bud", bud)
	    const budget = budgets[bud.x].budget
	    const rollOver = budgets[bud.x].rollOver
	    this.setState(()=> ({
            name: bud.x,
            budget: budget,
            rollOver: rollOver
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
		const {budgets} = this.props
		const {name, budget, rollOver} = this.state
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
	                <Text style = {styles.equivalent}>
	                	equivalent to around ${Math.round(budget/30)} per day
	                </Text>
				</View>

		        <View style = {{alignItems:'center'}}>
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
                    <View style = {{padding:10}}/>
			        <TouchableOpacity 
						style = {{justifyContent:'center', alignItems:'center',flexDirection:'row', width:'95%'}}
						onPress = {this.editB}	
						>
						<View style = {styles.button}>
							<FontAwesome name = 'plus-circle' size = {20} style = {{color: white}}/>
	                		<Text style = {{fontWeight: 'bold', color: white}}> Save</Text>
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
    inputS:{
        color: body,
        fontSize: 15,
        borderColor: inputOutline,
        borderRadius: 5,
        borderWidth: 0.5,

        padding: 5,
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


export default EditBudget