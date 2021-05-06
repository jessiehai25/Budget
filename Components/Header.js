import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {blue, grey, white, brown} from '../utils/colors'


export default function Header(){
	return (
		<View style = {styles.header}>
	{/*icon for the menu*/}
		<View style = {styles.textContainer} >
			<Text style = {styles.headerText}>Budget List</Text>
		</View>
		</View>
		)
}

 const styles = StyleSheet.create({
 	header: {
 		width: '100%',
 		height: '10%',
 		flexDirection: 'column',
 		alignItems: 'flex-end',
 		justifyContent: 'flex-start',
 		backgroundColor: brown
 	},
 	textContainer: {
 		width: '95%',
 		height: '85%',
 		alignItems: 'flex-start',
 		justifyContent: 'flex-end',
 	},
 	headerText: {
 		fontWeight: 'bold',
 		fontSize: 20,
 		color: white,
 		letterSpacing: 1,
 	}
 })