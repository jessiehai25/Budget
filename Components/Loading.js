import React, {Component} from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import {connect} from 'react-redux'
import {blue, grey, white, body, brown} from '../utils/colors'
import {handleInitialData} from '../actions/'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

class Loading extends Component {
	state = {
		loading: true
	}
	componentDidMount(){
		console.log("TEST")
	    const {dispatch} = this.props
	    dispatch(handleInitialData())
	    .then(()=>this.setState(()=> ({loading:false})))

    }

    componentDidUpdate(){
    	console.log("Test2")

	    console.log("Loading", this.props.entries)
	    if (this.state.loading === false){
	    	console.log(this.state.loading)
	    	if (this.props.user.name === null) {
    		console.log("signin", this.props.user.name)
    		this.props.navigation.navigate('Signin')
	    	}
	    	else{
	    		console.log("Main", this.props.user.name)
	    		this.props.navigation.navigate('Main')
	    	}
	    }
	    
    }


  render() {
  	return(
	        <SafeAreaView style={{flex:1}}>

	          <Text>
	          	Loading
	          </Text>
	        </SafeAreaView>
	)
  }
}

function mapStateToProps({user, budgets, entries}){
	return{
	    user,
	    budgets,
	    entries,
	}
}

export default connect(mapStateToProps)(Loading)