import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {FontAwesome, MaterialCommunityIcons,} from '@expo/vector-icons'
import Welcome from '../Components/Welcome'
import EntryList from '../Components/EntryList'
import BudgetList from '../Components/BudgetList'
import AddBudget from '../Components/AddBudget'
import EditBudget from '../Components/EditBudget'
import Dashboard from '../Components/Dashboard'
import Loading from '../Components/Loading'
import {blue, grey, white, body, brown} from '../utils/colors'

const RouteConfigs = {
  Budget:{
    screen: Dashboard,
    title: "!",
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='home' size = {30} color={tintColor} />
      )
    },
  },
  EntryList: {
    title:"ENTRY",
    screen: EntryList,
    navigationOptions: {
      title:"ENTRY",
      tabBarLabel: "Add Entry",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='calendar-plus-o' size = {30} color={tintColor} />
      )
    }
  },
  BudgetList: {
    screen: BudgetList,

    navigationOptions: {
      tabBarLabel: "Budget List",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name='sack' size = {30} color={tintColor} />
      )
    }
  },
  
}
const TabNavigatorConfig = {

  navigationOptions: {
    
    headerStyle: {
      backgroundColor: brown,

    },
    headerTintColor: white,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      letterSpacing: 1,
    },
  },
  tabBarOptions: {
    activeTintColor: '#007AFF',
    style: {
      height: 56,
      backgroundColor: '#fff',
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
    shadowRadius: 6,
    shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

Tabs.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  const headerTitle = routeName;
  return{
      headerTitle,
      headerStyle: {
        backgroundColor: brown,
      },
      headerTintColor: white,
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
      },
    tabBarOptions: {
      activeTintColor: '#007AFF',
      style: {
        height: 56,
        backgroundColor: '#fff',
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
      shadowRadius: 6,
      shadowOpacity: 1
      }
    }
  }
}


const MainNavigator = createStackNavigator({


  Home:{
    screen: Tabs,
    title: "HOME",
  },
  
  EntryList:{
    screen: EntryList,
  },
  BudgetList:{
    screen: BudgetList,
    navigationOptions:{
      title: "Set Your Budget"
    }
  },
  AddBudget:{
    screen: AddBudget,
    navigationOptions:{
      title: "Add a Budget"
    }
  },
  EditBudget:{
    screen: EditBudget,
    navigationOptions:{
      title: "Edit Your Budget"
    }
  },

})

const Signin = createStackNavigator({
	Welcome:{
    	screen: Welcome,
      title:"ENTRY",
  	},

})

const AuthLoad = createStackNavigator({
	Loading:{
    	screen: Loading,
      title:"ENTRY"
  	},
})



const Container = createAppContainer(createSwitchNavigator(
	{
		Main: MainNavigator,
		Signin: Signin,
		AuthLoad: AuthLoad,
	},
	{
		initialRouteName: 'AuthLoad'
	}
))


export default Container
