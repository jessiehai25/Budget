import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import Swipeout from 'react-native-swipeout'
import {blue, white, grey, body} from '../utils/colors'
import { AntDesign } from '@expo/vector-icons'

export default function SwipeRow ({removeItem, name, description = null, price, edit, del}){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {

            },
            onOpen: (secId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {
                        edit(removeItem)
                    },
                    text: <AntDesign name="edit" size={24} color="white" />, type: 'edit'
                },
                {
                    onPress: () => {
                        del(removeItem)
                    },
                    text: <AntDesign name="delete" size={24} color="white" />, type: 'delete'
                }
            ],
        }
        console.log(removeItem)
		return(
            <Swipeout {...swipeSettings} style = {styles.swipeRow}>
    			<View style = {styles.removeItemgetContainer}>
                    <View style = {{flex:4, marginTop:10, marginBottom:10}}>
        				<Text style = {[styles.textBeforeInput, {color: description === null ? body : 'black'}]}>
                            {name}
                        </Text>
                        {description=== null? null: 
                            <Text style = {{color:body}}> 
                                {` - ${description}`}
                            </Text>
                        }
                       
                    </View>
                    <View style = {{flex:1, alignItems:'flex-end', marginTop:10, marginBottom:10}}>
    				    <Text style = {[styles.textBeforeInput, {alignItems:'flex-end', color: description === null ? body : 'black'}]}>${price}</Text>
    				</View>
    			</View>
            </Swipeout>

		)
}

const styles = StyleSheet.create({
    removeItemgetContainer: {
        width: '100%',
        backgroundColor: white,
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2,
        borderRadius: Platform.OS === 'ios' ? 2 : 2,
        

        
    },
    textBeforeInput:{
        fontSize: 14,
    },
    swipeRow:{
        padding: 1,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent:'center',
       
    }
})
