import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {brown, grey, white, body} from '../utils/colors'
import { Octicons } from '@expo/vector-icons';

export default function Legend({budgetAmountList}){
	if(budgetAmountList === {}){
		return null
	}
	else{
	return(
		<View style = {styles.container}>
			{budgetAmountList.map((bud)=> {
				return(
					<View key = {bud.x} style = {{flexDirection: 'row', alignItems:'center'}}>
						<Text style = {styles.text}></Text>
						<Octicons name="primitive-dot" size={24} color={bud.color} />
						<Text style = {styles.text}>  {bud.x}   </Text>
					</View>
				)
			})}
		</View>
	)}
}

const styles = StyleSheet.create({
	container: {
		marginLeft:5,
		marginRight:5,
		flexDirection: 'row', 
		alignItems:'center',
		justifyContent:'space-around',
		flexWrap: 'wrap',
	},
    text: {
        fontSize:12,
        color: body,

    },
})
