import React, {Component} from 'react'
import {View, Image, ScrollView, Text, TextInput, StyleSheet, Linking, Picker, TouchableOpacity, Platform, Alert} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, body, brown, darkBrown, button, background} from '../utils/colors'
import {formatDate, convertDate, convertMMMYY} from '../utils/helpers'
import {AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import {auth} from "../utils/firebase";
import {signOut } from "firebase/auth";
import {setAPIUser, setAPIBudget, setAPIEntries} from '../utils/api'
import {setUser} from '../actions/user'
import {receiveBudgets} from '../actions/budgets'
import {receiveEntries} from '../actions/entries'

class Profile extends Component {

	logout = () => {
		const {dispatch} = this.props
		Alert.alert(
            `Do you want to Logout?`,
            "",
            [
                {
                    text: 'No',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                      	signOut(auth).then(() => {
							const user = {
								uid: null,
								name: null,
								salary: 0,
							  email: null,
								budgets: [],
							  date: null
							}
							const budgets = {}
							const entries = {}
							dispatch(setUser(user))
				            setAPIUser(user)
				            dispatch(receiveBudgets(budgets))
				            setAPIBudget(budgets)
				            dispatch(receiveEntries(entries))
				            setAPIEntries(entries)
							console.log('logout successful')
							this.props.navigation.navigate('AuthLoad')
						}).catch((error) => {
							alert(error)
						})
                    }
                },
            ]
        )
		
	}

	render(){
		const {user, budgets, entries, budgetList} = this.props

		function totalBudget (){
			let totalBudget = 0
			if(budgetList === null){
				return 0
			}
			else{
				budgetList.map((bud)=>{
					totalBudget = parseInt(totalBudget) + parseInt(budgets[bud].budget)
				})
				return totalBudget
			}
		}

		function averageSpending (){
			console.log(entries)
			let totalSpent = 0
			if(Object.keys(entries).length == 0 ){
				return 0
			}
			else{
				Object.keys(entries).map((ent)=>{
					totalSpent = totalSpent + entries[ent].price
				})
				return Math.round(totalSpent/Object.keys(entries).length)
			}
		}

		function maxSpending (){
			let maxSpent = "N/A"
			let maxSpentAmount = 0
			if (Object.keys(entries).length == 0 ) {
				return maxSpent
			}
			else{
				budgetList.map((bud)=>{
					let thisSpentAmount = 0
					let entList = budgets[bud].entries
					entList.map((ent)=>{
						thisSpentAmount = thisSpentAmount + entries[ent].price
					})
					if (thisSpentAmount > maxSpentAmount){
						maxSpent = bud
						maxSpentAmount = thisSpentAmount
					}
				})
				return maxSpent
			}
		}

		return(
			<SafeAreaView style= {styles.container}>
				<View style = {{flex:1,width:'90%'}}>
					<View style = {styles.detailContainer}>
						<View style = {styles.avagarCircle}>
							<AntDesign name='smileo' size = {80} color= {brown} />
						</View>
						<View style = {{alignItems:'center', marginTop:-50}}>
							<Text style={styles.nameText}>
								{user.name}
							</Text>
							<Text style={styles.salaryText}>
								joined since {formatDate(user.date)}
							</Text>
						</View>
					</View>
					<View style = {{marginTop:20}}>
						<Text style={styles.nameText}>
							Demographics
						</Text>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Monthly Salary / Maximum Budget
							</Text>
							<Text style={styles.demoText}>
							${user.salary.toLocaleString()}
							</Text>
						</View>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Monthly Budget
							</Text>
							<Text style={styles.demoText}>
							${totalBudget().toLocaleString()}
							</Text>
						</View>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Expected Saving
							</Text>
							<Text style={styles.demoText}>
							${(user.salary-totalBudget()).toLocaleString()}
							</Text>
						</View>
					</View>
					<View style = {{marginTop:20}}>
						<Text style={styles.nameText}>
							Statistic
						</Text>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Number of Active Budgets
							</Text>
							<Text style={styles.demoText}>
							{Object.keys(budgetList).length}
							</Text>
						</View>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Number of Entries
							</Text>
							<Text style={styles.demoText}>
							{Object.keys(entries).length}
							</Text>
						</View>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Average Spending per Transaction
							</Text>
							<Text style={styles.demoText}>
							${averageSpending().toLocaleString()}
							</Text>
						</View>
						<View style = {styles.demoView}>
							<Text style={[styles.demoText, {color:'grey'}]}>
							Largest Portion of Spending
							</Text>
							<Text style={styles.demoText}>
							{maxSpending()}
							</Text>
						</View>
					</View>
					<View style= {{alignItems: 'flex-start', justifyContent:'flex-end'}}>
						<TouchableOpacity
							style = {{marginLeft: 5,paddingTop:30, borderRadius:10}}
							onPress = {() => Linking.openURL('mailto:jessiewlhai@gmail.com?subject=Feedback on Budget App') }
						>
							<Text 
							style = {{color: brown}}>
							Send us Feedback
							</Text>
						</TouchableOpacity>
					</View>
					<View style= {{alignItems: 'flex-start', justifyContent:'flex-end'}}>
						<TouchableOpacity
							style = {{marginLeft: 5,paddingTop:30, borderRadius:10}}
							onPress = {() => this.logout()}
						>
							<Text 
							style = {{color: brown}}>
							Logout
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: background,
    },

    detailContainer: {
        marginLeft: 5,
        marginRight: 5,
        borderColor:grey,
        borderRadius:10,
        borderWidth:2,
        padding:8,
        borderRadius:10,
        alignItems: 'center',
        backgroundColor:grey,
        marginTop:60
    },
    avagarCircle:{
    	borderRadius:60,
    	/*borderWidth:2,*/
    	top:-60,
    	borderColor:brown,
    	alignItems:'center',
    	backgroundColor:white
    },
    avagar: {
    	height:120,
    	width:120,

    },
  	budContainer: {
      flex:1,
      flexDirection: 'row',
      justifyContent: "space-between",
      flexWrap: "wrap"
  	},
  	nameText:{
        color: body,
        fontSize: 17,
        padding: 5,
        textTransform: 'capitalize',
        fontWeight: 'bold'
  	},
  	salaryText:{
        color: body,
        fontSize: 13,
        padding: 5,
  	},
  	demoView:{
  		flexDirection:'row', 
  		justifyContent:'space-between',
  		marginTop:5,
  	},
  	demoText:{
        color: body,
        fontSize: 13,
        padding: 5,
  	},
})

function mapStateToProps({user, budgets, entries}){
  return{
    user,
    budgets,
    entries,
    budgetList: user.budgets
        .sort((a,b)=>budgets[b].name.toLowerCase() < budgets[a].name.toLowerCase())
  }
}

export default connect(mapStateToProps)(Profile)