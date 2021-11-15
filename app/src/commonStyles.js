import {StyleSheet} from 'react-native';
import {COLORS} from './colors';
import { Dimensions } from 'react-native';
import {Platform} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  singleButton: {
    margin: 2,
    width: '50%',
    marginLeft: '25%'
  },
  doubleButton: {
    margin: 5,
    width: '45.45%'
  },
  backSection: {
    height: '4%',
    width: '90%',
    marginVertical: '2%',
    justifyContent: 'center',
    backgroundColor: '#3EA0BD',
  },
  headerBarStyle: {
    backgroundColor: COLORS.gradientPrimary,
    shadowOpacity: 0.4,
    shadowColor: COLORS.robinsEggBlue,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
  },
  pageView: {
    ...Platform.select({
    ios: {
      height: windowHeight - 120,
    },
    android: {
      height: windowHeight - 80,
    },
  }),
    justifyContent: 'space-between',
  },
  pageViewWithPadding: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlack,
    paddingHorizontal: '4%',
  },
  subScreenView: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.primaryBlack,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.gradientPrimary,
    borderRadius: 24,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowColor: COLORS.robinsEggBlue,
  },
  inputStyle: {
    height: 40,
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.secondaryWhite,
    borderRadius: 16,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowColor: COLORS.robinsEggBlue,
  },
  primaryButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: COLORS.robinsEggBlue,
    borderRadius: 16,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.7,
    shadowRadius: 4,
    shadowColor: COLORS.primaryWhite,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
    color: '#000',
  },
  primaryTextBlue: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 8,
    color: '#00C8BA',
  },
  secondaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#fff',
  },
  secondaryTextBlue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#00C8BA',
  },
  secondaryTextBlack: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#000',
  },
  secondaryTextGrey: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#757575',
  },
  tertiaryText: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 4,
    color: '#000',
  },
  tertiaryTextWhite: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 4,
    color: '#fff',
  },
  smallText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  dividerStyle: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
  },
  primaryTextOrange: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#E75F00',
  },
  tertiaryTextGreen: {
    color: '#00d142'
  },
  tertiaryTextRed: {
    color: '#d10000'
  },
  primaryTextGreen: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#00d142',
  },
  primaryTextRed: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#d10000',
  },
  smallTextRed: {
    fontSize: 10,
    fontWeight: 'bold',
    marginHorizontal: 2,
    color: '#d10000',
  },
});
