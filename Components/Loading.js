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
		console.log("LOading page", this.props.user)
		const {dispatch, user} = this.props
		/*setTimeout(() => {*/
		dispatch(handleInitialData())
		.then(()=>{
			this.setState(()=> ({loading:false}))
		})
	/*},2000)*/
	}
    componentDidUpdate(){
	    if (this.state.loading === false){
	    	if (this.props.user.name === null) {
    			this.props.navigation.navigate('Landing')
	    	}
	    	else{
	    		this.props.navigation.navigate('Main')
	    	}
	    }	    
    }

  render() {
  	console.log("LOADING")
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

function mapStateToProps({user}){
	return{
	    user,
	}
}

export default connect(mapStateToProps)(Loading)