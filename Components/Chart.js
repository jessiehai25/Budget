import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, Picker, TouchableOpacity, Platform} from 'react-native'
import {brown, grey, white, body} from '../utils/colors'


export default function Chart({spent, total, color}){
	const width = Math.min(spent/total*100, 100)
	/*console.log(spent, total, width)*/
	return(
		<View style = {{flexDirection: 'row', alignItems:'center', backgroundColor: grey, borderRadius:10,}}>
			<View style = {[styles.container, {backgroundColor: color,width:`${width}%`, borderRadius:10}]}>
				<Text style={{fontSize:10, color: white}}>
					{/*${spent}*/}
				</Text>
			</View>
			<View style = {[styles.container,  {width:`${100-width}%`}]}>
				<Text style={{fontSize:10, color: body}}>
					{/*${total - spent}*/}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: grey,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'row',
        borderRadius:10,

    },
})
