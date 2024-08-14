import { AppOperation } from '../..';
import { GUEST_TYPE } from '../../types';

export default (appOperation: AppOperation) => ({
    login: (data: any) => appOperation.post('/user/signup', data, GUEST_TYPE),
    register: (data: any) => appOperation.post('send-otp', data, GUEST_TYPE),

    otp_verification: (data: any) => appOperation.post('user/signup', data, GUEST_TYPE),


    resend_otp: (id: any) =>
        appOperation.get(`user/signup/${id}`, undefined, undefined, GUEST_TYPE),
});
