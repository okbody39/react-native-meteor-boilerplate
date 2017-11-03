import React, { Component } from 'react';
import { ListView, StyleSheet } from 'react-native';
import {
  Container, Header, Button, Content, Left, Right, Icon, Body, Title, Text,
  Form, Item, Input, Label, Toast, Footer, List, ListItem, Spinner,
} from 'native-base';
import PropTypes from 'prop-types';
import Meteor, { Accounts, connectMeteor } from 'react-native-meteor';
import { colors } from '../config/styles';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
});

@connectMeteor
class Details extends Component {

  getMeteorData() {
    const handle = Meteor.subscribe('details-list');

    return {
      detailsReady: handle.ready(),
      details: Meteor.collection('details').find() || [],
    };
  }

  constructor(props) {
    super(props);

    this.mounted = false;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      // listViewData: [],
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    // const {detailsReady, details} = this.data;
    //
    // if (detailsReady) {
    //   this.setState({listViewData: details});
    // }
  }

  // deleteRow(secId, rowId, rowMap) {
  //   rowMap[`${secId}${rowId}`].props.closeRow();
  //   const newData = [...this.state.listViewData];
  //   newData.splice(rowId, 1);
  //   this.setState({ listViewData: newData });
  // }

  render() {
    const {detailsReady, details} = this.data;

    if (!detailsReady) {
      return <Spinner />;
    }

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
          <Title>Details</Title>
          </Body>
          <Right />
        </Header>

        <Content>
          <List
            dataSource={this.ds.cloneWithRows(details)}
            renderRow={data =>
              <ListItem>
                <Text> {data.name} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data.name)}>
                <Icon active name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => console.log(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>

      </Container>
    );
  }
}
// connectMeteor(Details);
export default Details;
