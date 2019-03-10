import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import { TextLink } from '../components/common';
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
    console.log("login ", this.state.showLogin)
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
      <Fragment>
        <View style={styles.container}>
          {this.whichForm()}
        </View>
        <TextLink onPress={this.authSwitch}>
          Already have an account? Log in!
        </TextLink>
      </Fragment>
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
