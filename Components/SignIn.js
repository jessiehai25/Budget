import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown, darkBrown} from '../utils/colors'
import {AntDesign, Ionicons } from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {setUser} from '../actions/user'
import PropTypes from 'prop-types';
import {saveUser} from '../utils/api'

class Welcome extends Component {
    state = {
        email: '',
        password: '',
        disabled: false,
    }

	render() {
        const {email, password, disabled} = this.state
        const {next, chg, err} = this.props
        	return (
                <View style = {styles.secondContainer}>
                    <View style = {styles.inputContainer}>
                        <Ionicons name="at-circle-outline" size={24} color="#a9a9a9" />
                        <TextInput
                            onChangeText = {(email) => this.setState(() => ({
                                email: email,
                                disabled: false
                            }))}
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
                            onChangeText = {(password) => this.setState(() => ({
                                password: password,
                                disabled: false
                            }))}
                            placeholder = 'Please enter your password'
                            secureTextEntry = {true}
                            value = {password}
                            style = {styles.inputS}
                        >
                        </TextInput>
                    </View>             

                    <View style = {styles.thirdContainer}>
                        <TouchableOpacity
                            onPressIn = {() => {
                                this.setState({disabled:true})
                                next({email, password})
                            }}
                        >
                            <View style = {{backgroundColor: brown, opacity: disabled ? 0.2 : 1, padding:9, borderRadius: 7,alignItems:'center',justifyContent: 'center'}}>
                            <Text style = {[styles.textBeforeInput, {color: white, fontWeight: 'bold'}]}>
                                Login
                            </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    <View style = {[styles.thirdContainer, {flexDirection: 'row', alignItems:'center'}]}>
                        <View style = {{flexDirection:'row', alignItems:'center', width:'100%', justifyContent:'center'}}>
                            <Text style = {{color:'#a9a9a9'}}>
                                New to Budget?
                            </Text>
                            <TouchableOpacity
                                onPress = {() => {
                                    
                                    chg()}
                                }
                            >
                                <Text style = {[styles.textBeforeInput, {color: brown, fontWeight: 'bold'}]}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    secondContainer: {
        alignItems: 'center',
        justifyContent:'center',
        width:'100%',
    },
    thirdContainer: {
        marginTop: 30,
        width:'95%',
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
        borderBottomWidth: 0.2,
        marginLeft: 10,
        marginRight: 10,
        width: '90%',
  },
})


export default connect()(Welcome)