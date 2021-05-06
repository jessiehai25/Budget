import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/'
import {blue, grey, white, body, brown, darkBrown, backgroundGrey} from '../utils/colors'
import {AntDesign} from '@expo/vector-icons'
import {months} from '../utils/helpers'
import {formatDate, convertDate} from '../utils/helpers'
import {Calendar, CalendarList, Agenda, Arrow} from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal';
import ModalAddBudget from'./ModalAddBudget'
import {handleAddEntry} from '../actions/entries'

class EntryList extends Component {
	state = {
		date: Date.now(),
		markedDate : {},
		selected: {}
	}
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
		console.log(markedDate)
		this.setState(()=> ({
			markedDate:markedDate,
			selected: {[formatted] : {selected: true, selectedColor: brown}}
		}))


	}


	add = (entry) =>{
        console.log("ADD FUNCTION in ENTRYLI", entry)
        const {markedDate} = this.state
        var entryDate = convertDate(new Date(entry.timestamp))
		const {dispatch} = this.props
        dispatch(handleAddEntry(entry))
        this.setState(()=> ({
        	show: false,
        	markedDate: {
        		...markedDate,
        		[entryDate]:{
						...markedDate[entryDate],
						marked: true, 
						dotColor: 'red'}
        	}
        }))
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
			<View style = {[styles.container,{borderTopColor:body, borderTopWidth: 0.1,}]}>

				<View style = {{height:'55%'}}>

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
				
				<View style = {{height:'38%', borderTopColor: grey, borderTopWidth: 0.1}}>
					<Modal 
						isVisible={this.state.show} 
						transparent = {true}
						onBackdropPress = {() => {this.setState({show:false})}}
					>
						<ModalAddBudget
							date = {date} 
							budgetList = {budgetList} 
							add = {this.add}
						/>
					</Modal>
					<View style = {{alignItems:'center', justifyContent:'flex-start',width:'100%'}}>
						<View style = {{padding:5}}>
							<Text style = {{fontSize: 17, marginBottom: 5}}>
								{formatDate(date)}
							</Text>
						</View>
						<ScrollView style = {{width:'100%',}}>
							{Object.keys(entries).map((entry)=>{
								const title = entries[entry].title
								const timestamp = entries[entry].timestamp
								{if (formatDate(timestamp) === formatDate(date)) {
									return(
										<View style = {styles.entryContainer}>
											<View style = {{padding:5}}>
												<Text>
													{entries[entry].category}
												</Text>

												<Text style = {styles.textBeforeInput}>
													- {entries[entry].title}
												</Text>
											</View>
											<View style = {{flex:1, alignItems: 'flex-end', padding:5}}>
												<Text style = {styles.textBeforeInput}>
													${entries[entry].price}
												</Text>
											</View>
											
											{/*<Text>
												{formatDate(entries[entry].timestamp)}
											</Text>*/}
											
								
											
										</View>

									)}
								}								
							})}
						</ScrollView>
						
					</View>
				</View>
				<View style = {{justifyContent:'flex-start'}}>
					<TouchableOpacity
                            onPress = {() => {this.setState({show:true})}}
                            style = {styles.button}
                    >
                        <View style = {{flexDirection:'row'}}>
                        	<Ionicons name="add-circle-sharp" size={20} color= {body} />
                        	<View style = {{justifyContent: 'center'}}>
                            	<Text style = {{color: body, fontWeight: 'bold'}}>  New Record</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
					
				
				
			)

	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    entryContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection: 'row',
        borderTopColor: backgroundGrey,
        borderTopWidth: 0.5,


    },
    textBeforeInput:{
        color: body,
        fontSize: 15,
        marginLeft: 15,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundGrey,
        height:'25%',
        borderColor: body,
        borderWidth: 0.4,
        borderRadius: Platform.OS === 'ios' ? 2 : 2,
        
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