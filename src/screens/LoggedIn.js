import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { Button } from '../components/common';
import axios from 'axios';

class LoggedIn extends Component {
  state = {
    loading: true,
    email: '',
    error: ''
  }

  componentDidMount() {
    this.fetchUserInfo();

  }

  fetchUserInfo() {
    const headers = {'Authorization': `Bearer  ${this.props.jwt}`};

    axios({
      method: 'GET',
      url: 'http://localhost:4000/api/v1/my_user',
      headers: headers
    }).then(response => {
      this.setState({
        email: response.data.email,
        loading: false
      })
    }).catch(error => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      })
    })
  }


  renderEmailorError() {
    const { emailText, errorText } = styles;
    const { email, error } = this.state;
    if(email) {
      <Text style={emailText} >
        Your email: {email}
      </Text>
    } else {
      <Text style={errorText} >
        {error}
      </Text>
    } 
  }

  renderView() {
    const { container } = styles;
    const { loading } = this.state;
    if (loading) {
      return (
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
      return (
        <View style={container}>
         {this.renderEmailorError()}
        </View>
      )
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderView()}
      </Fragment>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};

export default LoggedIn;
