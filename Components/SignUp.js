import React, {Component} from 'react'
import {View, KeyboardAvoidingView, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown, darkBrown} from '../utils/colors'
import {AntDesign, Ionicons } from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {setUser} from '../actions/user'
import PropTypes from 'prop-types';
import {saveUser} from '../utils/api'
import firebase from 'firebase'

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        salaryM: '',

    }

	render() {
        const {name, salaryM, email, password} = this.state
        const {next, chg} = this.props
        	return (
                <View style = {styles.secondContainer}>

                    <View style = {styles.inputContainer}>
                        <Ionicons name="person-circle-outline" size={24} color="#a9a9a9" />
                        <TextInput
                            onChangeText = {(name) => this.setState(() => ({name: name}))}
                            placeholder = 'Name'
                            value = {name}
                            style = {styles.inputS}
                        >
                        </TextInput>
                    </View>
                    <View style = {styles.inputContainer}>
                        <Ionicons name="at-circle-outline" size={24} color="#a9a9a9" />
                        <TextInput
                            onChangeText = {(email) => this.setState(() => ({email: email}))}
                            placeholder = 'Email'
                            autoCapitalize = "none"
                            value = {email}
                            style = {styles.inputS}
                        >
                        </TextInput>
                    </View>
                    <View style = {styles.inputContainer}>
                        <Ionicons name="md-lock-closed" size={24} color="#a9a9a9" />
                        <TextInput
                            onChangeText = {(password) => this.setState(() => ({password: password}))}
                            placeholder = 'Please enter your password'
                            secureTextEntry = {true}
                            value = {password}
                            style = {styles.inputS}
                        >
                        </TextInput>
                    </View>
                    <View style = {styles.inputContainer}>
                        <Ionicons name="cash-outline" size={24} color="#a9a9a9" />
                    
                        <TextInput
                            onChangeText = {(salaryM) => this.setState(() => ({salaryM: salaryM}))}
                            placeholder = 'Monthly Salary / Maximum Budget'
                            value = {`${salaryM.toLocaleString()}`}
                            style = {styles.inputS}
                            keyboardType={'numeric'}
                        >
                        </TextInput>
                    </View>
                        

                    <View style = {styles.thirdContainer}>
                        <TouchableOpacity
                            onPress = {() => next({name, salaryM, email, password})}
                        >
                            <View style = {{backgroundColor: brown, padding:9, borderRadius: 7,alignItems:'center',justifyContent: 'center'}}>
                            <Text style = {[styles.textBeforeInput, {color: white, fontWeight: 'bold'}]}>
                                SET UP BUDGET
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {[styles.thirdContainer, {flexDirection: 'row', alignItems:'center'}]}>
                        <View style = {{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'center'}}>
                            <Text style = {{color:'#a9a9a9'}}>
                                Already have account?
                            </Text>
                            <TouchableOpacity
                                onPress = {() => chg()}
                            >
                                <Text style = {[styles.textBeforeInput, {color: brown, fontWeight: 'bold'}]}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style = {{height:100}}/>

                </View>
   
        	)
        }

    }

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '80%',
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent:'center',
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


export default SignUp