import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  annotationContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius * 30,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  avatar: {
    borderRadius: metrics.borderRadius * 30,
    height: 50,
    transform: [{ scale: 0.9 }],
    width: 50,
  },
  callout: {
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    padding: metrics.padding,
    width: 200,
  },
  calloutBio: {
    fontSize: 9,
  },
  calloutName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: metrics.margin / 2,
  },
  container: {
    flex: 1,
  },
});

export default styles;
