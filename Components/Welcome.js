import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/'
import {blue, grey, white} from '../utils/colors'
import {AntDesign} from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {setUser} from '../actions/user'
import PropTypes from 'prop-types';
import {saveUser} from '../utils/api'

class Welcome extends Component {
    state = {
        name: '',
        salaryM: '',
        yearEnd: '',

    }

	componentDidMount(){
		const {dispatch} = this.props

		dispatch(handleInitialData())

	}

    

    next = () => {
        const {name, salaryM, yearEnd} = this.state
        const salary = parseInt(salaryM)
        const user = {name, salary, yearEnd}
        const {dispatch} = this.props
        if(user.name === "" || user.salaryM === "" || user.yearEnd === ""){
            alert('You have not complete all information')
        }
        else{
            dispatch(setUser(
                user
            ))

            setUser({user})
            this.props.navigation.navigate('BudgetList')

        }
        
    }


	render() {
        const {name, salaryM, yearEnd} = this.state
    	return (
    		<View style = {styles.container}>
    			<Text style = {styles.title}>
    				Welcome to Budget!
    			</Text>
                <AntDesign name='Safety' size = {100} color={blue} />
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
                      style={styles.textBeforeInput}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({yearEnd: itemValue})
                      }>
                      <Picker.Item label="None" value="" />
                      {months.map((month)=>(
                          <Picker.Item label={month} value={month} key = {month}/>
                        ))}
                      
                    </Picker>
                </View>
                <TouchableOpacity
                    onPress = {() => this.next()}
                >
                    <Text style = {[styles.textBeforeInput, {marginTop: 50, justifyContent: 'flex-end'}]}>
                        Next
                    </Text>
                </TouchableOpacity>

    		</View>
    	)
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: white,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent:'center',
    },
    title:{
        color: blue,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
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
        color: blue,
        fontSize: 20,
        marginLeft: 15,
    },
    inputS:{
        color: blue,
        fontSize: 20,
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        width: '90%',
  },
})



export default connect()(Welcome)