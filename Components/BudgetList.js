import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Alert} from 'react-native'
import {connect} from 'react-redux'
import {brown, grey, white, body, button, background} from '../utils/colors'
import AddBudget from './AddBudget'
import SwipeRow from './SwipeRow'
import EditBudget from './EditBudget'
import {deleteBudget} from '../actions/budgets'
import {removeBudget, removeUserBudget} from '../utils/api'
import Modal from 'react-native-modal';
import {addBudget} from '../actions/budgets'
import {addUserBudget, deleteUserBudget} from '../actions/user'
import {saveBudget, saveUserBudget} from '../utils/api'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {db} from '../utils/api'

class BudgetList extends Component {
    state = {
        showAddBudget: false,
    } 

    add = ({name, budget, date}) => {
        const budgetInNumber = parseInt(budget)
        const bud = {name, budgetInNumber}
        const {dispatch} = this.props
        dispatch(addBudget(name, budgetInNumber, date))
        dispatch(addUserBudget(name))
        console.log("Add Budget")
        saveUserBudget(name)
        saveBudget(name, budgetInNumber, date)
        const addBudgetToF = async () => {
            console.log("DB HERE!!!!!!!!")
            await db.collection('budgets').add({
                chatName: name,
                budget: budgetInNumber,
                date: date
            })
            .then(()=>{
                this.setState(()=> ({
                    showAddBudget: false,
                }))
            })
            .catch((error) => alert(error))
        }
        addBudgetToF

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
                        dispatch(deleteUserBudget(bud))
                        dispatch(deleteBudget(bud))
                        console.log("HERE DE:L")
                        removeUserBudget(bud)
                        removeBudget(bud)
                    }

                },
            ]
        )
    }
	render(){
		const {user, budgets, budgetList} = this.props
        /*console.log("users", user)
        console.log("budgets", budgets)*/
		let budgetsSum = 0
        Object.keys(budgets).map((bud)=> {
            const budgetInNumber = parseInt(budgets[bud].budget)
            return(
            budgetsSum = budgetsSum+budgetInNumber
        )})
		

        return(
			<SafeAreaView style = {styles.container}>
                 <Modal 
                    isVisible={this.state.showAddBudget} 
                    transparent = {true}
                    onBackdropPress = {() => {this.setState({showAddBudget:false})}}
                >
                    <AddBudget
                        add = {this.add}
                    />
                </Modal>
                <View style = {{padding:5, width: '95%', height: '95%'}}>

    				<Text style = {styles.textBeforeInput}>
    					Monthly Income: ${user.salary}
    				</Text>
    				<Text style = {[styles.textBeforeInput]}>
    					Existing Budgets:
    				</Text>
                    <View style = {{alignItems:'center', justifyContent:'flex-start'}}>
                        <ScrollView style = {{width:'100%'}}>
                            <View style = {styles.swipeContainer}>
                				{budgetList.map((bud)=>(
                    					<SwipeRow removeItem = {bud} key = {bud} name = {budgets[bud].name} price = {budgets[bud].budget} edit = {this.edit} del = {this.delete}/>
                				))}
                            </View>
                            <Text style = {[styles.textBeforeInput, {marginTop: 15, width:'90%', marginTop:15}]}>
                                By following the above budget each month, you can save: ${user.salary-budgetsSum}
                            </Text>
                            <View style = {{marginTop: 15}}>
                                <TouchableOpacity
                                    onPress = {() => {this.setState({showAddBudget:true})}}
                                    style = {styles.button}
                                >
                                    <View style = {[styles.budgetContainer, {borderColor:grey, borderRadius:10, borderWidth: 0.8, backgroundColor:button}]}>
                                        <Text style = {[styles.textBeforeInput, {padding:10, color:body, fontWeight: 'bold', alignItems:'center', justifyContent:'center'}]}>Add a Budget</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
			</SafeAreaView>
			)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: body,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
        marginTop: 15,
        marginBottom: 15,
    },
    budgetContainer: {
    	width: '100%',
        backgroundColor: white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',
    },
    swipeContainer:{
        width:'100%',
        padding:5,
        alignItems: 'center',
        justifyContent:'center',

    },

    textBeforeInput:{
        color: body,
        fontSize: 15,
        
    },
    inputS:{
        color: body,
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