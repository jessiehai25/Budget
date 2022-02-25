import React from 'react';
import { StyleSheet, SafeAreaView, Animated, Text, View, StatusBar, Platform , Dimensions, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator, useBottomTabBarHeight} from 'react-navigation'
import {FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import Welcome from '../Components/Welcome'
import EntryList from '../Components/EntryList'
import EditBudget from '../Components/EditBudget'
import Dashboard from '../Components/Dashboard'
import Loading from '../Components/Loading'
import Profile from '../Components/Profile'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import {blue, grey, white, body, brown} from '../utils/colors'

const RouteConfigs = {
  Summary:{
    screen: Dashboard,
    navigationOptions: {
      headerShown:false,
      tabBarIcon: ({ tintColor }) => (
        <View style = {{alignItems:'center', justifyContent:'center', top:5}}>
          <FontAwesome name='home' size = {25} color={tintColor} />
          <Text
            style = {{color: tintColor, fontSize:12}}>
              Summary
            </Text>
        </View>
      )
    },
  },
  Calendar: {
    screen: EntryList,
    navigationOptions: {

      tabBarIcon: ({ focused }) => 
      {
        const colors = focused ? 'white' : '#007AFF'
        return(
          <View style = {{
            alignItems:'center', 
            justifyContent:'center', 
            top:-25,
            backgroundColor: colors,
            borderRadius:'50%',
            width:50,
            height:50,
            shadowColor: '#7F5DF0',
            shadowOffset:{
              width:0,
              height:10,
            },
            shadowOpacity:0.25,
            shadowRadius:3.5,
            elevation:5,
          }}>
            {focused ?<AntDesign name="pluscircle"  size = {47} color = '#e32f45' /> : <FontAwesome name='calendar-o' size = {28} color = 'white' />}
          </View>
        )
      },
      tabBarOnPress: (event) => {

        const { navigation } = event;
        event.defaultHandler();
        if (navigation.isFocused() && navigation.state.params && navigation.state.params.scrollToTop) {
          navigation.state.params.scrollToTop();
        }
      },
      
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View style = {{alignItems:'center', justifyContent:'center', top:5}}>
          <MaterialCommunityIcons name='sack' size = {25} color={tintColor} />
          <Text
              style = {{color: tintColor, fontSize:12}}>
                Profile
            </Text>
        </View>
      )
    }
  },
}


const TabNavigatorConfig = {
  screenOptions:{
    headerShown: false,
  },
  tabBarOptions: {
    activeTintColor: '#007AFF',
    showLabel: false,
    style: {
      shadowColor: '#7F5DF0',
      shadowOffset:{
      width:0,
      height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5,
      borderRadius:15,
      backgroundColor: '#fff',
    
    }
  }
};

const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

Tabs.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  return{
      header: null,
  }
}

const MainNavigator = createStackNavigator({
  Home:{
    screen: Tabs,
    title: "HOME",
  },
})

const Landing = createStackNavigator({
	Welcome:{
    	screen: Welcome,
      navigationOptions: ({ navigation }) => ({
      headerShown:false,
      header: null,
      }),
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
		Landing: Landing,
		AuthLoad: AuthLoad,
	},
	{
		initialRouteName: 'AuthLoad'
	}
))

export default Container
