import React, {Component, useEffect} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform, Alert, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import {blue, grey, white, body, brown, darkBrown, button, background} from '../utils/colors'
import {formatDate, convertDate} from '../utils/helpers'
import {CalendarList} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal';
import ModalAddEntry from'./ModalAddEntry'
import ModalEditEntry from './ModalEditEntry'
import SwipeRow from './SwipeRow'
import {handleAddEntry, handleDeleteEntry} from '../actions/entries'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';


class EntryList extends Component {
	state = {
		showAdd: false,
		showEdit: false,
		showId: null,
		date: Date.now(),
		markedDate : {},
		selected: {}

	};

	componentDidMount(){
		const {entries} = this.props
		const {date} = this.state
		var t = new Date(date)
		const formatted = convertDate(t)
		const selectedDate = {[formatted]: {selected: true, selectedColor: brown, marked: true, dotColor: body}}
		var markedDate = {}
		Object.keys(entries).map((entry)=> {
			var entryDate = convertDate(new Date(entries[entry].timestamp))
			
			return(
				markedDate = {
					...markedDate,
					[entryDate]:{
						...markedDate[entryDate],
						marked: true, 
						dotColor: 'red'}
				}
			)
		})
		this.setState(()=> ({
			markedDate:markedDate,
			selected: {[formatted] : {selected: true, selectedColor: brown}}
		}))
	}
	componentDidUpdate(){
		if (this.props.navigation.getState().routes[1].params== undefined){
			this.props.navigation.setParams({
		      scrollToTop: this.scrollToTop,
		    });
		}
	}

	scrollToTop = ()=>{
		console.log("Press")
      this.setState(()=> ({
        	showAdd: true,
        }))
  	}
	add = (entry) =>{
        const {markedDate} = this.state
        var entryDate = convertDate(new Date(entry.timestamp))
		const {dispatch} = this.props
        dispatch(handleAddEntry(entry))
        console.log("ENtryList add function",entry)
        this.setState(()=> ({
        	showAdd: false,
        	markedDate: {
        		...markedDate,
        		[entryDate]:{
						...markedDate[entryDate],
						marked: true, 
						dotColor: 'red'}
        	}
        }))
    }

    edit = ({showId, title, category, price, timestamp}) => {
    	const {dispatch} = this.props
    	const {entries} = this.props
    	const showCategory = entries[showId].category
    	console.log("edit function", category)
    	const entry = {
    		title, 
    		category, 
    		price, 
    		timestamp
    	}
    	setTimeout(() => {
		dispatch(handleAddEntry({title, category, price, timestamp}))
		}, 100);
		
		dispatch(handleDeleteEntry(id = showId, showCategory))
		
    	this.setState(()=> ({
        	showEdit: false,
        }))
    }

    delete = (id) => {
    	const {dispatch} = this.props
    	const {entries} = this.props
    	const newEntries = Object.keys(entries).reduce((object, key) => {
			if (key !== id){
				object[key] = entries[key]
			}
			return object
		}, {})
    	const entryDate = convertDate(new Date(entries[id].timestamp))
    	const mark = this.state.markedDate
    	const category = entries[id].category
    	var markedDate = {}
    	Object.keys(newEntries).map((entry)=> {
			var entryDate = convertDate(new Date(entries[entry].timestamp))
			return(
				markedDate = {
					...markedDate,
					[entryDate]:{
						...markedDate[entryDate],
						marked: true, 
						dotColor: 'red'
					}
				}
			)
		})
    	Alert.alert(
            `Are you sure to delete ${entries[id].title}?`,
            "",
            [  
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        console.log('delete', id, category)
                        dispatch(handleDeleteEntry(id, category))
                        this.setState(()=> ({
				        	markedDate
				        }))
                    }
                },
            ]
        )
    }

    onDayPress = (day) => {
		const d = formatDate(day)
		return(
	  	this.setState(()=> ({
	  		date: day.timestamp,
	  		selected:{
				[day.dateString]:{selected: true, selectedColor: brown}
	  		}
	  	}))
	)}

	render(){ 
		const {user, entries, budgetList} = this.props
		const {date, markedDate, selected} = this.state
		const sDate = Object.keys(selected)
		return(
			<SafeAreaView style = {styles.container}>
				<View style = {{width:'100%'}}>
					<CalendarList
						// Callback which gets executed when visible months change in scroll view. Default = undefined
						// Max amount of months allowed to scroll to the past. Default = 50
						pastScrollRange={8}
						// Max amount of months allowed to scroll to the future. Default = 50
						futureScrollRange={9}
						// Enable or disable scrolling of calendar list
						scrollEnabled={true}
						// Enable or disable vertical scroll indicator. Default = false
						showScrollIndicator={true}
						onDayPress = {this.onDayPress}
						hideExtraDays={true}
						pagingEnabled={true}
						horizontal={true}
						markedDates={{
							...markedDate, 
							[sDate]:{
								...markedDate[sDate],
								...selected[sDate]
							}
						}}
					/>
				</View>
				<Modal 
					isVisible={this.state.showAdd} 
					transparent = {true}
					onBackdropPress = {() => {this.setState({showAdd:false})}}
				>
					<KeyboardAvoidingView
			            behavior="position"
			            enabled
			        >
						<ModalAddEntry
							date = {date} 
							budgetList = {budgetList} 
							add = {this.add}
						/>
					</KeyboardAvoidingView>
				</Modal>

				<Modal 
					isVisible={this.state.showEdit} 
					transparent = {true}
					onBackdropPress = {() => {this.setState({showEdit:false})}}
				>
				<KeyboardAvoidingView
		            behavior="position"
		            enabled
		        >
					<ModalEditEntry
						date = {date} 
						budgetList = {budgetList} 
						edit = {this.edit}
						showId = {this.state.showId}
						entries = {entries}
					/>
				</KeyboardAvoidingView>
				</Modal>
				<View style = {styles.secondContainer}>
					<View style = {{height:'38%', width:'95%'}}>
						<View style = {{alignItems:'center', width:'100%',padding:5,borderBottomColor: 'grey',borderBottomWidth: 0.5,}}>
							<Text style = {[styles.text,{fontSize: 17, marginBottom: 5}]}>
								{formatDate(date)}
							</Text>
						</View>
						<View style = {{alignItems: 'center'}}>
						<ScrollView style = {{width:'100%'}}>
							{Object.keys(entries).map((entry)=>{
								const title = entries[entry].title
								const timestamp = entries[entry].timestamp
								{if (formatDate(timestamp) === formatDate(date)) {
									return(
										<View style = {styles.entryContainer} key = {entries[entry].id}>
											<View style = {{width:'100%'}}>
												<SwipeRow 
												removeItem = {entry} 
												key = {entry} 
												name = {entries[entry].category} 
												description = {title} price = {entries[entry].price} 
												edit = {() => {this.setState({
													showEdit:true,
													showId: entry,
												})}} 
												del = {this.delete}/>
											</View>
										</View>
									)}
								}								
							})}
						</ScrollView>
						</View>
					</View>
				</View>
            </SafeAreaView>	
		)
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:background,
        alignItems:'center'
    },
    text:{
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto', 
      color:body
    },
    secondContainer:{ 
    	alignItems:'center', 
    	height:'100%', 
    	width:'100%'
    },

    entryContainer: {
        width: '100%',
        marginBottom:5,
        marginTop:5,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection: 'row',
    },

})

function mapStateToProps({user, entries}){
  return{
    user,
    entries,
    budgetList: user.budgets.sort((a,b)=>b.toLowerCase() < a.toLowerCase())
  }
}

export default connect(mapStateToProps)(EntryList)