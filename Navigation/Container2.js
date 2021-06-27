import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, StatusBar, Platform , Dimensions, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {FontAwesome, MaterialCommunityIcons,} from '@expo/vector-icons'
import Welcome from '../Components/Welcome'
import EntryList from '../Components/EntryList'
import BudgetList from '../Components/BudgetList'
import AddBudget from '../Components/AddBudget'
import EditBudget from '../Components/EditBudget'
import Dashboard from '../Components/Dashboard'
import Loading from '../Components/Loading'
import Setting from '../Components/Setting'
import {blue, grey, white, body, brown} from '../utils/colors'

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style = {{
      top:-30,
      justifyContent:'center',
      alignItems:'center',
      shadow:{
      shadowColor: '#7F5DF0',
      shadowOffset:{
        width:0,
        height:10,
      },
      shadowOpacity:0.25,
      shadowRadius:3.5,
      elevation:5,
      }
    }}
    onPress = {onPress}
    >
      <View style = {{

        width:70,
        height:70,
        borderRadius: 35,
        backgroundColor: 'orange'
      }}>
        {console.log('checking CustomTabBarButton')}
        {children}
      </View>
    </TouchableOpacity>
  )


const RouteConfigs = {
  Summary:{
    screen: Dashboard,
    navigationOptions: {
  
      tabBarIcon: ({ tintColor }) => (
        <View style = {{alignItems:'center', justifyContent:'center', top:5}}>
          <FontAwesome name='home' size = {25} color={tintColor} />
          <Text
            style = {{color: tintColor, fontSize:12}}>
              Home
            </Text>
        </View>
      )
    },
  },
  Calendar: {
    title:"ENTRY",
    screen: EntryList,
    navigationOptions: {
      tabBarButton: (props) => (
        <CustomTabBarButton{...props} />
        ),
      tabBarIcon: ({ focused }) => (
        <View style = {{
          alignItems:'center', 
          justifyContent:'center', 
          top:-35,
          shadow:{
          shadowColor: '#7F5DF0',
          shadowOffset:{
            width:0,
            height:10,
          },
          shadowOpacity:0.25,
          shadowRadius:3.5,
          elevation:5,
          }
        }}>
          <FontAwesome name='plus-circle' size = {50} color = {focused ? '#007AFF': '#e32f45'} />
          </View>
      ),
      
    }
  },

  Budget: {
    screen: BudgetList,

    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <View style = {{alignItems:'center', justifyContent:'center', top:5}}>
          <MaterialCommunityIcons name='sack' size = {25} color={tintColor} />
          <Text
              style = {{color: tintColor, fontSize:12}}>
                My Budget
            </Text>
        </View>
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
    if(isIOS11) return 83;
    return 49;
}

const TabNavigatorConfig = {

  tabBarOptions: {
    activeTintColor: '#007AFF',
    showLabel: false,
    style: {
      position: 'absolute',
      bottom:25,
      left:20,
      right:20,
      height:78,
      elevation:9,
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

const styles = StyleSheet.create({
  shadow:{
    shadowColor: '#7F5DF0',
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5,
  }
})

const Tabs =
  Platform.OS === "ios"
  ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
  : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

Tabs.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index]
  const headerTitle = 
      <Text style = {{fontWeight: 'bold',
          color: white,
          fontSize: 20,
          letterSpacing: 1}}>
        {routeName}
      </Text>
  return{
      safeAreaInset: { bottom: 'always', top: 'always' },
      headerTitle: headerTitle,
      headerStyle: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: brown,
        height:40,
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
