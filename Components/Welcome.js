import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {body, grey, white, brown, darkBrown} from '../utils/colors'
import {AntDesign} from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {setUser} from '../actions/user'
import PropTypes from 'prop-types';
import {saveUser} from '../utils/api'
import {handleInitialData} from '../actions/'

class Welcome extends Component {
    state = {
        name: '',
        salaryM: '',
        yearEnd: '',

    }
    

    next = () => {
        const {name, salaryM, yearEnd} = this.state
        const salary = parseInt(salaryM)
        const user = {name, salary, yearEnd, budgets:[]}
        const {dispatch} = this.props
        if(user.name === "" || user.salaryM === "" || user.yearEnd === ""){
            alert('You have not complete all information')
        }
        else{
            dispatch(setUser(
                user
            ))

            saveUser(user)
            console.log("Welcome",user)
            this.props.navigation.navigate('Main')

        }
        
    }


	render() {
        const {name, salaryM, yearEnd} = this.state
        	return (
        		<View style = {styles.container}>
                    <View style = {{flex:5, width: '100%', height: '100%'}}>
                        <ScrollView style = {styles.scrollContainer}>
                            <View style = {styles.secondContainer}>
                    			<Text style = {styles.title}>
                    				Welcome to Budget!
                    			</Text>
                                <AntDesign name='Safety' size = {100} color= {brown} />
                                <View style = {styles.inputContainer}>
                                    <Text style = {styles.textBeforeInput}>
                                        Name: 
                                    </Text>
                                    <TextInput
                                        onChangeText = {(name) => this.setState(() => ({name: name}))}
                                        placeholder = 'Please enter your name'
                                        value = {name}
                                        style = {styles.inputS}
                                    >
                                    </TextInput>
                                </View>
                                <View style = {styles.inputContainer}>
                                    <Text style = {styles.textBeforeInput}>
                                        Monthly Salary: 
                                    </Text>
                                
                                    <TextInput
                                        onChangeText = {(salaryM) => this.setState(() => ({salaryM: salaryM}))}
                                        placeholder = 'Please enter your monthly salary'
                                        value = {salaryM}
                                        style = {styles.inputS}
                                        keyboardType={'numeric'}
                                    >
                                    </TextInput>
                                </View>
                                <View style = {styles.inputContainer}>
                                    <Text style = {styles.textBeforeInput}>
                                        Financial Year Start from: 
                                    </Text>
                                    <Picker
                                      selectedValue={yearEnd}
                                      style={styles.textBeforeInput, {padding: 0, marginTop: 0}}
                                      onValueChange={(itemValue, itemIndex) =>
                                        this.setState({yearEnd: itemValue})
                                      }>
                                      <Picker.Item label="None" value="" />
                                      {months.map((month)=>(
                                          <Picker.Item label={month} value={month} key = {month}/>
                                        ))}
                                      
                                     </Picker>

                                </View>
                            </View>
                                
                        </ScrollView>
                    </View>
                    <View style = {styles.thirdContainer}>
                            <TouchableOpacity
                                onPress = {() => this.next()}
                            >
                                <View style = {{backgroundColor: brown, padding:9, borderRadius: 7,alignItems:'center',justifyContent: 'center'}}>
                                <Text style = {[styles.textBeforeInput, {color: white, fontWeight: 'bold'}]}>
                                    SET UP BUDGET
                                </Text>
                                </View>
                            </TouchableOpacity>
                    </View>

        		</View>
        	)
    }

}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '95%',

        flex: 1,
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

    },
    thirdContainer: {
        flex:1,
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
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start'
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