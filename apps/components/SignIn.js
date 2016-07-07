/**
 * Created by roger on 2016. 6. 28..
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    TextInput,
    TouchableHighlight
} from 'react-native';
import {serverUrl, headers} from '../config';
import Master from './Master';
import { loginStyles as styles } from '../styles/Login';

let actions = null;
let User = null;
export default class SignIn extends Component {

  constructor(props) {
    super(props);

    console.log("constructor props ", props);
  }

  _signIn() {
    actions.signIn(User.login.username, User.login.password);
  }

  _trade() {

    let form = new FormData();
    form.append('service', 'updown');
    form.append('assetCode', 'EUR/USD');
    form.append('assetName', 'EUR/USD');
    form.append('expiry', '1');
    form.append('position', 'UP');
    form.append('amount', '0.002');
    form.append('agent', 'IOS');
    form.append('currencyType', 'BTC');

    fetch(`${serverUrl}/api/orders`, {
      credentials: 'include', //pass cookies, for authentication
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'MOBILE': 'IOS'
      },
      body: form
    })
        .then((response) => {

          console.log("_trade response", response);
//          console.log("response.json", response.json());
          return response.json()
        })
        .then((resText) => {

          console.log("_trade resText", resText);
        })
        .catch((error) => {
          console.log("_trade error ", error);
        });
  }

  _handleInput(event, type) {
console.log("type is ", event.nativeEvent.text.trim())
    if (type === 'username')
      actions.setUsername(event.nativeEvent.text.trim());
    else
      actions.setPassword(event.nativeEvent.text.trim());
  }

  componentWillReceiveProps(nextProps) {

    actions = nextProps.actions;
    User = nextProps.User;

    console.log("componentWillReceiveProps");

    if (User.login.isLoggedIn) {

      actions.loginEnd(actions);

      actions.push(Object.assign({}, {
        name: 'tab1',
        tabBarName: 'tabBar',
      }))
    }

  }

  render() {
    actions = this.props.actions;
    User = this.props.User;

    if (User.login.isLoggingIn) {
      return (
          <ActivityIndicator
              style={styles.preloader}
              animating={User.login.isLoggingIn}
              color="#111"
              size="large"/>
      );
    }

    return (
        <View style={styles.container}>
          <Image style={styles.bg} source={require('../assets/login_bg.jpg')}/>
          <View style={styles.header}>
            <Image style={styles.mark} source={require('../assets/mark.png')}/>
          </View>
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Image style={styles.inputUsername} source={require('../assets/input_username.png')}/>
              <TextInput
                  style={[styles.input, styles.whiteFont]}
                  placeholder="Username"
                  placeholderTextColor="#FFF"
                  value={User.login.username}
                  onChange={(obj) => this._handleInput(obj, 'username')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Image style={styles.inputPassword} source={require('../assets/input_password.png')}/>
              <TextInput
                  password={true}
                  style={[styles.input, styles.whiteFont]}
                  placeholder="Password"
                  placeholderTextColor="#FFF"
                  value={User.login.password}
                  onChange={(obj) => this._handleInput(obj, 'password')}
              />
            </View>
            {
              User.login.error ?
                  <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>{User.login.error}</Text>
                  </View>
                  :
                  null
            }
          </View>
          <TouchableHighlight onPress={this._signIn}>
            <View style={styles.signin}>
              <Text style={styles.whiteFont}>Sign In</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.signup}>
            <Text style={styles.greyFont}>Don't have an account?<Text style={styles.whiteFont}> Sign Up</Text></Text>
          </View>
        </View>
    );
  }
}
