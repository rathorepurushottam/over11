import { AppOperation } from './../../index';
import { CUSTOMER_TYPE } from '../../types';

export default (appOperation: AppOperation) => ({
    log_out: (data: any) => appOperation.post(`client_logout`, data, CUSTOMER_TYPE),
    get_profile: () =>
        appOperation.get(`user/profile`, undefined, undefined, CUSTOMER_TYPE),
    get_wallet: () =>
        appOperation.get(`wallet/user-wallet`, undefined, undefined, CUSTOMER_TYPE),
    walletcreate: (id: any) =>
        appOperation.post(`wallet/create-wallet?user=${id}`, {}, CUSTOMER_TYPE),
    getKycDetails: () =>
        appOperation.get(`user/kyc-details`, undefined, undefined, CUSTOMER_TYPE),
    sendKycOtp: (data: any) =>
        appOperation.post(`email-otp`, data, CUSTOMER_TYPE),
    verifyKycOtp: (data: any) =>
        appOperation.post(`user/verify-kyc-otp`, data, CUSTOMER_TYPE),
    updateKyc: (data: any) => appOperation.post(`user/update-kyc`, data, CUSTOMER_TYPE),
    uploadImg: (data: any) => appOperation.post(`upload`, data, CUSTOMER_TYPE),
    getSeriesData: () =>
        appOperation.post('TeamData/Serieslist', {}, CUSTOMER_TYPE),
    getContestList: (data: any) =>
        appOperation.post(
            `match/contests/${data?.matchid}`,
            data?.object,
            CUSTOMER_TYPE,
        ),
    editProfile: (data: any, id: any) =>
        appOperation.put(`user/update-profile?user=${id}`, data, CUSTOMER_TYPE),
    alltransactions: (type: any) =>
        appOperation.post(
            `user/transactions/${type}`,
            {},
            CUSTOMER_TYPE,
        ),
    getAllContest: (matchId: any, contestId: any) =>
        appOperation.get(
            `match/contests/${matchId}/${contestId}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    getIntro: () =>
        appOperation.get('intro', undefined, undefined, CUSTOMER_TYPE),
    getMyTeam: (id: any) =>
        appOperation.get(
            `match/my-teams/${id}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    getAllPlayers: (id: any, data: any) =>
        appOperation.post(
            `match/all-players/${id}`,
            data,
            CUSTOMER_TYPE,
        ),
    player_detail: (id: any) =>
        appOperation.get(
            `match/player-profile/${id}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    match_reminder: (data: any) =>
        appOperation.post(`user/save-match-reminders`, data, CUSTOMER_TYPE),
    otherUserProfile: (data: any) =>
        appOperation.get(
            `user/getprofile?user_id=${data}`,
            undefined, undefined,
            CUSTOMER_TYPE,
        ),
    upiVerifiy: (data: any) =>
        appOperation.post(
            `user/upiverifcation`,
            data,
            CUSTOMER_TYPE,
        ),
    phonePeGetway: (data: any) =>
        appOperation.post(
            `payment/gateway`,
            data,
            CUSTOMER_TYPE,
        ),
    phonePeGetwayTest: (data: any) =>
        appOperation.post(
            `paymenttest/gateway`,
            data,
            CUSTOMER_TYPE,
        ),

    adharverify: (data: any) =>
        appOperation.post(
            `user/verify_adhar`,
            data,
            CUSTOMER_TYPE,
        ),
    share_url: (id: any) =>
        appOperation.get(
            `match/share-team/${id}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    getMyJoinedContest: (id: any) =>
        appOperation.get(
            `match/my-contests/${id}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    saveTeam: (data: any) => appOperation.post(`match/create-team`, data, CUSTOMER_TYPE),
    editTeam: (data: any) => appOperation.put(`match/update-team`, data, CUSTOMER_TYPE),
    refresh_token: () =>
        appOperation.get(`user/refresh-token`, undefined, undefined, CUSTOMER_TYPE),
    fcm_token: (data: any) =>
        appOperation.post(`user/save-firebase-token`, data, CUSTOMER_TYPE),
    getPrizeList: (id: any) =>
        appOperation.get(
            `match/winner-prizes/${id}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    getPrizeListPrivate: (id: any, privateis: any) =>
        appOperation.get(
            `match/winner-prizes/${id}/${privateis}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    joinContest: (data: any) =>
        appOperation.post(`match/join-contest`, data, CUSTOMER_TYPE),

    getMyMatchesData: (status: any) =>
        appOperation.get(
            `match/list?status=${status}&limit=100&skip=0`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    createContest: (newData: { matchid1: any; data1: any; }) =>
        appOperation.post(
            `match/usercontest/${newData?.matchid1}`,
            newData?.data1,
            CUSTOMER_TYPE,
        ),
    getMyCreateContest: (id: any) =>
        appOperation.get(
            `match/myusercontest/${id}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    joinContestUserPri: (data: any) =>
        appOperation.post(`match/joinuserContest`, data, CUSTOMER_TYPE),
    share_Team: (data: { newId: any; second: any; matchid: any; }) =>
        appOperation.get(`match/share-team/${data?.newId}/${data?.second}/${data?.matchid}`, undefined, undefined, CUSTOMER_TYPE),
    getMyShareCreateContest: (id: any, category: any) =>
        appOperation.get(
            `match/sharedcontest/${id}?contest_category_id=${category}`,
            undefined,
            undefined,
            CUSTOMER_TYPE,
        ),
    share_Team_Data: (data: { first: any; second: any; }) =>
        appOperation.get(`match/matchedata/${data?.first}/${data?.second}`, undefined, undefined, CUSTOMER_TYPE),
    addharSendOtp: (data: any) =>
        appOperation.post(
            `user/addadharotp`, data, CUSTOMER_TYPE),
    adhaarOtpVerifiry: (data: any) =>
        appOperation.post(
            `user/verify_adhar`, data, CUSTOMER_TYPE),
    emailOtpVerifiry: (data: any) =>
        appOperation.post(
            `verify_email`, data, CUSTOMER_TYPE),
    panVerifiyKyc: (data: any) =>
        appOperation.post(
            `user/pan_verify`, data, CUSTOMER_TYPE),
    dlVerifiyKyc: (data: any) =>
        appOperation.post(
            `user/dlverify`, data, CUSTOMER_TYPE),
    bankVerifiyKyc: (data: any) =>
        appOperation.post(
            `user/verifybankaccount`, data, CUSTOMER_TYPE),
    ifscVerifiyKyc: (data: any) =>
        appOperation.post(
            `user/checkifsc`, data, CUSTOMER_TYPE),
    deleteaccount: () =>
        appOperation.get(
            `user/bankdelete`, undefined, undefined, CUSTOMER_TYPE),
    deleteUpi: () =>
        appOperation.get(
            `user/upidelete`, undefined, undefined, CUSTOMER_TYPE),
    payout: (data: any) =>
        appOperation.post(
            `payment/payout`, data, CUSTOMER_TYPE),
});
