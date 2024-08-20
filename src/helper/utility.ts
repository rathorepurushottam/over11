import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_TOKEN_KEY } from './Constants';
import { appOperation } from '../appOperation';
import { all_rounderIcon, batsmanIcon, bowlerIcon, wicket_keeperIcon } from './image';
import { poppinsBold } from '../theme/typography';
import { Share, ToastAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';


export const setAadharNumber = (text: string) => {
  let temp = text
    .replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
  return temp;
};
export const onAppStart = async (store: any) => {
  try {
    const customerToken: any = await AsyncStorage.getItem(USER_TOKEN_KEY);
    appOperation.setCustomerToken(customerToken);
  } catch (error) {
    console.log(error);
  }
};
export const shareToAny = (message: string) => {
  const shareOptions = {
    message: message,
  };

  Share.share(shareOptions);
};
export const formatAadharNumber = (aadharNumber: string) => {
  const cleanNumber = aadharNumber.replace(/\D/g, '');
  const formattedNumber = cleanNumber.replace(/(.{4})/g, '$1 ');
  return formattedNumber.trim();
};
export const checkValidAdharCardNumber = (adharNumber: string) => {
  let regex = new RegExp(/^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/);
  return regex.test(adharNumber);
};
export const emailRegex = (email: string) => {
  let regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
  return regex.test(email);
}
export const checkValidPanCardNumber = (panNumber: string) => {
  let regex = new RegExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/);
  return regex.test(panNumber);
};
export const checkValidDlNumber = (dlNumber: string) => {
  let regex = new RegExp(/^[a-zA-Z0-9]{1,20}$/);
  return regex.test(dlNumber);
};
export const checkVoterDlNumber = (voterNumber: string) => {
  let regex = new RegExp(/^[a-zA-Z]{3}[0-9]{7}$/);
  return regex.test(voterNumber);
};
export const checkUPIDlNumber = (upiNumber: string) => {
  let regex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9._@-]{4,49}$/);
  return regex.test(upiNumber);
};
export const ifsclNumber = (ifscNumber: string) => {
  let regex = new RegExp(/^[A-Z]{4}0[A-Z0-9]{6}$/);
  return regex.test(ifscNumber);
};
export const validateEmail = (email: string) => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(email);
};

export const validateMobile = (number: string) => {
  const expression = /^[0-9]*$/;
  return expression.test(number);
};
export function numberWithCommas(x: { toString: () => string; }) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const fixedToTwo = (value: number) => {
  let temp = value?.toFixed(2);
  return temp;
};
export const BaseUrl = 'http://api.over11.in/'
export const IMAGE_BASE_URL = 'http://api.over11.in/';

export const toastAlert = {
  showToastSuccess: (message: any, duration = 2500) => { },
  showToastError: (message: string, duration = 2500) => {
    Platform.OS == 'ios' ?
      Toast.show({
        type: 'success',
        text1: 'Over11 Fantasy',
        text2: `${message}`,
        text2Style: { fontSize: 12, fontFamily: poppinsBold },
        text1Style: { fontFamily: poppinsBold },
      }) :
      ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.LONG);
  },
};
export const iosToast = (message: any) => {
  Toast.show({
    type: 'success',
    text1: 'Over11 Fantasy',
    text2: `${message}`
  })
}
export const logError = (error: unknown) => {
  console.log(error);
};
export const modifyName = (name: string) => {
  const nameParts = name?.split(' ');
  if (nameParts?.length >= 3) {
    const modifiedName =
      nameParts[0].charAt(0).toUpperCase() +
      ' ' +
      nameParts[nameParts?.length - 1];
    return modifiedName?.length == 9 ? modifiedName : modifiedName?.length > 9 ? modifiedName?.slice(0, 7) + '..' : modifiedName;
  } else if (nameParts?.length >= 2) {
    const modifiedName =
      nameParts[0].charAt(0).toUpperCase() + ' ' + nameParts[1];
    return modifiedName?.length == 9 ? modifiedName : modifiedName?.length > 9 ? modifiedName?.slice(0, 7) + '..' : modifiedName;
  }
  return name?.length == 9 ? name : name?.length > 9 ? name?.slice(0, 7) + '..' : name;
};

export const formatDate = (dateString: string | number | Date) => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const isToday = inputDate.toDateString() === currentDate.toDateString();
  const isYesterday = inputDate.toDateString() === new Date(currentDate - 86400000).toDateString(); // 86400000 milliseconds in a day

  if (isToday) {
    return 'Today ' + inputDate.toLocaleTimeString('en-US', timeOptions);
  } else if (isYesterday) {
    return 'Yesterday ' + inputDate.toLocaleTimeString('en-US', timeOptions);
  } else {
    return inputDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + inputDate.toLocaleTimeString('en-US', timeOptions);
  }
}
export const nameSlice = (name: string) => {
  let nameTwo = name.split(' ')[0]
  if (nameTwo.length > 8) {
    const truncatedName = nameTwo.slice(0, 6) + "..";
    return truncatedName
  } else {
    return nameTwo
  }
}
export const nameSliceTwo = (name: string) => {
  let nameTwo = name.split(' ')[0]
  if (nameTwo.length > 5) {
    const truncatedName = nameTwo.slice(0, 5) + "..";
    return truncatedName
  } else {
    return nameTwo
  }
}
export const transformData = (originalData: any[]) => {
  return originalData && originalData?.map((contest: { name: any; winning_amount: any; more: any; data: any; }) => {
    const { name, winning_amount, more, data } = contest;

    const transformedContestData = data
      .map((contestData: any) => ({ ...contestData })) // Copy contestData to avoid modifying the original array
      .sort((a: { winning_amount: number; }, b: { winning_amount: number; }) => b.winning_amount - a.winning_amount); // Sort by winning_amount in descending order

    return {
      name,
      winning_amount,
      more,
      data: transformedContestData?.slice(0, 2),
    };
  }).sort((a: { winning_amount: number; }, b: { winning_amount: number; }) => b.winning_amount - a.winning_amount);
};

