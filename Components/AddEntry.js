import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/'
import {blue, grey, white} from '../utils/colors'
import {AntDesign} from '@expo/vector-icons'
import {months} from '../utils/helpers'

class AddEntry extends Component {
	render(){
		return(
			<Text>
				Add Entry
			</Text>
			)
	}
}

export default connect()(AddEntry)