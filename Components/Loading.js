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
		
	    const {dispatch} = this.props
	    dispatch(handleInitialData())
	    .then(()=>this.setState(()=> ({loading:false})))

    }

    componentDidUpdate(){

	    if (this.state.loading === false){
	    	console.log(this.state.loading)
	    	if (this.props.user.name === null) {
    		this.props.navigation.navigate('Signin')
	    	}
	    	else{
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