import React, {Component, UseEffect} from 'react'
import {View, ScrollView, Text, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, Picker, TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown, darkBrown} from '../utils/colors'
import {AntDesign, Ionicons } from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {setUser} from '../actions/user'
import PropTypes from 'prop-types';
import {saveUser} from '../utils/api'
import SignUp from './SignUp'
import SignIn from './SignIn'
/*import firebase from 'firebase'
import {auth, addUserToFB, getUserFrFB} from '../utils/api'
import { getAuth, updateProfile } from "firebase/auth";*/

class Welcome extends Component {
    state = {
        login: false,

    }

    onSignUp = ({name, salaryM, email, password}) => {
        console.log( name)
        const salary = parseInt(salaryM)
        const user = {name, salary, email, password, budgets:[], date: Date.now()}

        const {dispatch} = this.props
        if(user.name === "" || user.salaryM === "" || user.email === ""|| user.password === ""){
            alert('You have not complete all information')
        }
        else{
            dispatch(setUser(
                user
            ))
            saveUser(user)
            this.props.navigation.navigate('AuthLoad')
            /*
            auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {

                authUser.user.updateProfile({
                    displayName: name,
                    phoneNumber: salary,
                    photoURL:'../assets/6.png'
                })
                .then(()=> {
                    addUserToFB(user)
                    console.log(authUser)
                    dispatch(setUser(
                        user
                    ))
                    saveUser(user)
                    this.props.navigation.navigate('AuthLoad')
                })
                
            })
            .catch((error) => {
                alert(error.message)
            })
            */

        }
        
    }
/*
    onSignIn = ({email, password}) => {
        console.log(email, password)
        const {dispatch, user} = this.props
        /*
        auth.signInWithEmailAndPassword(email, password)
            .then((authUser) => {
                console.log("ONsignIn", authUser)
                getUserFrFB()
             
                const user = {
                    name: authUser.user.displayName,
                    salary: 0,
                    email: authUser.user.email,
                    photoURL: authUser.user.photoURL,
                    budgets: []

                }
                dispatch(setUser(
                    user
                ))
                saveUser(user)
                console.log("LOGIN", user)
                this.props.navigation.navigate('AuthLoad')
            })
            .catch((error) => {
                alert(error)
            })
            
        const user = {name, salary, email, password, yearEnd, budgets:[]}
        
        console.log(user)
        
        if(user.name === "" || user.salaryM === "" || user.email === ""|| user.password === ""){
            alert('You have not complete all information')
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
                dispatch(setUser(
                    user
                ))
                saveUser(user)
                this.props.navigation.navigate('Main')
            })
            .catch((error) => {
                alert(error)
            })
            

        }
    }      
*/

    chg = () => {
        const {login} = this.state
        this.setState(() => ({login: !login}))
    }


    render() {
        console.log("Welcome", this.state.login)
        const {name, salaryM, email, password, yearEnd, login} = this.state
            return (
                <KeyboardAvoidingView behavior = {Platform.OS == "ios" ? "padding" : "height"}  enabled = "true" style = {styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{width: '80%', height: '100%', alignItems:'center', justifyContent:'center'}}>
                        
                            <View style = {styles.secondContainer}>
                                <Text style = {styles.title}>
                                    Welcome to Budget!
                                </Text>
                                <AntDesign name='Safety' size = {100} color= {brown} />
                            </View>
                            {login 
                                ? this.props.navigation.navigate('Main')
                                /*<SignIn next = {this.onSignIn} chg = {this.chg}/>*/
                                : <SignUp next = {this.onSignUp} chg = {this.chg}/>
                            }
                        
                    </View>
                    </TouchableWithoutFeedback>
                    <View style = {{height:100}}/>

                </KeyboardAvoidingView>
            )
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '95%',
        height: '80%',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        alignItems: 'center',
        justifyContent:'flex-end',
    },
    scrollContainer: {
        flex: 20,
        width: '100%',
        height: '100%',


    },
    secondContainer: {
        alignItems: 'center',
        justifyContent:'center',
        width:'100%',

    },
    thirdContainer: {
        marginTop: 30,
        width:'95%',
    },
    title:{
        color: body,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginTop: 15,
        marginBottom: 15,
    },
    inputContainer: {
        marginTop: 30,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems:'center'
    },
    textBeforeInput:{
        color: body,
        fontSize: 15,
        marginLeft: 15,
    },
    inputS:{
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


export default connect()(Welcome)