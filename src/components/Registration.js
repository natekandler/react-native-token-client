import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, TextLink, Button, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

class Registration extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    error: '',
    loading: false
  };

  registerUser = () =>  {
    const { email, password, password_confirmation } = this.state;
    console.log("in register user")
    axios.post("http://localhost:4000/api/v1/sign_up", {
      user: {
        email,
        password, 
        password_confirmation
      }
    })
    .then(response => {
      deviceStorage.saveKey("id_token", response.data.jwt);
      this.props.newJWT(response.data.jwt)
    })
    .catch(error => {
      console.log(`Registration Error: ${error}`);
      this.onRegistrationFail();
    })

    this.setState({ error: '', loading: true });
  }

  onRegistrationFail = () => {
    this.setState({
      error: 'Registration Failed',
      loading: false
    })
  }

  render() {
    const { email, password, password_confirmation, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>
          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.registerUser}>
              Register
            </Button>
            :
            <Loading size={'large'} />
          }
        </View>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export default Registration;