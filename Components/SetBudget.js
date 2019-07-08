import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/'
import {blue, grey, white, darkBlue} from '../utils/colors'
import AddBudget from './AddBudget'
import {Feather, AntDesign} from '@expo/vector-icons'


class SetBudget extends Component {


	render(){
		const {user, budgets} = this.props
        console.log(user)
        console.log(budgets)
		let budgetsSum = 0
        Object.keys(budgets).map((bud)=> {
            const budgetInNumber = parseInt(budgets[bud].budget)
            return(
            budgetsSum = budgetsSum+budgetInNumber
        )})
		console.log(budgetsSum)
        return(
			<View style = {styles.container}>
				<Text style = {[styles.textBeforeInput, {width:'90%',marginLeft: 15, marginTop:15}]}>
					Yearly Income: ${user.salary*12}
				</Text>
				<Text style = {[styles.textBeforeInput, {width:'90%',marginLeft: 15, marginTop:15}]}>
					Existing Budgets:
				</Text>
				{Object.keys(budgets).map((bud)=>(
					<View key = {budgets[bud].name} style = {styles.budgetContainer}>
						<Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>{budgets[bud].name}</Text>
						<Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>${budgets[bud].budget}</Text>
						<TouchableOpacity>
							<Feather name = 'edit' size = {25} style = {{color: blue, flex: 1, marginRight: 5}}/>
						</TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name = 'delete' size = {25} style = {{color: blue, flex: 1, marginRight: 5}}/>
                        </TouchableOpacity>
					</View>
				))}
                <Text style = {[styles.textBeforeInput, {width:'90%',marginLeft: 15, marginTop:15}]}>
                    You can save:
                </Text>
                <View style = {styles.budgetContainer}>
                    <Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>Saving</Text>
                    <Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>${user.salary*12-budgetsSum}</Text>
                    <Feather name = 'thumbs-up' size = {30} style = {{color: blue, flex: 1, marginRight: 5}}/>
                </View>
				<AddBudget addBudget = {this.addBudget}/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    title:{
        color: blue,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
        marginTop: 15,
        marginBottom: 15,
    },
    budgetContainer: {
    	width: '95%',
        backgroundColor: white,
        marginLeft: 10,
        marginRight: 10,
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
        width: '90%',
  },
})


function mapStateToProps({user, budgets}){
  return{
    user,
    budgets
  }
}

export default connect(mapStateToProps)(SetBudget)