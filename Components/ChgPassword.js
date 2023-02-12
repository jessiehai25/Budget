import React, {Component} from 'react'
import {View, Image, ScrollView, Text, TextInput, StyleSheet, Linking, Picker, TouchableOpacity, Platform, Alert, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, body, brown, darkBrown, button, background, lightYellow} from '../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import {changePassword} from '../actions/user'
import {chgPassword} from '../utils/firebase'

class ChgPassword extends Component {
	state = {
		currentPassword: '',
		newPassword: false,
		newPassword2: false,
		error1:'',
		error2:'',
    }
    componentDidMount(){
        const {user} = this.props
        this.setState(()=> ({
            originalPassword:user.password,
        }))
    }

    back = () => {
    	const {currentPassword, newPassword, newPassword2} = this.state
    	if (currentPassword == '' && newPassword == '' && newPassword2 == ''){
    		this.props.navigation.navigate('Profile')
    	}
    	else{
    		Alert.alert(
            `Do you leave this page without save?`,
            "",
            [
                {
                    text: 'No',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {this.props.navigation.navigate('Profile')}
                },
            ]
        	)
    	}
    }
    change = () => {
    	const {originalPassword, currentPassword,newPassword,newPassword2} = this.state
    	const {user, dispatch} = this.props
    	console.log(originalPassword, currentPassword,newPassword,newPassword2)
    	if (originalPassword !== currentPassword){
    		this.setState(()=> ({
            error1:true,
	        }))
	    	if (newPassword !== newPassword2){
	    		this.setState(()=> ({
	            error2:true,
	        	}))
	    	}
    	}
    	else if (newPassword !== newPassword2){
    		this.setState(()=> ({
            error2:true,
        	}))
    	}
    	else {
    		dispatch(changePassword(newPassword))
    		chgPassword(user.email,currentPassword,newPassword)
    		this.props.navigation.navigate('Profile')
    		
    	}
    }

	render(){
		console.log(this.state)
		const {user} = this.props
		const {currentPassword,newPassword, newPassword2, error1, error2} = this.state
		return(
			<SafeAreaView style = {styles.container}>
				<View style = {{flex:1,width:'90%'}}>
					<TouchableOpacity
						onPress = {()=>this.back()}>
						<AntDesign name="arrowleft" size={24} color="black" />
					</TouchableOpacity>
					<View style = {{marginTop:20}}>
						<Text style = {styles.nameText}>
						Change Password
						</Text>
					</View>
					<View style = {{marginTop:20}}>
						<View  style = {styles.inputView}>
							<Text style = {{color:'grey', fontWeight: 'bold'}}>
								Current Password
							</Text>
						</View>
						<View >
							<TextInput
	                            onChangeText = {(currentPassword) => this.setState(() => ({currentPassword: currentPassword, error1:false}))}
	                      
	                            secureTextEntry = {true}
	                            value = {currentPassword}
	                            style = {styles.inputS}
	                        >
	                        </TextInput>
	                        <Text style = {{color: error1?'red':'white', fontSize:12}}>
	                        	Incorrect Password
	                        </Text>

						</View>
						<View style = {{marginTop:15}}>
							<Text style = {styles.inputView}>
								New Password
							</Text>
						</View>
						<View>
							<TextInput
	                            onChangeText = {(newPassword) => this.setState(() => ({newPassword: newPassword, error2:false}))}
	                         
	                            secureTextEntry = {true}
	                            value = {newPassword}
	                            style = {styles.inputS}
	                        >
	                        </TextInput>
						</View>
						<View style = {{marginTop:15}}>
							<Text style = {styles.inputView}>
								Confirm New Password
							</Text>
						</View>
						<View>
							<TextInput
	                            onChangeText = {(newPassword2) => this.setState(() => ({newPassword2: newPassword2, error2:false}))}
	                            
	                            secureTextEntry = {true}
	                            value = {newPassword2}
	                            style = {styles.inputS}
	                        >
	                        </TextInput>
	                        <Text style = {{color: error2?'red':'white', fontSize:12}}>
	                        Password does not match
	                        </Text>
						</View>
					</View>
					<View style = {{marginTop:20}}>
						<TouchableOpacity
							style = {styles.button}
							onPress = {()=>this.change()}
						>
							<Text>
								Save
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
    nameText:{
        color: brown,
        fontSize: 20,
        textTransform: 'capitalize',
        fontWeight: 'bold'
  	},
  	inputS:{
        color: body,
        fontSize: 20,
        borderBottomColor: grey,
        borderBottomWidth: 2,
  },
  	inputView:{
  		color:'grey', 
  		fontWeight: 'bold',
  		marginTop:10,
  		marginBottom:10,
  	},
  	button:{
  		alignItems:'center', 
  		backgroundColor:brown, 
  		padding:10,
  		borderRadius:5,
  	},
})

function mapStateToProps({user}){
  return{
    user
  }
}

export default connect(mapStateToProps)(ChgPassword)