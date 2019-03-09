import React, { Component } from 'react';
import { View } from 'react-native';
import { Login, Registration } from '../components';

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
    alignItems:'center'
  }
};
