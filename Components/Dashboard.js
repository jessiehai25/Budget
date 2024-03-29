import React, {Component} from 'react'
import {View, Image, ScrollView, StatusBar,Text, StyleSheet, TouchableOpacity, Platform, Dimensions, Alert, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import {VictoryPie} from 'victory-native'
import Modal from 'react-native-modal';
import Legend from './Legend'
import AddBudget from './AddBudget'
import EditBudget from './EditBudget'
import SwipeRowBudget from './SwipeRowBudget'
import ModalBudgetDetails from './ModalBudgetDetails'
import {addBudget, editBudget, deleteBudget} from '../actions/budgets'
import {addUserBudget, deleteUserBudget} from '../actions/user'
import {saveBudget, saveUserBudget, modifyBudget, removeBudget, removeUserBudget, db, addBudgetToFB} from '../utils/api'
import {blue, grey, white, body, brown, colorScale, background} from '../utils/colors'
import {months, convertMMMYY} from '../utils/helpers'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Dashboard extends Component {
  state = {
        month: 0,
        year:0,
        show:false,
        showAdd: false,
        showDetail:false,
        showDetailBudget:null,
        showEdit:false,
        editBud:null,
        gestureName: '',
    }
    add = ({name, budget, date, rollOver}) => {
      const budgetInNumber = parseInt(budget)
      const {dispatch} = this.props
      dispatch(addBudget(name, budgetInNumber, date, rollOver))
      dispatch(addUserBudget(name))
      console.log("ROLL",rollOver)
      saveUserBudget(name)
      saveBudget(name, budgetInNumber, date, rollOver)
      .then(()=>{
          this.setState(()=> ({
              showAdd: false,
          }))
      })
    }

    edit = ({name, budget, originalName}) => {
      console.log(name, budget, originalName)
      const {dispatch} = this.props
      const newName = originalName.name
      dispatch(editBudget(name, budget, originalName))
      dispatch(deleteUserBudget(newName))
      dispatch(addUserBudget(name))
      modifyBudget(name, budget, originalName)
      this.setState(()=> ({
          showDetailBudget:{
              ...originalName,
              name: name,
              x: name,
              budget: budget
          },
          showEdit:false,
          editBud: null,
      }))
    }

    del = (bud) => {
        const {dispatch} = this.props
        Alert.alert(
            `Are you sure to delete ${bud}?`,
            "",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                      console.log('delete', bud)
                          
                          this.setState(()=> ({showDetail:false}))
                          dispatch(deleteUserBudget(bud))
                          dispatch(deleteBudget(bud))
                          removeUserBudget(bud)
                          removeBudget(bud)
                        

                    }
                },
            ]
        )
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

  onSwipeLeft(gestureState) {
    this.addMonth();
  }

  onSwipeRight(gestureState) {
    this.minusMonth();
  }

  onSwipe(gestureName, gestureState) {
    console.log(gestureName, gestureState)
    const {dx} = gestureState
    if (gestureName === null){
      if (dx > 0) {
          gestureName = "SWIPE_RIGHT";
          this.minusMonth()
      }
      else if (dx < 0) {
          gestureName = "SWIPE_LEFT";
          this.addMonth();
      }
  }

    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    console.log(gestureName, gestureState)
    this.setState({gestureName, gestureName});
    /*switch (gestureName) {
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }*/
  }

	render() {
		const {budgets, entries, budgetList} = this.props
    const {month, year, gestureName} = this.state
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
		const {name, salary} = this.props.user
    console.log('dashboard')
    const config = {
      velocityThreshold: 0.6,
      directionalOffsetThreshold: 80
    };
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
          let spent = 0
          let spentEntries = []
          if(date >= now ){
            totalSpent = totalSpent
            spent = spent
            totalBudget = totalBudget
          }
          else{
            ents.map((entry)=>{
              const times = new Date(entries[entry].timestamp)
              if(convertMMMYY(times.getMonth(), times.getFullYear()) == convertMMMYY(month, year)){
                spent = spent + entries[entry].price
                spentEntries = spentEntries.concat(entry)
              }
            })
            budgetAmountList=budgetAmountList.concat(
              {
                x: bud,
                name:bud,
                budget: budgets[bud].budget,
                y: spent,
                color: colorScale[colorIndex],
                spentEntries: spentEntries
              }
            )
            totalSpent = totalSpent + parseInt(spent)
            totalBudget = totalBudget + parseInt(budgets[bud].budget)
          }
        colorIndex = colorIndex + 1
      })
      return {budgetAmountList, totalSpent, totalBudget}
      }
    }

    function renderPie(){
      const {budgetAmountList, totalSpent, totalBudget} = currentMonthEntry()
      if(totalSpent === 0){
        return(
          <View>
            <Text style = {{marginTop:50, padding:50}}>
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
                easing: 'exp',
                duration: 500
              }}

              style={{
                data: { 
                  fill: ({datum}) => datum.color 
                },
              }} 
              innerRadius={windowWidth/4.5}
              width={windowWidth}
              height={windowWidth/1.5}
              labelRadius={({ innerRadius }) => innerRadius*1.1}
              data= {budgetAmountList.concat(
                {
                  x: "Remaining",
                  name:"Remaining",
                  budget: 0,
                  y: totalBudget-totalSpent,
                  color: grey,
                }
              )}
              labels={({ datum }) => (Math.round(datum.y/totalBudget*100) === 0 || datum.x === "Remaining" ? "" : 
                 `${Math.round(datum.y/totalBudget*100)}%`)
              }
            />
            <Legend budgetAmountList = {budgetAmountList} />
          </View>
        )
      }
    }
    const {budgetAmountList, totalBudget, totalSpent} = currentMonthEntry()
		if(!budgetList.length){
    	return(
        <SafeAreaView style = {[styles.container, {justifyContent:'center'}]} >
          <Modal 
            isVisible={this.state.showAdd} 
            transparent = {true}
            onBackdropPress = {() => {this.setState({showAdd:false})}}
          >
            <KeyboardAvoidingView behavior = {Platform.OS == "ios" ? "padding" : "height"}  enabled = "true">
              <AddBudget
                  add = {this.add}
                  budgetList = {budgetList}
              />
            </KeyboardAvoidingView>
           </Modal>
          <TouchableOpacity
             onPress = {() => {this.setState({showAdd:true})}}
          >
            <View style = {{borderRadius:60, borderWidth:1, borderColor:"grey", padding:40, marginBottom:40}}>

            <Image 
              source={require('../assets/plus.png')}
              style = {{height:40,width:40,}}
            />
            </View>
          </TouchableOpacity>

      		<Text>
      		  You have not input any budget yet!
      		</Text>
        </SafeAreaView>
    	)
    }
    else{
			return(
				<SafeAreaView style = {styles.container} >
          <Modal 
            isVisible={this.state.showAdd} 
            transparent = {true}
            onBackdropPress = {() => {this.setState({showAdd:false})}}
          >
          <KeyboardAvoidingView
                behavior="position"
                enabled
            >
            <AddBudget
                add = {this.add}
                budgetList = {budgetList}
            />
          </KeyboardAvoidingView>
           </Modal>
           <Modal 
            isVisible={this.state.showDetail} 
            transparent = {true}
            onBackdropPress = {() => {this.setState({showDetail:false})}}
           >
              <ModalBudgetDetails
                  budgets = {budgets}
                  entries = {entries}
                  showDetailBudget = {this.state.showDetailBudget}
                  edit = {() => {this.setState({showEdit:true})}}
                  del = {this.del}
              />
                <Modal 
                isVisible={this.state.showEdit} 
                transparent = {true}
                onBackdropPress = {() => {this.setState({showEdit:false})}}
                >
                  <KeyboardAvoidingView
                    behavior="position"
                    enabled
                  >
                    <EditBudget
                        budgets = {budgets}
                        bud = {this.state.showDetailBudget}
                        edit = {this.edit}
                    />
                  </KeyboardAvoidingView>
                </Modal>

           </Modal>
           
          
            <View style = {{marginTop:10, flexDirection:'row', justifyContent:'flex-start'}}>
              <View style = {{width:'90%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
              <View>
                <AntDesign name='plus' size = {25} color= {white} />
              </View>
                <View style = {{flexDirection:'row', }}>
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
                  </TouchableOpacity >
                </View>
                <TouchableOpacity
                onPress = {() => {this.setState({showAdd:true})}}>
                  <Text style = {{fontSize:20}}> 
                  <Text>   </Text>  
                  <FontAwesome name='plus' size = {20} color= {brown} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
                
            <View style = {styles.secondContainer}>
              <View style = {{width:'95%',flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style = {[styles.budText]}>
                  Budget: ${totalBudget.toLocaleString()}
                </Text>
                <Text style = {[styles.budText]}>
                  Spent: ${totalSpent.toLocaleString()}
                </Text>
                <Text style = {[styles.budText]}>
                  Remaining: ${(totalBudget-totalSpent).toLocaleString()}
                </Text>
                    
              </View>
              <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={(state) => this.onSwipeRight(state)}
                config={config}
                style={{
                  backgroundColor: 'white'
                }}
                >
                <View style = {{backgroundColor:'white', width:'100%', alignItems:'center'}}>
                  {renderPie()}
                </View>
              </GestureRecognizer>
              <View style = {{width:'100%', paddingBottom:StatusBar.currentHeight, padding:5, backgroundColor:'white', alignItems:'center'}}>
                <ScrollView style = {{width:'95%'}}>
                <View style = {[styles.detailContainer, {borderColor:white}]}>
                  <View style = {styles.budContainer}>
                    <View style = {styles.budTextContainer}>
                      <View style = {{width:'100%',flexDirection: 'row', justifyContent: "space-between", marginBottom:5}}>
                        <Text style = {styles.text}>
                          Budget
                        </Text>
                        <Text style = {[styles.budText,styles.text]}>
                           ${totalBudget.toLocaleString()}
                         </Text>
                      </View>
                      <View style = {{width:'100%',flexDirection: 'row', justifyContent: "space-between"}}>
                        <Text style = {[styles.text, {marginBottom:4}]}>
                          Remaining ({Math.round((totalBudget-totalSpent)/totalBudget*100)}%)
                        </Text>
                        <Text style = {[styles.budText, styles.text, {color: (totalBudget-totalSpent)<=0?'red':'green', marginBottom:4}]}>
                           ${(totalBudget-totalSpent).toLocaleString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
	            	{budgetAmountList.map((bud)=>{
		            	return(
		            		<View style = {styles.detailContainer} key = {bud.x}>
                      
                        <TouchableOpacity
                        onPress = {() => {this.setState({showDetail:true, showDetailBudget:bud})}}
                          >
  			            			<SwipeRowBudget bud = {bud} edit = {this.editModal} del= {this.del}/>
  				            	</TouchableOpacity>
                     
                    </View>
		            	)
	            	 
	            	})}
                <View style = {{padding:190}}></View>
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
        backgroundColor: background,
    },
    text:{
      fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto', 
      color:body
    },
   secondContainer: {
        borderTopColor: brown,
        borderTopWidth: 0.5,
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
        height:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    detailContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        borderColor:grey,
        borderRadius:10,
        borderWidth:2,
        padding:8,
        width: '100%',
    },
  	budContainer: {
      flex:1,
      flexWrap: "wrap"
  	},
  	budTextContainer: {
  	},
  	budText:{
        color: body,
        fontSize: 13,
        marginTop:2,
        textTransform: 'capitalize',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto'
  	},
})

function mapStateToProps({user, budgets, entries}){
  return{
    user,
    budgets,
    entries,
    budgetList:user.budgets === [] ? [] : user.budgets.sort((a,b)=>budgets[b].name.toLowerCase() < budgets[a].name.toLowerCase())
  }
}

export default connect(mapStateToProps)(Dashboard)