import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, Keyboard, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, brown, darkBrown, button} from '../utils/colors'
import {formatDate, convertDate} from '../utils/helpers'
import {FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal';
 
class ModalAddEntry extends Component{
	state = {
			id: '',
			title: '',
			category: '',
			price: 0,
			timestamp: ''
    }
    componentDidMount(){
	    const {date} = this.props
	    this.setState(()=> ({timestamp:date}))
    }

    toggleKeyword = (keyword) => {
        Keyboard.dismiss()
   		this.setState({ category: keyword });
    };	

    addEntry = () => {
    	const {title, category, price, timestamp} = this.state
    	const {add, budgetList} = this.props
        console.log(budgetList)
    	if (title === '' || category==='' || price ==='' || timestamp === '' || budgetList.length === 0 || isNaN(price)){
    		if (timestamp === '') {
    			alert('There are something wrong. Please exit and re-enter.')
    		}
            else{
                if (budgetList.length === 0) {
                alert('Please add Budget at Summary Page first.')
                }
                else{
                    console.log(price, isNaN(price))
                    if (price, isNaN(price)){
                        alert('Please input number for the price.')
                    }
                    else{
                        alert('You have not complete')
                    }
                }
            }
        }
    	else{
    		add({title, category, price, timestamp})
	    	this.setState(()=>({
	    		id: '',
				title: '',
				category: '',
				price: 0,
				timestamp: ''
	    	}))
    	}
    }

	render(){
		const {title, category, price, timestamp} = this.state
		const {budgetList} = this.props
		return(
			<View style = {styles.container}>
				<View style = {styles.inputContainer}>
					<Text style = {{fontSize:18}}>
						{formatDate(timestamp)}
					</Text>
					<TextInput
		                    onChangeText = {(title) => this.setState(() => ({title: title}))}
		                    placeholder = 'Items'
		                    style = {styles.inputS}
		                    value = {title}
		                >
		                </TextInput>
		                <TextInput
		                    onChangeText = {(price) => this.setState(() => ({price: parseInt(price)}))}
		                    placeholder = 'Price'
		                    style = {styles.inputS}
		                    value = {price.value}
                            keyboardType={'numeric'}
		                >
		                </TextInput>

				</View>

	                <View style= {{flexDirection:"row", justifyContent: "space-around",flexWrap: "wrap",paddingTop:10}}>

	                	{budgetList.map((budget)=>(
	                		<View key = {budget}>
		                		<TouchableOpacity
						            style={category == budget ? styles.selectedKeywordStyle : styles.buttonStyle}
						            onPress={() => this.toggleKeyword(budget)}>
			                		<Text style={[styles.text, {alignItems:"center"}]}>
			                			{budget}
			                		</Text>
		                		</TouchableOpacity>
		                	</View>
	                	))}
	                	
	                </View>
	                <View style={{alignItems:'center', width:'100%', marginTop:20, borderRadius:10}}>
						<TouchableOpacity 
							style = {styles.button}
							onPress = {this.addEntry}
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
        marginLeft: 10,
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
export default ModalAddEntry
