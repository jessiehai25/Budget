import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Alert} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, darkBlue} from '../utils/colors'
import AddBudget from './AddBudget'
import BudgetRow from './BudgetRow'
import EditBudget from './EditBudget'
import {deleteBudget} from '../actions/budgets'
import {removeBudget} from '../utils/api'


class BudgetList extends Component {

    add = () =>{
        this.props.navigation.navigate('AddBudget')
    }

    edit = (bud)=>{
        this.props.navigation.navigate('EditBudget', {bud: bud})
    }

    delete = (bud) => {
        const {dispatch} = this.props
        Alert.alert(
            `Are you sure to delete ${bud}?`,
            "",
            [
                
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        console.log('delete', bud)
                        dispatch(deleteBudget(bud))
                        removeBudget(bud)
                    }

                },
            ]
        )
    }
	render(){
		const {user, budgets, budgetList} = this.props
        console.log(budgetList)
		let budgetsSum = 0
        Object.keys(budgets).map((bud)=> {
            const budgetInNumber = parseInt(budgets[bud].budget)
            return(
            budgetsSum = budgetsSum+budgetInNumber
        )})
		

        return(
			<View style = {styles.container}>
				<Text style = {[styles.textBeforeInput, {width:'90%',marginLeft: 15, marginTop:15}]}>
					Yearly Income: ${user.salary*12}
				</Text>
				<Text style = {[styles.textBeforeInput, {width:'90%',marginLeft: 15, marginTop:15}]}>
					Existing Budgets:
				</Text>
				{budgetList.map((bud)=>(
    					<BudgetRow bud = {bud} key = {budgets[bud].name} edit = {this.edit} del = {this.delete}/>
				))}
                <Text style = {[styles.textBeforeInput, {width:'90%',marginLeft: 15, marginTop:15}]}>
                    You can save:
                </Text>
                <View style = {styles.budgetContainer}>
                    <Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>Saving</Text>
                    <Text style = {[styles.textBeforeInput, {flex:1, padding:10}]}>${user.salary*12-budgetsSum}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress = {() => this.add()}
                    >
                        <View style = {[styles.budgetContainer,{backgroundColor:blue}]}>
                            <Text style = {[styles.textBeforeInput, {flex:1, padding:10, color:white}]}>Add a Budget</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
    budgets,
    budgetList: Object.keys(budgets)
        .sort((a,b)=>budgets[b].name.toLowerCase() < budgets[a].name.toLowerCase())
  }
}

export default connect(mapStateToProps)(BudgetList)