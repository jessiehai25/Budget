import React from 'react'
import {Text} from 'react-native'
import {blue} from '../utils/colors'

export default function DateHeader({date}){
	return(
		<Text style={{fontSize:25, color: blue}}>
			{date}
		</Text>
	)
}