import React, {Component} from 'react'
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {blue, grey, white, body, brown, colorScale, background} from '../utils/colors'
import {handleInitialData} from '../actions/'
import Chart from './Chart'
import Welcome from './Welcome'
import {months, convertMMMYY} from '../utils/helpers'
import {AntDesign} from '@expo/vector-icons'
import {VictoryPie} from 'victory-native'

class Dashboard extends Component {
  state = {
        month: 0,
        year:0,
    }

  componentDidMount(){
    const date = Date.now()
    const newDate = new Date(date)
    const month = newDate.getMonth()
    const year = newDate.getFullYear()
    this.setState(()=> ({
      month:month,
      year: year,
    }))
  }

  minusMonth = () => {
    const {month, year} = this.state
    var newMonth =0
    var newYear = 0
    if (month-1 < 0){
      newMonth = 11
      newYear = year - 1
    }
    else{
      newMonth = month - 1
      newYear = year
    }
    this.setState(()=> ({
      month:newMonth,
      year: newYear,
    }))
  }

  addMonth = () => {
    const {month, year} = this.state
    var newMonth =0
    var newYear = 0
    if (month+1 > 11){
      newMonth = 0
      newYear = year + 1
    }
    else{
      newMonth = month + 1
      newYear = year
    }
    this.setState(()=> ({
      month:newMonth,
      year: newYear,
    }))
  }

	render() {
		const {budgets, entries} = this.props
    const {month, year} = this.state
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log("load Dashboard now!!", this.props.user)
		const {name, salary} = this.props.user
		const budgetList = this.props.user.budgets
    console.log(budgetList)

    function currentMonthEntry () {
      
      let budgetAmountList = []
      let totalSpent = 0
      let totalBudget = 0
      let colorIndex = 0
      if(budgetList === null){
          return(
            budgetAmountList,
            totalSpent,
            totalBudget
          )
      }
      else{

        budgetList.map((bud)=>{
          const date = budgets[bud].start
          const ents = budgets[bud].entries
          const now = Date.UTC(year, month, 31)
          console.log("OUTSIDE", date, now, date>=now,)
          let spent = 0
          if(ents === null){
            totalSpent = 0
            spent = 0
          } 
          else{
            if(date >= now ){
              console.log(date, now, date>=now,)
              totalSpent = totalSpent
              spent = spent
              totalBudget = totalBudget
            }
            else{
              
              ents.map((entry)=>{
                const times = new Date(entries[entry].timestamp)
                if(convertMMMYY(times.getMonth(), times.getFullYear()) == convertMMMYY(month, year)){
                     spent = spent + entries[entry].price
                }
              
              })
              budgetAmountList=budgetAmountList.concat(
                {
                  x: bud,
                  budget: budgets[bud].budget,
                  y: spent,
                  color: colorScale[colorIndex]
                }
              )
              totalSpent = totalSpent + spent
              totalBudget = totalBudget + budgets[bud].budget
            }

          }

          colorIndex = colorIndex + 1
          
        })
        
        return {budgetAmountList, totalSpent, totalBudget}
      }
        
    }


    function renderPie(){
      const {budgetAmountList, totalSpent} = currentMonthEntry()
      if(totalSpent === 0){
        return(
          <View>
            <Text style = {{padding:50}}>
              No Spending data
            </Text>
          </View>

          )
      }
      else{
        return(
          <View>
            <VictoryPie 
              animate={{
              
                easing: 'exp'
              }}

              style={{
                data: { 
                  fill: ({datum}) => datum.color 
                },
                labels: {
                  fontSize: ({ datum }) => datum.x.length > 9 ? 10 : 15, 
                  fill: body, 
                  
                }
              }}
              
              padAngle={({ datum }) => datum.y/totalSpent}
              innerRadius={windowWidth/3.2}
              width={windowWidth} 
              height={windowWidth/1.2}
              labelRadius={({ innerRadius }) => innerRadius*1.08}
              data= {budgetAmountList}
              labels={({ datum }) => (datum.y === 0 ? "" : 
                 `${datum.x}\n(${Math.round(datum.y/totalSpent*100)}%)`)
              }

              />
          </View>
          )
      }
    }
    /*


    */

    const {budgetAmountList, totalBudget, totalSpent} = currentMonthEntry()

		if(budgetList === null){
        	return(
        		<Text>
        		 You have not input any budget yet!
        		</Text>
        	)
	    }
	    else{

			return(
				<SafeAreaView style = {styles.container} >
		            {/*<Text style = {styles.title}>{`Welcome, ${name}`}</Text>*/}
		            <View style = {{marginTop:20, flexDirection:'row'}}>
                    <TouchableOpacity 
                      onPress = {this.minusMonth}
                      style = {{flexDirection:'row'}}
                    >
                      <Text>   </Text>
                      <AntDesign name='caretleft' size = {15} color= {brown} />
                      <Text>   </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:15, color: body, alignItems:'center'}}>
                      {convertMMMYY(month, year)}
                    </Text>
                    <TouchableOpacity 
                      onPress = {this.addMonth}
                      style = {{flexDirection:'row'}}
                    >
                      <Text>   </Text>
                      <AntDesign name='caretright' size = {15} color= {brown} />
                      <Text>   </Text>
                    </TouchableOpacity>
		            </View>
                
		            <View style = {styles.secondContainer}>
                  <View>
                    <Text style = {[styles.budText, {width:'100%'}]}>
                      Budget: {totalBudget.toLocaleString()}    Spent: {totalSpent.toLocaleString()}    Saved: {(totalBudget-totalSpent).toLocaleString()}
                    </Text>
                  </View>
                  <View style = {{backgroundColor:'white'}}>
                    {renderPie()}
                  </View>
                  <View style = {{padding:5}}></View>
                  <View style = {{height:'40%', width:'100%',backgroundColor:'white', borderRadius:10, padding:5}}>
                    <ScrollView>
  		            	{budgetAmountList.map((bud)=>{
                      console.log(bud)
  			            	return(
  			            		<View style = {styles.detailContainer} key = {bud.x}>
  			            			<View style = {styles.budContainer}>
  				            			<View style = {styles.budTextContainer}>

  							            	<Text style = {styles.budText}>
  							            		{bud.x}
  							            	</Text>
  						            	</View>
  						            	<View style =  {{textAlign:'right',alignItems:'flex-end'}}>
  							            	<Text style = {[styles.budText,{color: (bud.budget-bud.y)<=0?'red':'green'}]}>
  													     {(bud.budget-bud.y).toLocaleString()}/{bud.budget.toLocaleString()}
  											       </Text>
  										      </View>
  									       </View>
  					            	
  					            	<Chart spent = {bud.y} total = {bud.budget}/>
  				            	</View>
  			            	)
  		            	
  		            	})}
                    </ScrollView>
                  </View>
		            </View>
		        </SafeAreaView>
		    )
		}

	}
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        backgroundColor: background
    },
    title:{
        color: body,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
        marginTop: 15,
        marginBottom: 15,
    },
   secondContainer: {
        borderTopColor: brown,
        borderTopWidth: 0.5,
        marginTop: 15,
        marginBottom: 15,
        width: '95%',
        height:'95%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    detailContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },


  	budContainer: {
      flex:1,
  		flexDirection: 'row',
      justifyContent: "space-between",
      flexWrap: "wrap"
  	},
  	budTextContainer: {
  	},
  	budText:{
        color: body,
        fontSize: 15,
        padding: 5,
  	},
})

function mapStateToProps({user, budgets, entries}){
  return{
    user,
    budgets,
    entries,
  }
}

export default connect(mapStateToProps)(Dashboard)