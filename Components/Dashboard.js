import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white} from '../utils/colors'
import {months} from '../utils/helpers'
import {handleInitialData} from '../actions/'
import DateHeader from './DateHeader'

class Dashboard extends Component {
	state = {
		loading: true
	}
	componentDidMount(){
	    const {dispatch} = this.props
	    dispatch(handleInitialData())
	    .then(()=>this.setState(()=> ({loading:false})))
    }
	render() {
		const {loading} = this.state
		
		if(loading === true){
			return(
				<Text>
				Loading
				</Text>
			)
		}
		else{
			const {budgets} = this.props
			const x = this.props.budgets["transport"]
			console.log(budgets)
			const {name, salary} = this.props.user
			const budgetList = this.props.user.budgets
			return(
				<View style = {styles.container}>
		            <Text style = {styles.title}>{`Welcome, ${name}`}</Text>
		            <DateHeader date = {(new Date()).toDateString()}/>
		            {budgetList.map((bud)=>(
		            	<Text style = {styles.inputS} key={bud}>
		            		{bud}
		            		{console.log(bud)}
							{budgets["transport"].budget}		            		
		            	</Text>
		            ))}
		        </View>
		    )
		}
	 }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    title:{
        color: blue,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
        marginTop: 15,
        marginBottom: 15,
    },
    inputContainer: {
        marginTop: 30,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start'
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
  }
}

export default connect(mapStateToProps)(Dashboard)