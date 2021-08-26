import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native'
import {connect} from 'react-redux'
import Swipeout from 'react-native-swipeout'
import {blue, white, grey, body} from '../utils/colors'
import { AntDesign } from '@expo/vector-icons'
import Chart from './Chart'

export default function SwipeRowBudget ({bud, edit, del}){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {

            },
            onOpen: (secId, rowId, direction) => {

            },
            right: [
                {
                    onPress: () => {
                        edit(bud.x)
                    },
                    text: <AntDesign name="edit" size={24} color="white" />, type: 'edit'
                },
                {
                    onPress: () => {
                        del(bud.x)
                    },
                    text: <AntDesign name="delete" size={24} color="white" />, type: 'delete'
                }
            ],
        }
        console.log(bud)
		return(
            <Swipeout {...swipeSettings} style = {styles.swipeRow}>

                    <View style = {styles.budContainer}>
                        <View style = {{flexDirection:'row', justifyContent:'space-between'}}>

                            <Text style = {styles.budText}>
                                {bud.x}
                            </Text>

                        <View style =  {{textAlign:'right',alignItems:'flex-end'}}>
                            <Text style = {{fontSize:10}}>
                                Remaining
                            </Text>
                            <Text style = {[styles.budText,{color: (bud.budget-bud.y)<=0?'red':'green'}]}>
                                         ${(bud.budget-bud.y).toLocaleString()} / {bud.budget.toLocaleString()}
                                   </Text>
                              </View>
                           </View>
                        </View>
                    <Chart spent = {bud.y} total = {bud.budget} color = {bud.color}/>
               
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
        backgroundColor:'white',
        padding: 1,
        alignItems: 'center',
        justifyContent:'center',
       
    }
})
