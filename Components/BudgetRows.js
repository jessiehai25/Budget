import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {blue} from '../utils/colors'
import {Feather, AntDesign} from '@expo/vector-icons'

class BudgetRows extends Component{
	render(){
		const {budgets, bud} = this.props
		return(


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
		)
	}
}

const styles = StyleSheet.create({
    textBeforeInput:{
        color: blue,
        fontSize: 20,
        marginLeft: 15,
    },
})

function mapStateToProps({budgets}, {bud}){
  return{
    budgets,
    bud
  }
}

export default connect(mapStateToProps)(BudgetRows)