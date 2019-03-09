import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Registration from '../components/Registration';
import Login from '../components/Login';

export default class Auth extends Component {
  state = { showLogin: false };

  authSwitch = () => {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  whichForm = () => {
    if(!this.state.showLogin){
      return(
        <Registration authSwitch={this.authSwitch} />
      );
    } else {
      return(
        <Login authSwitch={this.authSwitch} />
      );
    }
  }

  render() {
    return(
      <View style={styles.container}>
         {this.whichForm()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: "#fff"
  }
};
