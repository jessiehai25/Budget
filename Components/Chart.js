import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {brown, grey, white} from '../utils/colors'


export default function Chart({spent, total}){
	const width = Math.min(spent/total*100, 100)
	console.log(spent, total, width)
	return(
		<View style = {{flexDirection: 'row', alignItems:'center'}}>
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
        backgroundColor: brown,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',

    },
})
