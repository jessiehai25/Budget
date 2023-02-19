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
		const {dispatch, user} = this.props
		/*setTimeout(() => {*/
			
		dispatch(handleInitialData())

		.then(()=>{
			this.setState(()=> ({loading:false}))
			
			
		}) 
		
	/*},2000)*/
	}

  render() {
	    if (this.state.loading === false){
			if (this.props.user.name === null ) {
				setTimeout(() => {
					this.props.navigation.navigate('Landing') //Welcome
				},1000)
			}
			else{

				setTimeout(() => {
					this.props.navigation.navigate('Main') //MyTabs
				},2000)
			}
	    }  
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