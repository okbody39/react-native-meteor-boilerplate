import React, { Component } from 'react';
import { Alert, StyleSheet, Dimensions, Image } from 'react-native';
import {
  Container, Header, Button, Content, Left, Right, Icon, Body, Title, Text,
  Form, Item, Input, Label, Toast, Footer, Card, CardItem, Thumbnail, DeckSwiper, View,
  FooterTab,
} from 'native-base';
import PropTypes from 'prop-types';
import Meteor, { Accounts } from 'react-native-meteor';
import { colors } from '../config/styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: {uri: 'http://www.lattetalk.co.kr/images/bn01.png'},
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: {uri: 'http://www.lattetalk.co.kr/images/bn01.png'},
  },
];

class Cards extends Component {
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

      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>Home</Title>
          </Body>
          <Right />
        </Header>

        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={item.image} />
                    <Body>
                    <Text>{item.text}</Text>
                    <Text note>NativeBase</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ height: 300, flex: 1 }} source={item.image} />
                </CardItem>
                <CardItem>
                  <Icon name="heart" style={{ color: '#ED4A6A' }} />
                  <Text>{item.name}</Text>
                </CardItem>
              </Card>
            }
          />
        </View>

      </Container>
    );
  }
}

export default Cards;
