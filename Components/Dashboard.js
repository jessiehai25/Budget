import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, body} from '../utils/colors'
import {handleInitialData} from '../actions/'
import DateHeader from './DateHeader'
import Chart from './Chart'
import Welcome from './Welcome'

class Dashboard extends Component {
  static navigationOptions = {
    title: 'Home',
    /* No more header config here! */
  };
	render() {
		const {budgets, entries} = this.props
    console.log("load Dashboard now!!", budgets)
		const {name, salary} = this.props.user
		const budgetList = this.props.user.budgets
		if(budgetList === null){
        	return(
        		<Text>
        		 You have not input any budget yet!
        		</Text>
        	)
	    }
	    else{
			return(
				<View style = {styles.container}>
		            {/*<Text style = {styles.title}>{`Welcome, ${name}`}</Text>*/}
		            <View style = {{marginTop:20}}>
		           	 	<DateHeader month = {new Date().getMonth()} year = {new Date().getFullYear()}/>
		            </View>
		            <View style = {styles.secondContainer}>

		            	{budgetList.map((bud)=>{
			            	const ents = budgets[bud].entries
			            	const total = budgets[bud].budget
			            	let spent = 0
			            	ents.map((entry)=>{
			            		return(
		            			spent = spent + entries[entry].price
		            		)})
			            	return(
			            		<View style = {styles.detailContainer} key = {bud}>
			            			<View style = {styles.budContainer}>
				            			<View style = {styles.budTextContainer}>

							            	<Text style = {styles.budText}>
							            		{bud}
							            	</Text>
						            	</View>
						            	<View>
							            	<Text style = {styles.budText}>
							            	
													{total - spent}/{budgets[bud].budget}
											</Text>
										</View>
									</View>
					            	
					            	<Chart spent = {spent} total = {total}/>
				            	</View>
			            	)
		            	
		            	})}
		            </View>
		        </View>
		    )
		}

	}
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
   secondContainer: {
        marginTop: 30,
        marginBottom: 30,
        width: '95%',
    	height:'95%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    detailContainer: {

        marginTop: 10,
        marginBottom: 10,
    },


  	budContainer: {
  		flexDirection: 'row',

  	},
  	budTextContainer: {
  		textAlign: 'left',
  		flex: 1,
  	},
  	budText:{
        color: body,
        fontSize: 15,
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        width: '90%',
  	},
})

function mapStateToProps({user, budgets, entries}){
  return{
    user,
    budgets,
    entries,
  }
}

export default connect(mapStateToProps)(Dashboard)