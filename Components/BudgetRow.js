import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import Swipeout from 'react-native-swipeout'
import {blue, white, grey} from '../utils/colors'

class BudgetRow extends Component{

	render(){
		const {budgets, bud, edit, del} = this.props
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {

            },
            onOpen: (secId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {
                        edit(bud)
                    },
                    text: 'Edit', type: 'edit'
                },
                {
                    onPress: () => {
                        del(bud)
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
        }
		return(
            <Swipeout {...swipeSettings}>
    			<View style = {styles.budgetContainer}>
    				<Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>{budgets[bud].name}</Text>
    				<Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>${budgets[bud].budget}</Text>
    				
    			</View>
            </Swipeout>
		)
	}
}

const styles = StyleSheet.create({
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
})

function mapStateToProps({budgets}, {bud}){
  return{
    budgets,
    bud
  }
}

export default connect(mapStateToProps)(BudgetRow)