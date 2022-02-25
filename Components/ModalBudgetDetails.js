import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet, Keyboard, Picker, TouchableOpacity, Platform} from 'react-native'
import {blue, grey, white, body, brown, darkBrown, button} from '../utils/colors'
import {formatDate, convertDate} from '../utils/helpers'
import {FontAwesome } from '@expo/vector-icons'
import Modal from 'react-native-modal';
 
class ModalBudgetDetails extends Component{
	render(){
		const {budgets, entries, showDetailBudget, edit, del} = this.props
        const {budget, name, y, spentEntries} = showDetailBudget
        const budgetEntries = budgets[showDetailBudget.name].entries

            let spentDetail = {}
            spentEntries.map((ent)=> {
                console.log(ent)
                const {title, price, timestamp} = entries[ent]
                console.log(title, price, timestamp)
                let originalPrice = 0
                let original = []
                if( spentDetail!== undefined && spentDetail[title] !== undefined) {
                    originalPrice = spentDetail[title].spent 
                    original = spentDetail[title].entries
                }
                return(
                    spentDetail = {
                        ...spentDetail,
                        [title]:{
                            spent: price+originalPrice,
                            entries: original.concat(ent)
                        }
                    }
                )
            })
        if(spentDetail === {}){
            return(
                <Text>
                    No spending Data
                </Text>
            )
        }
        else{
    		return(
    			<View style = {{width:'100%', backgroundColor:'white',borderRadius:10,}}>
                    <View style = {styles.container}>
                        <View>
                            <Text style = {{fontSize:15, fontWeight: 'bold'}}>
                                {name} 
                            </Text>
                        </View>

                        <View style = {[styles.titleContainer, {borderBottomColor: brown, borderBottomWidth: 0.5, paddingBottom:10}]}>
                            <Text style = {{fontSize:15}}>
                                Spending 
                            </Text>
                            <Text style = {{fontSize:15}}>
                                ${y.toLocaleString()} 
                            </Text>
                        </View>
                        {Object.keys(spentDetail).map((title)=> (
                            <View style = {{width:'100%'}} key = {title}>

                                <View style = {{flexDirection:'row', justifyContent:'space-between', paddingTop:5, paddingBottom:5}}>
                                    <Text style = {{fontSize:15}}>{title}</Text>
                                    <Text style = {{fontSize:15}}>
                                        ${spentDetail[title].spent.toLocaleString()}
                                    </Text>
                                </View>
                                {spentDetail[title].entries.map((ent)=>{
                                    {console.log(ent, entries[ent].timestamp)}
                                    return(
                                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style = {{color:body, fontSize:12}}>      {formatDate(entries[ent].timestamp)}</Text>
                                            <Text style = {{color:body, fontSize:12}}>{entries[ent].price.toLocaleString()}</Text>
                                        </View>
                                    )
                                })}
                
                            </View>
                            ))
                        }
                    </View>
                    <TouchableOpacity 
                        style = {{borderBottomColor:grey, borderBottomWidth:2, borderTopColor:grey, borderTopWidth:2, padding:12, alignItems:'center'}}
                        onPress = {() => edit(name)}
                    >
                        <Text style = {{color:'#007AFF'}}>
                            Edit Budget
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {{padding:12, alignItems:'center'}}
                        onPress = {() => del(name)}
                    >
                        <Text style = {{color:'red'}}>
                            Delete Budget
                        </Text>
                    </TouchableOpacity>
                </View>
			)
        }
	}
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        alignItems: 'center',
        justifyContent:'center',
        padding:30,
    },
    titleContainer:{
        width:'100%',
        flexDirection:'row', 
        justifyContent:'space-between',
    }
})
export default ModalBudgetDetails
