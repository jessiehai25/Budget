import React, {Component, UseEffect} from 'react'
import {View, ScrollView, Text, TextInput, Keyboard, TouchableWithoutFeedback, StyleSheet, Picker, TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown, darkBrown} from '../utils/colors'
import {AntDesign, Ionicons } from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {setUser} from '../actions/user'
import {receiveBudgets} from '../actions/budgets'
import {receiveEntries} from '../actions/entries'
import PropTypes from 'prop-types';
import {setAPIUser, setAPIBudget, setAPIEntries} from '../utils/api'
import SignUp from './SignUp'
import SignIn from './SignIn'
import {auth, storeUser, dbRef} from "../utils/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

class Welcome extends Component {
    state = {
        login: false,
        budgetExist: false,
        gestureName: '',
    }

    onSignUp = ({name, salaryM, email, password}) => {
        const salary = parseInt(salaryM)
        const user = {name, salary, email, password, budgets:[], date: Date.now()}

        const {dispatch} = this.props
        if(user.name === "" || user.salaryM === "" || user.email === ""|| user.password === ""){
            alert('You have not complete all information')
        }
        else{
            /***https://firebase.google.com/docs/auth/web/start***/
            console.log(name, email)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user.uid = userCredential.user.uid
                dispatch(setUser(user))
                setAPIUser(user)
                storeUser(user)
                this.props.navigation.navigate('AuthLoad')
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/email-already-in-use'){
                    alert('The email is already in use.')
                } 
                else {
                    if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                    }
                    else{
                        alert(error);
                    }
                }
            })
        }
                    
    }

    onSignIn = ({email, password}) => {
        console.log(email, password)
        const {dispatch, user} = this.props
        
        signInWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            /***https://firebase.google.com/docs/database/web/read-and-write?hl=en***/
            get(child(dbRef, `budgets/${authUser.user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const APIbudgets = snapshot.val() 
                    let budgets = {}
                    Object.keys(APIbudgets).map((bud)=>{
                        if (APIbudgets[bud].entries !== undefined) {
                            budgets = {
                                ...budgets,
                                [bud]: APIbudgets[bud]
                            }
                        }
                        else{
                            const addEnt = {
                                ...APIbudgets[bud],
                                entries: []
                            }
                            budgets = {
                                ...budgets,
                                [bud]: addEnt
                            }
                        }
                    })
                    setAPIBudget(budgets)
                    dispatch(receiveBudgets(budgets))
                    
                }
                else{
                    const budgets = {}
                    dispatch(receiveBudgets(budgets))
                    setAPIBudget(budgets)
                }
                get(child(dbRef, `entries/${authUser.user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const entries = snapshot.val()
                        setAPIEntries(entries) 
                        dispatch(receiveEntries(entries))
                           
                    }
                    else{
                        const entries = {}
                        dispatch(receiveEntries(entries))
                         
                        setAPIEntries(entries)
                    }
                    get(child(dbRef, `users/${authUser.user.uid}`)).then((snapshot) => {
                        let list = ["budgets"]
                        if (snapshot.exists()) {
                            let user = snapshot.val(); 
                            let budgetExist = Object.keys(user).filter((key)=>{
                                return list.includes(key)
                            })
                            budgetExist.length>0
                                ? console.log("4.1 has budget", user, user.budgets)
                                : user.budgets = []
                            dispatch(setUser(user))
                            setAPIUser(user)
                        }

                    })  
                })
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/user-not-found' || errorCode == 'auth/invalid-email'){
                alert('User not found. Please try again.')
            }
            else{
                if (errorCode == 'auth/wrong-password'){
                    alert('Wrong Password. Please try again.')
                }
                else{
                   alert(errorMessage)
                }
                
            }
        }
        )
        
    }      

    chg = () => {
        const {login} = this.state
        this.setState(() => ({login: !login}))
    }




    render() {
        const {name, salaryM, email, password, yearEnd, login} = this.state
            return (
                <KeyboardAvoidingView behavior = {Platform.OS == "ios" ? "padding" : "height"}  enabled = "true" style = {styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style = {{width: '80%', height: '80%', alignItems:'center', justifyContent:'center'}}>           
                            <View style = {styles.secondContainer}>
                                <Text style = {styles.title}>
                                    Welcome to Budget!
                                </Text>
                                <AntDesign name='Safety' size = {100} color= {brown} />
                            </View>
                            {login === true
                                ?<SignIn next = {this.onSignIn} chg = {this.chg}/>
                                :<SignUp next = {this.onSignUp} chg = {this.chg}/>
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
    secondContainer: {
        alignItems: 'center',
        justifyContent:'center',
        width:'100%',
    },
    title:{
        color: body,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginTop: 15,
        marginBottom: 15,
    },
})


export default connect()(Welcome)