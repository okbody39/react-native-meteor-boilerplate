import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Details from '../screens/Details';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn';
import Cards from '../screens/Cards';
import Chat from '../screens/Chat';

import { Button, Text, Icon, Footer, FooterTab } from "native-base";

export const AuthStack = StackNavigator({
  SignIn: {
    screen: SignIn,
  },
}, {
  headerMode: 'none',
});

export const AppNavigator = TabNavigator(
  {
    Home: { screen: Home },
    Cards: { screen: Cards },
    Details: { screen: Details },
    Chat: { screen: Chat },
  },
  {
    swipeEnabled: false,
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Home")}>
              <Icon name="bowtie" />
              <Text>Home</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Cards")}>
              <Icon name="heart" />
              <Text>Card</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Details")}>
              <Icon name="briefcase" />
              <Text>Details</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("Chat")}>
              <Icon name="headset" />
              <Text>Chat</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);