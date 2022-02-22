import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import Container from './Navigation/Container'
import {createStackNavigator} from 'react-navigation'

export default class App extends React.Component {

  render() {
  	console.log("APP")
    return (
      <Provider store = {createStore(reducer, middleware)}>

        <View style={{flex:1}}>

          <Container/>
        </View>
      </Provider>
    );
  }
}