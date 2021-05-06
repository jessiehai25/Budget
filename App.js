import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import Container from './Navigation/Container'



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