import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Creators as ModalActions } from '../../store/ducks/modal';

import styles from './styles';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGhpYWdvZGVzb3V6YSIsImEiOiJjanN0a2g4djQxOTEwNDlyejJjN2pjZngwIn0.BkSEA_sxFp3K3A6KQ8VgYQ',
);

class Map extends Component {
  state = {
    coordinates: [-51.166009, -23.319775],
  };

  static propTypes = {
    users: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          login: PropTypes.string,
          avatar: PropTypes.string,
          coordinates: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
          }),
        }),
      ),
    }).isRequired,
    showModal: PropTypes.func.isRequired,
  };

  handleMapClick = async ({ geometry }) => {
    const { showModal } = this.props;
    const [longitude, latitude] = geometry.coordinates;

    const coordinates = { latitude, longitude };
    showModal({ coordinates });
  };

  render() {
    const { coordinates } = this.state;
    const { users } = this.props;

    return (
      <MapboxGL.MapView
        centerCoordinate={coordinates}
        style={styles.container}
        showUserLocation={false}
        styleURL={MapboxGL.StyleURL.Dark}
        onLongPress={this.handleMapClick}
      >
        {users.data.map((user) => {
          const userPosition = [user.coordinates.longitude, user.coordinates.latitude];
          const userId = String(user.id);

          return (
            <MapboxGL.PointAnnotation id={userId} key={userId} coordinate={userPosition}>
              <View style={styles.annotationContainer}>
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
              </View>
              <MapboxGL.Callout style={styles.callout}>
                <Text style={styles.calloutName}>{user.name}</Text>
                <Text style={styles.calloutBio}>{user.bio}</Text>
              </MapboxGL.Callout>
            </MapboxGL.PointAnnotation>
          );
        })}
      </MapboxGL.MapView>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
