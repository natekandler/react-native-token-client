import React, { Component } from 'react';
import { View } from 'react-native';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';
import deviceStorage from './services/deviceStorage';

export default class App extends Component {


  constructor() {
    super();
    this.state = {
      jwt: '',
      loading: true
    }
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
  }

  newJWT = (jwt) => {
    this.setState({
      jwt: jwt
    });
  }  

  renderHomeView() {
    if (this.state.loading) return <Loading size={'large'} />;
    if (this.state.jwt) return <LoggedIn jwt={this.state.jwt} deleteJWT={this.deleteJWT}/>;
    return <Auth newJWT={this.props.newJWT}/>;
  }

  render() {
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        { this.renderHomeView() }
      </View>
    )
  }
}