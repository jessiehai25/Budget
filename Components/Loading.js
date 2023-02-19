import React, {Component, useEffect} from 'react'
import { StyleSheet, Image, Text, View, StatusBar, Platform } from 'react-native';
import {connect} from 'react-redux'
import {blue, grey, white, body, brown} from '../utils/colors'
import {handleInitialData} from '../actions/'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

class Loading extends Component {
	state = {
		loading: true
	}
	componentDidMount(){
		console.log("1.m. LOading mount", this.props.user, this.props.budgets)
		const {dispatch, user} = this.props
		/*setTimeout(() => {*/
			
		dispatch(handleInitialData())

		.then(()=>{
			console.log("3.m. Loading's componentDidMount")
			
			this.setState(()=> ({loading:false}))
			
			
		}) 
		
	/*},2000)*/
	}

  render() {
  	console.log("update", this.state.loading, this.props.user)
	    if (this.state.loading === false){
			if (this.props.user.name === null ) {
				console.log("Welcome component")
				setTimeout(() => {
					this.props.navigation.navigate('Landing') //Welcome
				},1000)
			}
			else{
				console.log("Tab", this.props.navigation)
				setTimeout(() => {
					this.props.navigation.navigate('Main') //MyTabs
				},2000)
			}
	    }  
  	console.log("11. LOading user", this.props.user, this.props.budgets, this.props.entries)
  	return(
	        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
	        	<Image
			        source={require('../assets/icon.png')}
			        style={{width: 50, height:50}}
			      />
	        </SafeAreaView>
	)
  }
}

function mapStateToProps({user, budgets=[], entries}){
	return{
	    user,
	    budgets,
	    entries
	}
}

export default connect(mapStateToProps)(Loading)