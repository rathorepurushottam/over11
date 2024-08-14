import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Screen } from '../theme/dimens';
import FastImage from 'react-native-fast-image';
import { IMAGE_BASE_URL } from '../helper/utility';
import { BannerLoop, ContextBg } from '../helper/image';

const BannerSlider = ({ bannerData }) => {
  // const bannerData = [
  //   {
  //     id: '1',
  //     image: BannerLoop,
  //   },
  //   {
  //     id: '2',
  //     image: BannerLoop,
  //   },
  //   {
  //     id: '3',
  //     image: BannerLoop,
  //   },
  // ];
  const carousel = useRef(null);
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: Screen.Width - 75, height: 80 }} key={index}>
        <FastImage
          resizeMode={'stretch'}
          style={styles.bannerStyle}
          source={item.image}
        />
      </View>
    );
  };
  const handleSnapToItem = index => {
  };
  return (
    <View>
      <Carousel
        ref={carousel}
        autoplay={true}
        autoplayInterval={2000}
        loop={true}
        bounces={true}
        scrollEnabled={true}
        removeClippedSubviews={false}
        initialScrollIndex={0}
        useScrollView={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerCustomStyle={{ height: 80, marginTop: 10 }}
        data={bannerData}
        renderItem={renderItem}
        sliderWidth={Screen.Width}
        itemWidth={Screen.Width - 80}
        layout={'default'}
        onSnapToItem={handleSnapToItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  first: {
    height: 170,
    marginTop: 10,
  },
  bannerView: {
    height: 80,
    borderRadius: 20,
  },
  bannerStyle: {
    height: 60,
    borderRadius: 10,
  },
});
export default BannerSlider;
