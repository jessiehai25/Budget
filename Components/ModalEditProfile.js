import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Keyboard, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, brown, darkBrown, button} from '../utils/colors'
import {formatDate, convertDate} from '../utils/helpers'
import {FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal';

class ModalEditProfile extends Component{
	state = {
			salary: '',
    }
    componentDidMount(){
        const {salary} = this.props
        this.setState(()=> ({
            originalSalary:salary,
            salary:salary,
        }))
    }
    toggleKeyword = (keyword) => {
        Keyboard.dismiss()
   		this.setState({ category: keyword });
    };	

    save = () => {
        const {edit} = this.props
        const {originalSalary, salary} = this.state
    	if (isNaN(salary.toString())){
            alert('You have not complete')
        }
        else if (salary == originalSalary) {
            alert('No change in salary')
        }
        else {
            edit(salary)
        }
    }

	render(){
		const {salary} = this.state
        console.log(salary)
		return(
			<View style = {styles.container}>
				<View style = {[styles.inputContainer,{alignItems:'left'}]}>
					<Text style = {{fontSize:18}}>
						Salary
					</Text>
                    <Text style = {{color:'grey',fontSize:12}}>
                    The value will be used to calculate the expected saving per month. 
                    </Text>
		                <TextInput
		                    onChangeText = {(salary) => this.setState(() => ({salary: parseInt(salary)}))}
		                    placeholder = 'Salary'
		                    style = {styles.inputS}
		                    value = {isNaN(salary.toString())?0:salary.toString()}
                            keyboardType={'numeric'}
		                >
		                </TextInput>

				</View>
	                <View style={{alignItems:'center', width:'100%', marginTop:20, borderRadius:10}}>
						<TouchableOpacity 
							style = {styles.button}
							onPress = {this.save}
						>
			                	<FontAwesome name = 'plus-circle' size = {20} style = {{color: white}}/>
			                	<Text style = {{color: white, fontWeight: 'bold'}}>  Save</Text>
			            </TouchableOpacity>
			        </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:white,
        borderRadius:10,
        padding:30,
    },
    inputContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text:{
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto', 
      color:body
    },
    inputS:{
        color: body,
        fontSize: 15,
        borderBottomColor: grey,
        borderBottomWidth: 0.5,
        marginLeft: 0,
        marginRight: 10,
        padding: 5,
        marginTop: 10,
        width: '100%',
 	},
 	buttonStyle: {
        backgroundColor: white,
        padding:10,
        borderColor: brown,
        borderWidth:1,
        borderRadius: 10,
        width:'100%',
    },
    selectedKeywordStyle: {
        backgroundColor: brown,
        padding:10,
        borderRadius: 10,
        width:'100%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: brown,
        padding:9,
        borderRadius: 10,
        flexDirection:'row', 
        width:'100%',
        
    },
})
export default ModalEditProfile
