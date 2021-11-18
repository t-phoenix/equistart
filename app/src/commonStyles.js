import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  button: {
    borderRadius: 30
  },
  buttonGrey: {
    borderRadius: 30,
    backgroundColor: '#27292A',
    borderColor: '#27292A',
  },
  singleButton: {
    margin: 2,
    width: '50%',
    marginLeft: '25%',
    borderRadius: 30
  },
  singleButtonGrey: {
    margin: 2,
    width: '50%',
    marginLeft: '25%',
    borderRadius: 30,
    backgroundColor: '#27292A',
    borderColor: '#27292A',
  },
  doubleButton: {
    margin: 5,
    width: '45.45%',
    borderRadius: 30
  },
  doubleButtonGrey: {
    margin: 5,
    width: '45.45%',
    borderRadius: 30,
    backgroundColor: '#27292A',
    borderColor: '#27292A',
  },
  card: {
    borderRadius: 20,
    margin: 4
  },
  rowButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '8%'
  },
  backSection: {
    height: '4%',
    width: '90%',
    marginVertical: '2%',
    justifyContent: 'center',
    backgroundColor: '#3EA0BD',
  },
  headerBarStyle: {
    backgroundColor: '#1d2023',
    shadowOpacity: 0.4,
    shadowColor: COLORS.robinsEggBlue,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  pageView: {
    ...Platform.select({
      ios: {
        height: windowHeight - 80,
      },
      android: {
        height: windowHeight - 80,
      },
    }),
    justifyContent: 'space-between',
    backgroundColor: '#212427',
  },
  pageContent: {
    marginHorizontal: '4%',
    marginTop: '2%',
    ...Platform.select({
      ios: {
        height: windowHeight - 180,
      },
      android: {
        height: windowHeight - 140,
      },
    }),
  },
  input: {
    flex: 1,
    margin: 4,
    borderWidth: 0,
    backgroundColor: '#212427',
  },
  inputLabel: {
    color: '#9e9e9e',
    fontWeight: 'bold'
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
    shadowOffset: { width: 0, height: 0 },
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
    shadowOffset: { width: 2, height: 2 },
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
    shadowOffset: { width: 2, height: 2 },
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
    color: '#6B6E77',
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
    color: '#E4C2A6',
  },
  tertiaryTextGreen: {
    color: '#00d142'
  },
  tertiaryTextRed: {
    color: '#cc2525'
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
    color: '#cc2525',
  },
  smallTextRed: {
    fontSize: 10,
    fontWeight: 'bold',
    marginHorizontal: 2,
    color: '#cc2525',
  },
  primaryTextWhite: {
    fontSize: 23,
    fontWeight: 'bold',
    marginVertical: 2,
    color: '#ffffff',
  },
  tertiaryTextGrey: {
    fontSize: 12,
    marginVertical: 1,
    color: '#6B6E77',
  },
  tertiaryTextBlack: {
    fontSize: 12,
    marginVertical: 1,
    color: '#000000',
  },
  secondaryTextWhite: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
    color: '#FFFFFF',
  }
});
