import React, {Component, useEffect} from 'react'
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
		console.log("LOading page", this.props)
		const {dispatch, user} = this.props
		if(!user){
				dispatch(handleInitialData())
	    		.then(()=>
				this.setState(() => ({
					loading: false,
					loggedIn: false
				})))
		}else{
			dispatch(handleInitialData())
    			.then(()=>
					this.setState(() => ({
						loading: false,
						loggedIn: true
				})))
		}
		
	    {/*const {dispatch} = this.props
	    dispatch(handleInitialData())
	    .then(()=>this.setState(()=> ({loading:false})))*/}

    }

    componentDidUpdate(){

	    if (this.state.loading === false){
	    	console.log(this.state.loading)
	    	if (this.state.loggedIn === false) {
	    		console.log("LOADING1", this.props.budgets)
    			this.props.navigation.navigate('Landing')
	    	}
	    	else{
	    		console.log("LOADING2", this.props.budgets)
	    		this.props.navigation.navigate('Main')
	    	}
	    }
	    
    }


  render() {
  	return(
	        <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>

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