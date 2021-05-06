import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, brown, darkBrown, backgroundGrey} from '../utils/colors'
import {AntDesign} from '@expo/vector-icons'
import {formatDate, convertDate} from '../utils/helpers'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal';
import {addEntry} from '../actions/entries'

class ModalAddBudget extends Component{
	state = {
			id: '',
			title: '',
			category: '',
			price: 0,
			timestamp: ''
    }
    componentDidMount(){
		console.log("TEST")
	    const {date} = this.props
	    this.setState(()=> ({timestamp:date}))

    }

    toggleKeyword = (keyword) => {
   		this.setState({ category: keyword });
    };	

    addEntry = () => {
    	const {title, category, price, timestamp} = this.state
    	const {add} = this.props
    	if (title === '' || category==='' || price ==='' ){
    		if (timestamp === '') {
    			alert('There are something wrong. Please exit and re-enter.')
    		}
    		else{
    		alert('You have not complete')
    		}
    	}
    	else{
    		add({title, category, price, timestamp})
	    	console.log("Add ENTRY")
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
		                    value = {price}
		                >
		                </TextInput>

				</View>

	                <View style= {{flexDirection:"row", justifyContent: "space-around",flexWrap: "wrap",}}>

	                	{budgetList.map((budget)=>(
	                		<View style = {{padding:5}}>
		                		<TouchableOpacity
						            style={category == budget ? styles.selectedKeywordStyle : styles.buttonStyle}
						            onPress={() => this.toggleKeyword(budget)}>
			                		<Text style={{alignItems:"center"}}>
			                			{budget}
			                		</Text>
		                		</TouchableOpacity>
		                	</View>
	                	))}
	                	
	                </View>
	                <View style={{alignItems:'center', width:'100%', marginTop:20}}>
						<TouchableOpacity 
							style = {[styles.button, {flexDirection:'row', width:'100%'}]}
							onPress = {this.addEntry}
						>
			                	<FontAwesome name = 'plus-circle' size = {20} style = {{color: body}}/>
			                	<Text style = {{color: {body}, fontWeight: 'bold'}}>  Save</Text>
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
    textBeforeInput:{
        color: body,
        fontSize: 20,
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
        backgroundColor: backgroundGrey,
        padding:9,
        borderColor: body,
        borderWidth: 0.4,
        borderRadius: Platform.OS === 'ios' ? 2 : 2,
        
    },
})
export default ModalAddBudget
