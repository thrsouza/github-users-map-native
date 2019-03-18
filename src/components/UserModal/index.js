import React, { Component } from 'react';
import {
  View, Modal, Text, TextInput, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as ModalActions } from '../../store/ducks/modal';
import { Creators as UsersActions } from '../../store/ducks/users';

import styles from './styles';

class UserModal extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      visible: PropTypes.bool,
      cordinates: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ]),
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    username: '',
  };

  handleCancel = () => {
    const { hideModal } = this.props;
    this.setState({ username: '' });
    hideModal();
  };

  handleSave = async () => {
    const { loading } = this.props;
    if (loading) return;

    const { username } = this.state;
    if (!username) return;

    const {
      addUserRequest,
      hideModal,
      modal: { coordinates },
    } = this.props;

    await addUserRequest(username, coordinates);
    this.setState({ username: '' });
    hideModal();
  };

  render() {
    const { modal } = this.props;
    const { username } = this.state;

    return (
      <View>
        <Modal animationType="slide" transparent={false} visible={modal.visible}>
          <View style={styles.container}>
            <Text style={styles.title}>Add a new github user!</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this.setState({ username: text })}
              value={username}
            />
            <TouchableOpacity
              style={{ ...styles.button, ...styles.buttonSave }}
              onPress={this.handleSave}
            >
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, ...styles.buttonCancel }}
              onPress={this.handleCancel}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  loading: state.users.loading,
});

const actions = { ...ModalActions, ...UsersActions };
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserModal);
