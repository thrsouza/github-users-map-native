import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: metrics.borderRadius,
    height: 44,
    justifyContent: 'center',
    marginTop: metrics.margin,
  },
  buttonCancel: {
    backgroundColor: colors.secundary,
  },
  buttonSave: {
    backgroundColor: colors.primary,
  },
  container: {
    alignItems: 'stretch',
    backgroundColor: colors.darker,
    flex: 1,
    justifyContent: 'center',
    padding: metrics.padding * 4,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    height: 44,
    paddingHorizontal: metrics.padding,
  },
  text: {
    color: colors.white,
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: metrics.margin * 1.5,
    textAlign: 'center',
  },
});

export default styles;
