import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import Container from './Navigation/Container'
import {createStackNavigator} from 'react-navigation'

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


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