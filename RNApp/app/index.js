import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { Root, StyleProvider, Spinner } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from './theme/base-theme';

import { AuthStack, AppNavigator } from './config/routes';
import Loading from './components/Loading';
import settings from './config/settings';
import PropTypes from 'prop-types';

Meteor.connect(settings.METEOR_URL);

const RNApp = (props) => {
  const { status, user, loggingIn } = props;

  let userInfo = Meteor.user();

  if (status.connected === false || loggingIn) {
    return <Loading />;
  } else if (userInfo !== null) {
    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          <AppNavigator />
        </StyleProvider>
      </Root>
    );
  }
  return (
    <Root>
      <StyleProvider style={getTheme(material)}>
        <AuthStack />
      </StyleProvider>
    </Root>
  );
};

RNApp.propTypes = {
  status: PropTypes.object,
  user: PropTypes.object,
  loggingIn: PropTypes.bool,
};

export default createContainer(() => {
  return {
    status: Meteor.status(),
    user: Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  };
}, RNApp);
