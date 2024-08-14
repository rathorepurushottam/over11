import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppText,
  BLACK,
  ELEVEN,
  POPPINS_LIGHT,
  POPPINS_MEDIUM,
  TEN,
} from '../../common/AppText';
import ContestStyles from './ContestStyles';
import {TouchableOpacityView} from '../../common/TouchableOpacityView';
import {
  FILTER_ICON,
  rightArrow,
} from '../../helper/image';
import {colors} from '../../theme/color';
import {useSelector, useDispatch} from 'react-redux';
import { getFilterSortby, setAllContest, setLoading } from '../../slices/matchSlice';
const DATA = [
  {
    id: 1,
    title: 'ENTRY',
  },
  {
    id: 2,
    title: 'SPOTS',
  },
  {
    id: 3,
    title: 'PRIZE POOL',
  },
  {
    id: 4,
    title: '%WINNER',
  },
];
const FilterData = ({allContest}) => {
    const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedHighLow, setSelectedHighLow] = useState('high');
  const contestList = useSelector(state => state?.match?.contestList);
  const idArray =
    contestList &&
    contestList?.data?.flatMap(category =>
      category.data.map(entry => entry._id),
    );
  const filteredData =
    contestList &&
    contestList?.data?.map(value =>
      value?.data?.filter(e => idArray?.includes(e?._id)),
    );
  const idsFilter = filteredData && filteredData?.flat();
  const filterData = filterOption => {
    let sortedItems = [...idsFilter];
    if (filterOption?.title === 'PRIZE POOL') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => b.winning_amount - a.winning_amount);
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => a.winning_amount - b.winning_amount);
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    } else if (filterOption?.title === 'ENTRY') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => b.EnteryFee - a.EnteryFee);
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => a.EnteryFee - b.EnteryFee);
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    } else if (filterOption?.title === 'SPOTS') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => b.Contestsize - a.Contestsize);
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => a.Contestsize - b.Contestsize);
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    } else if (filterOption?.title === '%WINNER') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems.slice().sort((a, b) => {
          // Check for undefined or missing Winning_percent values
          const winningPercentA = a.Winning_percent || Number.NEGATIVE_INFINITY;
          const winningPercentB = b.Winning_percent || Number.NEGATIVE_INFINITY;

          return winningPercentB - winningPercentA;
        });
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        const highPricedItems = sortedItems.slice().sort((a, b) => {
          // Check for undefined or missing Winning_percent values
          const winningPercentA =
            a.Winning_percent !== undefined
              ? a.Winning_percent
              : Number.POSITIVE_INFINITY;
          const winningPercentB =
            b.Winning_percent !== undefined
              ? b.Winning_percent
              : Number.POSITIVE_INFINITY;

          return winningPercentA - winningPercentB;
        });
        dispatch(getFilterSortby(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    }
    // setrandom(Math.random());
  };
  const filterDataTwo = filterOption => {
    let sortedItems = [...allContestList];
    if (filterOption?.title === 'PRIZE POOL') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => b.winning_amount - a.winning_amount);
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => a.winning_amount - b.winning_amount);
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    } else if (filterOption?.title === 'ENTRY') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => b.EnteryFee - a.EnteryFee);
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => a.EnteryFee - b.EnteryFee);
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    } else if (filterOption?.title === 'SPOTS') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => b.Contestsize - a.Contestsize);
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems
          .slice()
          .sort((a, b) => a.Contestsize - b.Contestsize);
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    } else if (filterOption?.title === '%WINNER') {
      if (selectedHighLow == 'high') {
        dispatch(setLoading(true));
        const highPricedItems = sortedItems.slice().sort((a, b) => {
          // Check for undefined or missing Winning_percent values
          const winningPercentA = a.Winning_percent || Number.NEGATIVE_INFINITY;
          const winningPercentB = b.Winning_percent || Number.NEGATIVE_INFINITY;

          return winningPercentB - winningPercentA;
        });
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('low');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      } else if (selectedHighLow == 'low') {
        const highPricedItems = sortedItems.slice().sort((a, b) => {
          // Check for undefined or missing Winning_percent values
          const winningPercentA =
            a.Winning_percent !== undefined
              ? a.Winning_percent
              : Number.POSITIVE_INFINITY;
          const winningPercentB =
            b.Winning_percent !== undefined
              ? b.Winning_percent
              : Number.POSITIVE_INFINITY;

          return winningPercentA - winningPercentB;
        });
        dispatch(setAllContest(highPricedItems));
        setSelectedHighLow('high');
        setSelectedFilter(filterOption?.title);
        dispatch(setLoading(false));
      }
    }
    // setrandom(Math.random());
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacityView
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setSelectedFilter(item?.title),
            allContest ? filterDataTwo(item) : filterData(item);
        }}>
        <AppText
          type={TEN}
          weight={POPPINS_MEDIUM}
          style={ContestStyles.entryTitle}>
          {item?.title}
        </AppText>
        {item?.title == selectedFilter ? (
          <FastImage
            style={{
              height: 10,
              width: 8,
              marginRight: 10,
              transform: [
                {rotate: selectedHighLow == 'high' ? '270deg' : '90deg'},
              ],
            }}
            source={rightArrow}
            tintColor={colors.green}
            resizeMode="contain"
          />
        ) : (
          <></>
        )}
      </TouchableOpacityView>
    );
  };
  return (
    <View style={[ContestStyles.filterContainer]}>
      <AppText
        weight={POPPINS_LIGHT}
        style={{marginRight: 20, opacity: 0.8}}
        type={ELEVEN}
        color={BLACK}>
        Sort By:
      </AppText>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={DATA}
        horizontal
        renderItem={renderItem}
      />
      <TouchableOpacityView style={ContestStyles.filtermainbackground}>
        <FastImage
          source={FILTER_ICON}
          tintColor={colors.black}
          style={ContestStyles.filterIcon}
        />
      </TouchableOpacityView>
    </View>
  );
};

export default FilterData;
