import { StyleSheet } from 'react-native';
import { NLCColor, NewColor, colors } from '../../theme/color';

const styles = StyleSheet.create({
  cardContainer: {
    height: 140,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    backgroundColor: NLCColor.white,
  },
  cardContainerTwo: {
    height: 140,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    position: 'relative',
    backgroundColor: colors.white
  },
  matchImage: {
    height: 111 - 22,
    width: '100%',
  },
  notifiedIcon: {
    height: 16,
    width: 16,
    position: 'absolute',
    right: 10,
    top: 5,
  },
  seriesNametext: {
    position: 'absolute',
    paddingHorizontal: 15,
    top: 0,
    borderTopWidth: 25,
    borderTopColor: NLCColor.lightWhite,
    borderLeftWidth: 0,
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: NewColor.lightBlue
  },
  linerLine: {
    height: 0.7,
    width: '95%',
    alignSelf: 'center',
    top: 30,
  },
  teamShortNameText: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  teamShortNameTextTwo: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  bottom: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 19,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 25,
    marginTop: 20,
  },
  teamImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 11,
    marginTop: -1,
  },
  teamName: {
    lineHeight: 15,
    marginTop: 15,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  lineUpOut: {
    alignSelf: "flex-end",
    marginRight: -16,
    marginTop: -10
  },
  greenCircle: {
    height: 8,
    width: 8,
    backgroundColor: colors.green,
    marginRight: 5,
    borderRadius: 50,
    marginTop: 5
  },
  contestName: {
    alignItems: 'center',
    paddingHorizontal: 6,
    flexDirection: 'row',
    width: 158,
    height: 21,
    
  
  },
  contestNameTwo: {
    borderWidth: 1,
    borderColor: '#5F338B15',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  teamShortName: {
    fontSize: 12,
    color: 'white',
  },
  completeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotView: {
    height: 8,
    width: 8,
    marginRight: 5,
    borderRadius: 100,
    backgroundColor: colors.green,
  },
  teamConunt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
