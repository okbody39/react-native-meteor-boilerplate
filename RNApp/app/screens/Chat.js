import React, { Component } from 'react';
import { Alert, StyleSheet, Dimensions, Image } from 'react-native';
import {
  Container, Header, Button, Content, Left, Right, Icon, Body, Title, Text,
  Form, Item, Input, Label, Toast, Footer, Card, CardItem, Thumbnail, DeckSwiper, View,
  FooterTab,
} from 'native-base';
import PropTypes from 'prop-types';
import Meteor, { Accounts } from 'react-native-meteor';
import { GiftedChat } from 'react-native-gifted-chat';
import { colors } from '../config/styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  containerView: {
    flex: 1,
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      messages: [],
    };
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
    this.mounted = true;
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    return (

      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>Chat</Title>
          </Body>
          <Right />
        </Header>

        <View style={styles.containerView}>
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        </View>

      </Container>
    );
  }
}

export default Chat;
