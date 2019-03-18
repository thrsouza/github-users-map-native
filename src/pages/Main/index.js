import React from 'react';
import { View, Alert, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Map from '~/components/Map';
import UserModal from '~/components/UserModal';

import { Creators as UsersActions } from '../../store/ducks/users';

import styles from './styles';

const Main = ({ operationResult }) => {
  if (!!operationResult && !!operationResult.message) {
    Alert.alert(operationResult.message);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#333" />
      <Map />
      <UserModal />
    </View>
  );
};

Main.propTypes = {
  operationResult: PropTypes.shape({
    message: PropTypes.string,
  }),
};

Main.defaultProps = {
  operationResult: {},
};

const mapStateToProps = state => ({
  operationResult: state.users.result,
});

const mapDispatchToProps = dispatch => bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
