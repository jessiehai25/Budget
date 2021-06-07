import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, StatusBar, Platform , Dimensions} from 'react-native';
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
  Summary:{
    screen: Dashboard,
    title: "!",
    navigationOptions: {
      tabBarLabel: ({tintColor}) => (<SafeAreaView><Text style = {{color: tintColor, fontSize:12}}>Home</Text></SafeAreaView>),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='home' size = {30} color={tintColor} />
      )
    },
  },
  Calendar: {
    title:"ENTRY",
    screen: EntryList,
    navigationOptions: {
      title:"ENTRY",
      tabBarLabel: ({tintColor}) => (<SafeAreaView><Text style = {{color: tintColor, fontSize:12}}>Add Entry</Text></SafeAreaView>),
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='calendar-plus-o' size = {30} color={tintColor} />
      )
    }
  },
  Budget: {
    screen: BudgetList,

    navigationOptions: {
      tabBarLabel: ({tintColor}) => (<SafeAreaView><Text style = {{color: tintColor, fontSize:12}}>My Budget</Text></SafeAreaView>),
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name='sack' size = {30} color={tintColor} />
      )
    }
  },
  
}



const windowWidth = Dimensions.get('window').width;

function tabBarHeight() {
    const majorVersion = parseInt(Platform.Version, 10);
    const isIos = Platform.OS === 'ios';
    const isIOS11 = majorVersion >= 11 && isIos;
    if(Platform.isPad) return 49;
    if(isIOS11) return 90;
    return 49;
}

const TabNavigatorConfig = {

  tabBarOptions: {
    activeTintColor: '#007AFF',
    style: {
      height: tabBarHeight(),
      backgroundColor: '#fff',
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
    shadowRadius: 6,
    shadowOpacity: 1,
    
    }
  }
};

const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

Tabs.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  const headerTitle = 
    <SafeAreaView>
      <Text style = {{fontWeight: 'bold',
          color: white,
          fontSize: 20,
          letterSpacing: 1}}>
        {routeName}
      </Text>
    </SafeAreaView>;
  return{
      safeAreaInset: { bottom: 'always', top: 'always' },
      headerTitle: headerTitle,
      headerStyle: {
        backgroundColor: brown,
        height:60,
      },
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
  	},

})

const AuthLoad = createStackNavigator({
	Loading:{
    	screen: Loading,
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
