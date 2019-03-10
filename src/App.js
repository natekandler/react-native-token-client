import React, { Component } from 'react';
import { View } from 'react-native';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';

export default class App extends Component {
  state = { jwt: '' };

  renderHomeView() {
    if (this.state.jwt) return <LoggedIn />
    return <Auth />
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        { this.renderHomeView() }
      </View>
    )
  }
}