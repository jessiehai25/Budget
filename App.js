import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import {Constants} from 'expo'
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Welcome from './Components/Welcome'
import AddEntry from './Components/AddEntry'
import BudgetList from './Components/BudgetList'
import AddBudget from './Components/AddBudget'
import EditBudget from './Components/EditBudget'

const RouteConfigs = {
  Home:{
    screen: Welcome,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='home' size = {30} color={tintColor} />
      )
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: "Add Entry",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name='plus-square' size = {30} color={tintColor} />
      )
    }
  },

}
const TabNavigatorConfig = {

  navigationOptions: {
    header: null
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

const MainNavigator = createStackNavigator({
  Home:{
    screen: Tabs,
  },
  AddEntry:{
    screen: AddEntry,
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


const Container = createAppContainer(MainNavigator)


export default class App extends React.Component {
  render() {
    return (
      <Provider store = {createStore(reducer, middleware)}>
        <View style={{flex:1}}>
          <Container/>
        </View>
      </Provider>
    );
  }
}