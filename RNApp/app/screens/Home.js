import React, { Component } from 'react';
import { Alert, StyleSheet, Dimensions, Image } from 'react-native';
import {
  Container, Header, Button, Content, Left, Right, Icon, Body, Title, Text,
  Form, Item, Input, Label, Toast, Footer, CardItem, Thumbnail, Card,
  FooterTab,
} from 'native-base';
import Drawer from 'react-native-drawer';
import PropTypes from 'prop-types';
import Meteor, { Accounts } from 'react-native-meteor';
import { colors } from '../config/styles';
import Profile from '../screens/Profile';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        styles={{ shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 }}
        elevation={3}
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        content={<Profile />}
      >
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={() => this._drawer.open()}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
            <Title>Home</Title>
            </Body>
            <Right />
          </Header>

          <Content padder>
            {/*<Button block primary onPress={() => this.props.navigation.navigate('Details')}><Text> Details </Text></Button>*/}
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: 'http://www.lattetalk.co.kr/images/bn01.png'}} />
                  <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={{uri: 'http://www.lattetalk.co.kr/images/bn01.png'}} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent>
                    <Icon active name="thumbs-up" />
                    <Text>12 Likes</Text>
                  </Button>
                </Left>
                <Body>
                  <Button transparent>
                    <Icon active name="chatbubbles" />
                    <Text>4 Comments</Text>
                  </Button>
                </Body>
                <Right>
                  <Text>11h ago</Text>
                </Right>
              </CardItem>
            </Card>
          </Content>

        </Container>
      </Drawer>
    );
  }
}

export default Home;
