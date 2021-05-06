import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white} from '../utils/colors'


export default function Chart({spent, total}){
	const width = spent/total*100
	console.log(spent, total, width)
	return(
		<View style = {{flexDirection: 'row'}}>
			<View style = {[styles.container, {backgroundColor: grey},{width:`${width}%`}]}>
				<Text style={{fontSize:10, color: white}}>
					{/*{spent}*/}
				</Text>
			</View>
			<View style = {[styles.container,  {width:`${100-width}%`}]}>
				<Text style={{fontSize:10, color: white}}>
					{/*{total - spent}*/}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',

    },
})
