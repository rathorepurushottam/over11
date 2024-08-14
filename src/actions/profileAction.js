import {updateDeviceToken, userLogout} from './authActions';
import {Dispatch} from 'redux';
import {appOperation} from '../appOperation';
import {logError, toastAlert} from '../helper/utility';
import NavigationService from '../navigation/NavigationService';
import {
  BOTTOM_NAVIGATION_STACK,
  BOTTOM_TAB_PROFILE_SCREEN,
  MY_BALANCE,
  OTP,
} from '../navigation/routes';
import {setLoading} from '../slices/authSlice';
import {
  setActivite,
  setKycDetails,
  setTransactionsContest,
  setTransactionsDeposit,
  setTransactionsWithdrawals,
  setUserData,
  setUserWalletData,
} from '../slices/profileSlice';
import {setCreateWallet} from '../slices/matchSlice';

export const getUserProfile =
  (isNavigate = true, isUpdate = false) =>
  async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.get_profile();
      if (response?.success) {
        isNavigate ? NavigationService.reset(BOTTOM_NAVIGATION_STACK) : null;
        isUpdate ? NavigationService.navigate(BOTTOM_TAB_PROFILE_SCREEN) : null;
        dispatch(setUserData(response?.data));
        dispatch(createWalletAPI(response?.data?._id));
        dispatch(setActivite(response.activity))
        dispatch(updateDeviceToken());
      } else {
        toastAlert.showToastError(response?.message);
      }
    } catch (e) {
      logError(e);
      dispatch(userLogout());
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const createWalletAPI = id => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.walletcreate(id);
    if (response?.status) {
      dispatch(setCreateWallet(response?.data));
    }
  } catch (error) {
    logError(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getUserWallet = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.get_wallet();
    if (response?.success) {
      dispatch(setUserWalletData(response?.data));
    }
    dispatch(getUserProfile(false, false));
  } catch (e) {
    logError(e);
    dispatch(setUserWalletData(undefined));
  } finally {
    dispatch(setLoading(false));
  }
};
export const getKycDetails = () => async dispatch => {
  try {
    const res = await appOperation.customer.getKycDetails();
    if (res?.code == 200) {
      dispatch(setKycDetails(res?.data));
    }
  } catch (e) {
    console.log('error in kycDetailsApi', e);
  }
};
export const sendKycOtp = data => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.sendKycOtp(data);
    dispatch(setLoading(false));
    if (res.code == 200) {
      toastAlert.showToastError(res.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log('error in kycDetailsApi', e);
  }
};
export const verifyKycOtp = data => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.verifyKycOtp(data);
    dispatch(setLoading(false));
    if (res.success) {
      toastAlert.showToastError(res.message);
      dispatch(getKycDetails());
      NavigationService.navigate(MY_BALANCE);
    } else {
      toastAlert.showToastError(res.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log(e);
  }
};
export const updateKyc = data => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.updateKyc(data);
    dispatch(setLoading(false));

    if (res.code == 200) {
      toastAlert.showToastError(res?.message);
      dispatch(getKycDetails());
      setTimeout(() => {
        NavigationService.navigate(MY_BALANCE);
      }, 1000);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log('error in kycDetailsApi', e);
  }
};
export const getTransactionsDeposit = (type) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.alltransactions(type);
    if (response?.success) {
      dispatch(setTransactionsDeposit(response?.data));
    }
  } catch (e) {
    logError(e);
  } finally {
    dispatch(setLoading(false));
  }
};


export const editProfile = (data, id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.editProfile(data, id);
    if (res?.code == 200) {
      toastAlert.showToastError(res?.message);
      dispatch(getUserProfile(false, true));
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};
