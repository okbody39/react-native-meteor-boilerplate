import React, { Component } from 'react';
import { Alert, StyleSheet, Dimensions, Image } from 'react-native';
import {
  Container, Header, Button, Content, Left, Right, Icon, Body, Title, Text,
  Form, Item, Input, Label, Toast,
} from 'native-base';

import Meteor, { Accounts } from 'react-native-meteor';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../config/styles';
import logoImage from '../images/rn-logo.png';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordVisible: false,
      error: null,
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleError = (error) => {
    if (this.mounted) {
      if(error == null) {
        return;
      } else {
        //this.setState({ error });
        Toast.show({
          type: 'warning',
          text: error,
          position: 'bottom',
          buttonText: 'OK',
          // duration: 2000,
        });
      }
    }
  }

  validInput = (overrideConfirm) => {
    const { email, password, confirmPassword, confirmPasswordVisible } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
      valid = false;
    }

    if (!overrideConfirm && confirmPasswordVisible && password !== confirmPassword) {
      this.handleError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  }

  handleSignIn = () => {
    if (this.validInput(true)) {
      const { email, password } = this.state;

      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          // console.log(err);
          // this.handleError(err.reason);

          Alert.alert('로그인 오류', err.reason);
        }
        // console.log(err);
      });
    }
  }

  handleCreateAccount = () => {
    const { email, password, confirmPasswordVisible } = this.state;

    if (confirmPasswordVisible && this.validInput()) {
      Accounts.createUser({ email, password }, (err) => {
        if (err) {
          this.handleError(err.reason);
        } else {
          // hack because react-native-meteor doesn't login right away after sign in
          this.handleSignIn();
        }
      });
    } else {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({ confirmPasswordVisible: true });
    }
  }

  render() {
    return (

      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Login</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Form mb>
            <Item floatingLabel>
              <Label>email address</Label>
              <Input
                onChangeText={(email) => this.setState({ email })} />
            </Item>
            <Item floatingLabel>
              <Label>password</Label>
              <Input
                secureTextEntry
                onChangeText={(password) => this.setState({ password })} />
            </Item>
            {this.state.confirmPasswordVisible ?
              <Item floatingLabel>
                <Label>confirm password</Label>
                <Input
                  secureTextEntry
                  onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />
              </Item>
              : null}
          </Form>
          <Button mb block primary onPress={this.handleSignIn}><Text> Sign in </Text></Button>
          <Button mb block success onPress={this.handleCreateAccount}><Text> Create Account </Text></Button>
        </Content>
      </Container>
    );
  }
}

export default SignIn;
