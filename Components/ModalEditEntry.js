import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Keyboard, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, brown, darkBrown, button} from '../utils/colors'
import {formatDate, convertDate} from '../utils/helpers'
import {FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal';
 
class ModalEditEntry extends Component{
	state = {
			id: '',
			title: '',
			category: '',
			price: 0,
			timestamp: ''
    }
    componentDidMount(){
	    const {date, showId, entries} = this.props
	    this.setState(()=> ({
            timestamp:date,
            id: showId,
            title: entries[showId].title,
            category: entries[showId].category,
            price: entries[showId].price,
        }))
    }

    toggleKeyword = (keyword) => {
        Keyboard.dismiss()
   		this.setState({ category: keyword });
    };	

    editEntry = () => {
    	const {title, category, price, timestamp} = this.state
    	const {edit, showId} = this.props
    	if (title === '' || category==='' || price ==='' || isNaN(price.toString())){
    		if (timestamp === '') {
    			alert('There are something wrong. Please exit and re-enter.')
    		}
    		else{
    		alert('You have not complete')
    		}
    	}
    	else{
    		edit({showId, title, category, price, timestamp})
	    	console.log("MODAL Edit ENTRY",showId, title, category, price, timestamp)
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
		                    value = {isNaN(price.toString())?0 :price.toString()}
                            keyboardType={'numeric'}
		                >
		                </TextInput>
				</View>
	                <View style= {{flexDirection:"row", justifyContent: "space-around",flexWrap: "wrap",}}>
	                	{budgetList.map((budget)=>(
	                		<View style = {{padding:5}} key = {budget}>
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
							onPress = {this.editEntry}
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
export default ModalEditEntry
