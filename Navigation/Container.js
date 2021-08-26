import React from 'react';
import { StyleSheet, SafeAreaView, Animated, Text, View, StatusBar, Platform , Dimensions, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator, useBottomTabBarHeight} from 'react-navigation'
import {FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import Welcome from '../Components/Welcome'
import EntryList from '../Components/EntryList'
import BudgetList from '../Components/BudgetList'
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
        {console.log('test')}
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
        // Scroll to top
        if (navigation.isFocused() && navigation.state.params && navigation.state.params.scrollToTop) {
          console.log("1", navigation.state.params, navigation.state.params.scrollToTop)
          navigation.state.params.scrollToTop();
        }
      },



      /*tabBarOnPress: (scene, jumpToIndex, navigation) => {
        console.log('Tab is pressed!', navigation)
        if (navigation.state.index === 0) {
          const navigationInRoute = navigation.getChildNavigation(navigation.state.routes[0].key);

          if (!!navigationInRoute && navigationInRoute.isFocused() && !!navigationInRoute.state.params && !!navigationInRoute.state.params.scrollToTop) {
            navigationInRoute.state.params.scrollToTop();
          }
          else {
            navigation.navigate(navigation.state.key)
          }
        }


          const { route, index, focused } = scene;
          console.log(scene, jumpToIndex)
          if (route.index === 0) { // inside 1st screen of stacknavigator
            ReduxStore.dispatch(someAction());

            // Scroll to top
            const navigationInRoute = route.routes[0];
            if (!!navigationInRoute && !!navigationInRoute.params && !!navigationInRoute.params.scrollToTop) {
              navigationInRoute.params.scrollToTop();
            }

          }
          jumpToIndex(1); // Exit
          
        },*/
      
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

/*const tabBarOnPress = ({ navigation, defaultHandler }) => {
    const { isFocused, state, goBack } = navigation;
    console.log("ROUTE00",isFocused, state.routes.length)
    if (isFocused()) {
      console.log("ROUTE",state.routes.length)
        if (state.routes.length > 1) {
            for (let i = 0; i < state.routes.length - 1; i += 1) {
                goBack();
            }
        } else {
            // @TODO SCROLL TO TOP OF EACH TAB IF SCROLLABLE, $CALLBACK().
        }
    } else {
        defaultHandler();
    }
};*/


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
  /*const headerTitle = 
      <Text style = {{fontWeight: 'bold',
          color: white,
          fontSize: 20,
          letterSpacing: 1}}>
        {routeName}
      </Text>
  */
  return{
      header: null,
      /*headerTitle: headerTitle,*/
      headerStyle: {
        marginTop: StatusBar.currentHeight,
        backgroundColor: brown,
        height:0,
      },
      /*tabBarOnPress*/
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
