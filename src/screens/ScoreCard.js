import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { universalPaddingHorizontal } from '../theme/dimens';
import FastImage from 'react-native-fast-image';
import { CurrentStar, downArrow } from '../helper/image';
import {
    AppText,
    WHITE,
    ELEVEN,
    NORMAL,
    TEN,
    THIRTEEN,
    TWELVE,
    BROWNYELLOW,
    RED,
    BLACK,
} from '../common/AppText';
import { TouchableOpacityView } from '../common/TouchableOpacityView';
import { useSelector } from 'react-redux';
import { NLCColor, colors } from '../theme/color';

const ScoreCard = ({ item, length, index, setUpDown, updown }) => {
    const matchDetails = useSelector(state => state?.match?.contestData);
    const [random, setRandom] = useState(10);
    const Batsmanrender = ({ item, index }) => {
        return (
            <>
                <View style={Styles.batsmanrender}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <AppText
                                color={RED}
                                style={{ opacity: 0.9 }}
                                type={ELEVEN}
                                weight={NORMAL}>
                                {item?.name}
                            </AppText>
                            {item?.batting == 'true' ? (
                                <FastImage
                                    style={{ height: 6, width: 6 }}
                                    resizeMode="contain"
                                    source={CurrentStar}
                                    tintColor={colors.brownYellow}
                                />
                            ) : (
                                <></>
                            )}
                        </View>
                        <AppText style={{ color: 'black', opacity: 0.5, fontSize: 9 }}>
                            {item?.how_out}
                        </AppText>
                    </View>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center' }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.runs}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.balls_faced}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.fours}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.sixes}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.strike_rate}
                    </AppText>
                </View>
                {index - 1 ? (
                    <></>
                ) : (
                    <View
                        style={{
                            height: 1,
                            backgroundColor: '#00000020',
                            marginHorizontal: 10,
                        }}
                    />
                )}
            </>
        );
    };
    const Bolwerrender = ({ item, index }) => {
        return (
            <>
                <View style={Styles.batsmanrender}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <AppText
                            style={{ flex: 1, opacity: 0.9 }}
                            color={RED}
                            type={TWELVE}
                            weight={NORMAL}>
                            {item?.name}
                        </AppText>
                        {item?.bowling === true ? (
                            <FastImage
                                style={{ height: 6, width: 6 }}
                                resizeMode="contain"
                                source={CurrentStar}
                                tintColor={NLCColor.LightRed}
                            />
                        ) : (
                            <></>
                        )}
                    </View>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center' }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.overs}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.maidens}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                 
                    >
                        {item?.runs_conceded}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.wickets}
                    </AppText>
                    <AppText
                        style={{ flex: 0.3, textAlign: 'center', opacity: 0.5 }}
                        type={TWELVE}
                        weight={NORMAL}
                    >
                        {item?.econ}
                    </AppText>
                </View>
                {index - 1 ? (
                    <></>
                ) : (
                    <View
                        style={{
                            height: 1,
                            backgroundColor: '#00000020',
                            marginHorizontal: 10,
                        }}
                    />
                )}
            </>
        );
    };

    const yetToBatplayer = ({ item }) => {
        return (
            <AppText

                weight={NORMAL}
                numberOfLines={1}
                style={{ fontSize: 13, opacity: 0.5 }}>
                {item.name},{' '}
            </AppText>
        );
    };

    const dorpDown = i => {
        setUpDown(updown == i ? '' : i);
        setRandom(Math.random());
    };

    return (
        <View style={[Styles.container, { marginBottom: 12 }]}>
            <TouchableOpacityView
                onPress={() => dorpDown(item?.name)}
                style={Styles.topView}>
                <View
                    style={{
                        flexDirection: length == 1 ? 'column' : 'row',
                        alignItems: length == 1 ? null : 'center',
                    }}>
                    <AppText type={TWELVE} weight={NORMAL} >
                        {matchDetails?.Status === 'Live'
                            ? item?.name
                            : item?.name.trim().split(' ')[0]}
                    </AppText>
                    {length == 1 ? (
                        <AppText type={THIRTEEN} weight={NORMAL} >
                            {item?.scores_full}
                        </AppText>
                    ) : (
                        <></>
                    )}
                </View>
                {length == 1 ? (
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center' }}>
                            <AppText
                                style={{ opacity: 0.5 }}
                                type={THIRTEEN}
                                weight={NORMAL}
                            >
                                CRR
                            </AppText>
                            <AppText
                                style={{ opacity: 0.5 }}
                                type={THIRTEEN}
                                weight={NORMAL}
                            >
                                {item?.equations?.runrate}
                            </AppText>
                        </View>
                        <TouchableOpacityView
                            onPress={() => dorpDown(item?.name)}
                            style={{
                                padding: 5,
                            }}>
                            <FastImage
                                style={[
                                    Styles.downArrow,
                                    {
                                        transform: [
                                            {
                                                rotate: `${updown == item?.name ? `180deg` : `0deg`}`,
                                            },
                                        ],
                                    },
                                ]}
                                resizeMode="contain"
                                source={downArrow}
                                tintColor={colors.white}
                            />
                        </TouchableOpacityView>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <AppText
                            style={{
                                marginRight: 10,
                            }}
                            type={THIRTEEN}
                            weight={NORMAL}
                        >
                            {item.scores_full}
                        </AppText>
                        <TouchableOpacityView
                            onPress={() => dorpDown(item?.name)}
                            style={{
                                padding: 5,
                            }}>
                            <FastImage
                                style={[
                                    Styles.downArrow,
                                    {
                                        transform: [
                                            {
                                                rotate: `${updown == item?.name ? `180deg` : `0deg`}`,
                                            },
                                        ],
                                    },
                                ]}
                                resizeMode="contain"
                                source={downArrow}
                                tintColor={colors.black}
                            />
                        </TouchableOpacityView>
                    </View>
                )}
            </TouchableOpacityView>
            {item?.name == updown ? (
                <>
                    <View style={Styles.batsmanView}>
                        <AppText
                            style={{ flex: 1 }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            Batsman
                        </AppText>
                        <AppText
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            R
                        </AppText>
                        <AppText
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            B
                        </AppText>
                        <AppText
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            4s
                        </AppText>
                        <AppText
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            6s
                        </AppText>
                        <AppText
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            SR
                        </AppText>
                    </View>
                    {item?.batsmen?.map(item => {
                        return <Batsmanrender item={item} />;
                    })}
                    {length == 1 ? (
                        <View style={Styles.totalView}>
                            <AppText

                                weight={NORMAL}
                                style={{ fontSize: 13 }}>
                                Total
                            </AppText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AppText
                                    style={{
                                        marginRight: 10,
                                    }}
                                    type={THIRTEEN}
                                    weight={NORMAL}
                                >
                                    {item.scores_full}
                                </AppText>
                                <AppText
                                    style={{
                                        marginRight: 10,
                                    }}
                                    type={THIRTEEN}
                                    weight={NORMAL}
                                >
                                    CRR {item?.equations?.runrate}
                                </AppText>
                            </View>
                        </View>
                    ) : (
                        <></>
                    )}
                    <View
                        style={{
                            height: 1,
                            backgroundColor: '#00000020',
                            marginHorizontal: 10,
                        }}
                    />
                    {item?.did_not_bat?.length ? (
                        <View style={Styles.yetbat}>
                            <AppText

                                weight={NORMAL}
                                style={{ fontSize: 13 }}>
                                Yet to bat
                            </AppText>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                <FlatList
                                    data={item?.did_not_bat}
                                    renderItem={yetToBatplayer}
                                    keyExtractor={(item, index) => {
                                        index.toString();
                                    }}
                                    numColumns={4}
                                />
                            </ScrollView>
                        </View>
                    ) : (
                        <></>
                    )}
                    <View style={Styles.bolwerView}>
                        <AppText
                            style={{ flex: 1 }}
                            type={TWELVE}
                            weight={NORMAL}
                            color={WHITE}
                        >
                            Bowler
                        </AppText>
                        <AppText
                            color={WHITE}
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                        >
                            O
                        </AppText>
                        <AppText
                            color={WHITE}
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                        >
                            M
                        </AppText>
                        <AppText
                            color={WHITE}
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                        >
                            R
                        </AppText>
                        <AppText
                            color={WHITE}
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                        >
                            W
                        </AppText>
                        <AppText
                            color={WHITE}
                            style={{ flex: 0.3, textAlign: 'center' }}
                            type={TWELVE}
                            weight={NORMAL}
                        >
                            ER
                        </AppText>
                    </View>
                    {item?.bowlers?.map(item => {
                        return <Bolwerrender item={item} />;
                    })}
                </>
            ) : (
                <></>
            )}
        </View>
    );
};

export { ScoreCard };
const Styles = StyleSheet.create({
    container: {
        borderRadius: 7,
        borderWidth: 1,
        borderColor: NLCColor.shadeRed,
        marginHorizontal: 10,
        marginVertical: 5,

    },
    topView: {
        paddingHorizontal: universalPaddingHorizontal,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    teamLogo: {
        height: 36,
        width: 29,
    },
    downArrow: {
        height: 24,
        width: 24,
    },
    batsmanView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        backgroundColor: NLCColor.LightRed,
        flexDirection: 'row',
        alignItems: 'center',
    },
    batsmanrender: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    yetbat: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    bolwerView: {
        backgroundColor: NLCColor.LightRed,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