export const playerRollImage = (SUBSID: string, array: {
  profile_image: any; playing_role: string;
}[]) => {
  if (SUBSID === 'SUB-1') {
    if (array[0]?.profile_image) {
      return { uri: array[0]?.profile_image }
    } else if (array[0]?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array[0]?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array[0]?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array[0]?.playing_role === 'all') {
      return all_rounderIcon
    }
  } else if (SUBSID === 'SUB-2') {
    if (array[0]?.profile_image) {
      return { uri: array[0]?.profile_image }
    } else if (array[0]?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array[0]?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array[0]?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array[0]?.playing_role === 'all') {
      return all_rounderIcon
    }
  } else if (SUBSID === 'SUB-3') {
    if (array[0]?.profile_image) {
      return { uri: array[0]?.profile_image }
    } else if (array[0]?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array[0]?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array[0]?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array[0]?.playing_role === 'all') {
      return all_rounderIcon
    }
  } else if (SUBSID === 'SUB-4') {
    if (array[0]?.profile_image) {
      return { uri: array[0]?.profile_image }
    } else if (array[0]?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array[0]?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array[0]?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array[0]?.playing_role === 'all') {
      return all_rounderIcon
    }
  }
}
export const playerRollImageTwo = (array: { numberid: string; profile_image: any; playing_role: string; }, arrayTwo: { numberid: string; }) => {
  if (array?.numberid == '1' || arrayTwo?.numberid == '1') {
    if (array?.profile_image) {
      return { uri: array?.profile_image }
    } else if (array?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array?.playing_role === 'all') {
      return all_rounderIcon
    }
  } else if (array?.numberid == '2' || arrayTwo?.numberid == '2') {
    if (array?.profile_image) {
      return { uri: array?.profile_image }
    } else if (array?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array?.playing_role === 'all') {
      return all_rounderIcon
    }
  } else if (array?.numberid == '3' || arrayTwo?.numberid == '3') {
    if (array?.profile_image) {
      return { uri: array?.profile_image }
    } else if (array?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array?.playing_role === 'all') {
      return all_rounderIcon
    }
  } else if (array?.numberid == '4' || arrayTwo?.numberid == '4') {
    if (array?.profile_image) {
      return { uri: array?.profile_image }
    } else if (array?.playing_role === 'wk') {
      return wicket_keeperIcon
    } else if (array?.playing_role === 'bowl') {
      return bowlerIcon
    } else if (array?.playing_role === 'bat') {
      return batsmanIcon
    } else if (array?.playing_role === 'all') {
      return all_rounderIcon
    }
  }
}
export const playerRollImageThree = (array: { profile_image: any; playing_role: string; }) => {
  if (array?.profile_image) {
    return { uri: array?.profile_image }
  } else if (array?.playing_role === 'wk') {
    return wicket_keeperIcon
  } else if (array?.playing_role === 'bowl') {
    return bowlerIcon
  } else if (array?.playing_role === 'bat') {
    return batsmanIcon
  } else if (array?.playing_role === 'all') {
    return all_rounderIcon
  } else if (array?.profile_image) {
    return { uri: array?.profile_image }
  } else if (array?.playing_role === 'wk') {
    return wicket_keeperIcon
  } else if (array?.playing_role === 'bowl') {
    return bowlerIcon
  } else if (array?.playing_role === 'bat') {
    return batsmanIcon
  } else if (array?.playing_role === 'all') {
    return all_rounderIcon
  } else if (array?.profile_image) {
    return { uri: array?.profile_image }
  } else if (array?.playing_role === 'wk') {
    return wicket_keeperIcon
  } else if (array?.playing_role === 'bowl') {
    return bowlerIcon
  } else if (array?.playing_role === 'bat') {
    return batsmanIcon
  } else if (array?.playing_role === 'all') {
    return all_rounderIcon
  } else if (array?.profile_image) {
    return { uri: array?.profile_image }
  } else if (array?.playing_role === 'wk') {
    return wicket_keeperIcon
  } else if (array?.playing_role === 'bowl') {
    return bowlerIcon
  } else if (array?.playing_role === 'bat') {
    return batsmanIcon
  } else if (array?.playing_role === 'all') {
    return all_rounderIcon
  }
}
export const formatDateTime = (inputDateTime: string | number | Date) => {
  // Convert the input string to a Date object
  const dateTime = new Date(inputDateTime);

  // Format the date
  const formattedDate = dateTime.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  // Format the time
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
}






