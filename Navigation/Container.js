import React from 'react';
import { StyleSheet, SafeAreaView, Animated, Text, View, StatusBar, Platform , Dimensions, TouchableOpacity} from 'react-native';
import {NavigationContainer, useRoute, useNavigationState} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import Welcome from '../Components/Welcome'
import EntryList from '../Components/EntryList'
import EditBudget from '../Components/EditBudget'
import Dashboard from '../Components/Dashboard'
import Loading from '../Components/Loading'
import Profile from '../Components/Profile'
import {blue, grey, white, body, brown} from '../utils/colors'

const RouteConfigs = {
  Summary:{
    screen: Dashboard,
    navigationOptions: {
      headerShown:false,
      tabBarIcon: ({ tintColor }) => (
        <View style = {{alignItems:'center', justifyContent:'center', top:5, width:100}}>
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
        const colors = focused ? 'white' : brown
        return(
          <View style = {{
            alignItems:'center', 
            justifyContent:'center', 
            top:-25,
            backgroundColor: colors,
            borderRadius:'50%',
            width:60,
            height:60,
            shadowColor: '#7F5DF0',
            shadowOffset:{
              width:0,
              height:10,
            },
            shadowOpacity:0.25,
            shadowRadius:3.5,
            elevation:5,
          }}>
            {focused ?<AntDesign name="pluscircle"  size = {60} color = '#FFA800' /> : <FontAwesome name='calendar-o' size = {32} color = 'white' />}
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
        <View style = {{alignItems:'center', justifyContent:'center', top:5, width:100}}>
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
    activeTintColor: brown,
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
/*
const Tabs = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

Tabs.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  return{
      header: null,
  }
}
*/
const Tab = createBottomTabNavigator();
function MyTabs() {
const route = useRoute();
console.log(route);

  return (
    <Tab.Navigator
      initialRouteName="Summary"

      screenOptions={{
        headerShown: false,
        
        tabBarActiveTintColor: brown,
        showLabel: false,
        style: {
          shadowColor: '#7F5DF0',
          shadowOffset:{
          width:0,
          height:10,
          },
          fontSize:12,
          shadowOpacity:0.25,
          shadowRadius:3.5,
          elevation:5,
          borderRadius:15,
          backgroundColor: '#fff',
        }
      }}
    >
      <Tab.Screen
        name="Summary"
        component={Dashboard}
        options={{
          headerShown:false,
          tabBarIcon: ({ color }) => (
           
              <FontAwesome name='home' size = {25} color={color} />

          )
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={EntryList}
        listeners={({ navigation, route, params}) => ({
          // tabPress: (event) => {
          //     console.log("PRESS2",navigation)
          //     const { navigation } = event;
          //     /*event.defaultHandler();*/
          //     console.log(navigation)
          //     if (navigation.isFocused() && navigation.state.params && navigation.state.params.scrollToTop) {
          //       navigation.state.params.scrollToTop();
          //     }
          //   },
          // })
          tabPress: (e) => {
      // Prevent default action

      // Do something with the `navigation` object

      if (navigation.isFocused() && route.params && route.params.scrollToTop) {
          route.params.scrollToTop();
      }
    },
  })}
        
        options={{
          tabBarIcon: ({ focused }) => 
            {
              const colors = focused ? 'white' : brown
              return(
                <View style = {{
                  alignItems:'center', 
                  justifyContent:'center', 
                  top:-25,
                  backgroundColor: colors,
                  borderRadius:'50%',
                  width:60,
                  height:60,
                  shadowColor: '#7F5DF0',
                  shadowOffset:{
                    width:0,
                    height:10,
                  },
                  shadowOpacity:0.25,
                  shadowRadius:3.5,
                  elevation:5,
                }}>
                  {focused ?<AntDesign name="pluscircle"  size = {60} color = '#FFA800' /> : <FontAwesome name='calendar-o' size = {32} color = 'white' />}
                </View>
              )
            }

          }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='sack' size = {25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/*
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
      navigationOptions: ({ navigation }) => ({
      headerShown:false,
      header: null,
      }),
  	},
})*/

const Stack = createStackNavigator();

export default function Container() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthLoad"

      >
        <Stack.Screen 
          name="AuthLoad" 
          component={Loading}
          options={{
            headerShown:false,
            header: null,
        }}
        />
        <Stack.Screen 
          name="Main" 
          component={MyTabs}
          options={{
            headerShown:false,
            header: null,
        }}
        />
        <Stack.Screen 
          name="Landing" 
          component={Welcome}
          options={{
            headerShown:false,
            header: null,
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
