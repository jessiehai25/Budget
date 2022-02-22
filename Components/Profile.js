import React, {Component} from 'react'
import {View, Image, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform, Alert} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, body, brown, darkBrown, button, background} from '../utils/colors'
import {formatDate, convertDate, convertMMMYY} from '../utils/helpers'
import {CalendarList} from 'react-native-calendars';
import {AntDesign, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
 

class Profile extends Component {



	render(){
		const {user, budgets, entries, budgetList} = this.props

		function totalBudget (){
			let totalBudget = 0
			if(budgetList === null){
				return 0
			}
			else{
				budgetList.map((bud)=>{
					totalBudget = totalBudget + budgets[bud].budget
				})
				return totalBudget
			}
		}

		function averageSpending (){
			let totalSpent = 0
			if(entries === null){
				return 0
			}
			else{
				Object.keys(entries).map((ent)=>{
					totalSpent = totalSpent + entries[ent].price
				})
				return Math.round(totalSpent/Object.keys(entries).length)
			}
		}

		return(
			<SafeAreaView style= {styles.container}>
				<View style = {{flex:1,width:'90%'}}>
					<View style = {styles.detailContainer}>
						<View style = {styles.avagarCircle}>
							<AntDesign name='Safety' size = {100} color= {brown} />
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
							Average Spending
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
							Clothes
							</Text>
						</View>
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