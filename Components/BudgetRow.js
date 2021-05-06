import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import Swipeout from 'react-native-swipeout'
import {blue, white, grey, body} from '../utils/colors'

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
            <Swipeout {...swipeSettings} style = {styles.swipeRow}>
    			<View style = {styles.budgetContainer}>
    				<Text style = {[styles.textBeforeInput, {flex:3, padding:10, }]}>{budgets[bud].name}</Text>
    				<Text style = {[styles.textBeforeInput, {flex:1, padding:10, }]}>${budgets[bud].budget}</Text>
    				
    			</View>
            </Swipeout>
		)
	}
}

const styles = StyleSheet.create({
    budgetContainer: {
        width: '95%',
        backgroundColor: white,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection: 'row',
        borderBottomColor: grey,
        borderBottomWidth: 0.1,
        borderRadius: Platform.OS === 'ios' ? 2 : 2,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },

        
    },
    textBeforeInput:{
        color: body,
        fontSize: 15,
        marginLeft: 15,
    },
    swipeRow:{
        padding: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent:'center',
       
    }
})

function mapStateToProps({budgets}, {bud}){
  return{
    budgets,
    bud
  }
}

export default connect(mapStateToProps)(BudgetRow)