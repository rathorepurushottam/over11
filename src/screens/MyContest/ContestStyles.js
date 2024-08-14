import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../theme/color';


const ContestStyles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width - 20,
    marginHorizontal: 10,
    flex: 1,
  },
  tabContainer: {
    
  },
  tabs: {
    height: 38,
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },
  tabbar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  filterContainer: {
    height: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginVertical: 5
  },
  filterIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
  },
  joinButtonMyContest: {
    height: 35,
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5
  },
});

export default ContestStyles;
