import React from 'react'
import {Text} from 'react-native'
import {body} from '../utils/colors'
import {months} from '../utils/helpers'

export default function DateHeader({month, year}){
	return(
		<Text style={{fontSize:15, color: body, alignItems:'center'}}>
			{months[month]} {year}
		</Text>
	)
}