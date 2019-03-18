import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default {
  margin: 10,
  padding: 20,
  borderRadius: 3,
  screenHeight: width < height ? height : width,
  screenWidth: width < height ? width : height,
};
