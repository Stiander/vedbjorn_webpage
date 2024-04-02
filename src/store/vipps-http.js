import { do_print ,
    VIPPS_WELL_KNOWN_URI,
    VIPPS_TOKEN_ENDPOINT,
    VIPPS_USERINFO_ENDPOINT,
    VIPPS_ECOMM_ENDPOINT,
    VIPPS_CLIENT_ID,
    VIPPS_CLIENT_SECRET,
    VIPPS_SUBSCRIPTION_KEY,
    VIPPS_MERCHANT_SERIAL_NUMBER ,
    VIPPS_LOGIN_REDIRECT_URI ,
    ECOMM_CALLBACK_PREFIX ,
    ECOMM_CONSENT_REMOVAL_PREFIX ,
    VEDBJORN_GET_VIPPS_USER ,
    VEDBJORN_GET_VIPPS_PAYMENT ,
    ECOMM_TOKEN ,
    VEDBJORN_ORDER_ID ,
    VEDBJORN_ORDER_CANCEL
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {vippsActions} from "./vipps-slice";
import store from "./index";
import {newUserActions} from "./new-user-slice";
import {getExistingUser} from "./users-http";
import sign from "jwt-encode";
import {deliveryActions} from "./delivery-slice";

const uuid = require('uuid');
const CryptoJs = require("crypto-js");

const VIPPS_LOGIN_RESPONSE_TYPE = 'code';
const VIPPS_LOGIN_SCOPE         = 'openid name phoneNumber address birthDate';

export const getOIDC_WellKnown = () => {
    return async (dispatch) => {
        const request_getOIDC_WellKnown = async () => {
            const headers = {
                'Merchant-Serial-Number' : VIPPS_MERCHANT_SERIAL_NUMBER ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', VIPPS_WELL_KNOWN_URI);
            }
            const response = await axios.get(VIPPS_WELL_KNOWN_URI, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + VIPPS_WELL_KNOWN_URI + ' : \n' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getOIDC_WellKnown();
            const start_login_uri = encodeURI(ret['authorization_endpoint'] +
                "?client_id=" + VIPPS_CLIENT_ID +
                "&response_type=" + VIPPS_LOGIN_RESPONSE_TYPE +
                "&scope=" + VIPPS_LOGIN_SCOPE +
                "&state=" + uuid.v4() +
                "&redirect_uri=" + VIPPS_LOGIN_REDIRECT_URI);


            if (do_print) {
                console.log('RECEIVED AUTH-ENDPOINT : ' , ret['authorization_endpoint']);
                console.log('start_login_uri = ' , start_login_uri);
            }

            dispatch(vippsActions.setStartLoginUri(start_login_uri));
        } catch (error) {
            if(do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle logge deg inn med Vipps',
                errorMessage: errm
            }));
        }
    }
};

export const getToken = (code) => {
    return async (dispatch) => {
        const request_getToken = async () => {
            const wordArrayAzp = CryptoJs.enc.Utf8.parse(VIPPS_CLIENT_ID + ":" + VIPPS_CLIENT_SECRET);
            const client_authorization = CryptoJs.enc.Base64.stringify(wordArrayAzp);
            const headers = {
                'Merchant-Serial-Number' : VIPPS_MERCHANT_SERIAL_NUMBER ,
                'Content-Type' : 'application/x-www-form-urlencoded' ,
                'Authorization' : 'Basic ' + client_authorization
            };
            if(do_print) {
                console.log('POST - ', VIPPS_TOKEN_ENDPOINT);
            }
            const params = new URLSearchParams({
                grant_type: 'authorization_code' ,
                code : code ,
                redirect_uri : VIPPS_LOGIN_REDIRECT_URI
            });

            const response = await axios.post(VIPPS_TOKEN_ENDPOINT, params, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + VIPPS_WELL_KNOWN_URI + ' : \n' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getToken();
            dispatch(vippsActions.setAccessToken(ret['access_token']));
            dispatch(vippsActions.setIdToken(ret['id_token']));
        } catch (error) {
            let errm = error.toString();
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle logge deg inn med Vipps',
                errorMessage: errm
            }));
        }
    }
};

export const getUserInfo = () => {
    return async (dispatch) => {
        const request_getUserInfo = async () => {
            const token = store.getState().vipps.access_token;
            const headers = {
                'Merchant-Serial-Number' : VIPPS_MERCHANT_SERIAL_NUMBER ,
                'Authorization' : 'Bearer ' + token
            };
            if(do_print) {
                console.log('GET - ', VIPPS_USERINFO_ENDPOINT);
            }
            const response = await axios.get(VIPPS_USERINFO_ENDPOINT, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + VIPPS_USERINFO_ENDPOINT + ' : \n' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getUserInfo();
            //console.log("User from Vipps : " , ret);
            dispatch(vippsActions.setVippsUser(ret));
        } catch (error) {
            if(do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle logge deg inn med Vipps',
                errorMessage: errm
            }));
        }
    }
};

export const getFirebaseUserFromVedbjorn = (email) => {
    /*
    * NOTE 22.01.2024 - Changed from Vipps to Firebase. Is called upon to create the access_tokens
    *
    * */
    return async (dispatch) => {
        const request_getVippsIserFromVedbjorn = async () => {
            const headers = {
                'Authorization' : sign({
                    email : email ,
                    access_token :store.getState().vipps.access_token , //< is actually now from firebase
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                })
            };
            if(do_print) {
                console.log('GET - ', VEDBJORN_GET_VIPPS_USER);
            }
            console.log('Getting Vipps user. Sure we want it at this time?');
            const response = await axios.get(VEDBJORN_GET_VIPPS_USER + '?email=' + email, {
                headers : headers
            });

            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + VEDBJORN_GET_VIPPS_USER + ' : \n' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getVippsIserFromVedbjorn();
            if ('code' in ret && ret['code'] !== 200) {
                dispatch(newUserActions.setName_firstname(store.getState().vipps.user.given_name));
                dispatch(newUserActions.setName_lastname(store.getState().vipps.user.family_name));
                dispatch(vippsActions.setStatus('must_make_new'));
            } else {
                throw new Error('Vipps-login not supported');
                //dispatch(vippsActions.setStatus('found_already'));

                /*
                * Function name is now loginAndLoadUser (users-http.js) , and it requires a Firebase password
                * */

                //dispatch(getExistingUser(ret['email']));
            }
        } catch (error) {
            if(do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle logge deg inn med Vipps',
                errorMessage: errm
            }));
        }
    }
};

export const get_payment_details = () => {
    return async (dispatch) => {
        const request_get_vippsPaymentDetails = async () => {
            const headers = {
                'Authorization': sign({
                    phone: store.getState().user.name['phone'],
                    email: store.getState().user.name['email'],
                    access_token: store.getState().vipps.access_token
                }, process.env.REACT_APP_JWT_SECRET, {
                    alg: "HS256",
                    typ: "JWT"
                }),
            };
            if(do_print) {
                console.log('GET - ', VEDBJORN_GET_VIPPS_PAYMENT);
            }
            // if (store.getState().delivery.deliveryNotification['ref_id'] === undefined) {
            //     return null;
            // }
            const response = await axios.get(VEDBJORN_GET_VIPPS_PAYMENT +
                '?notification=' + store.getState().delivery.deliveryNotification['ref_id'], {
                headers: headers
            });
            if (response.status === 404) {
                console.log('No payment info found');
                return null;
            }
            // Note 22.01.2024 : 404 code is ok, because there might not be any payment details
            console.log('PAYMENT CODE (get_payment_details) : ', response.status);
            if (!response || (response.status !== 404 && response.status !== 200)) {
                throw new Error('Failed to GET ' + VEDBJORN_GET_VIPPS_PAYMENT + ' : \n' + response.statusText);
            }
            return response.data;
        };

        try {

            /*
            * 1 : Get the payment-details from our own MongoDB
            * */
            const payment = await request_get_vippsPaymentDetails();
            console.log('PAYMENT : ' , payment)
            if (payment !== undefined && payment && null) {
                dispatch(deliveryActions.setPaymentInfo(payment));
                if (do_print) {
                    console.log('PAYMENT DETAILS : ', payment);
                }
            }
        } catch (error) {
            if(error.response.status === 404) {
                console.log('No payment info found (X)');
                return null;
            }
            if(do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sette i gang betaling med Vipps',
                errorMessage: errm
            }));
        }
    }
};

export const vipps_initiate = () => {
    return async (dispatch) => {

        /*
        * 1. First, get the payment details from Vedbjørn
        * */
        const request_get_vippsPaymentDetails = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
            };
            if(do_print) {
                console.log('GET - ', VEDBJORN_GET_VIPPS_PAYMENT);
            }
            if (store.getState().delivery.deliveryNotification['ref_id'] === undefined) {
                return null;
            }
            const response = await axios.get(VEDBJORN_GET_VIPPS_PAYMENT +
                '?notification=' + store.getState().delivery.deliveryNotification['ref_id'], {
                headers : headers
            });
            console.log('PAYMENT CODE (vipps_initiate) : ', response.status);
            if (!response || (response.status !== 404 && response.status !== 200)) {
                throw new Error('Failed to GET ' + VEDBJORN_GET_VIPPS_PAYMENT + ' : \n' + response.statusText);
            }
            return response.data;
        };

        /*
        * 2. Get access token
        * */
        const request_getToken = async () => {

            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'multipart/form-data'
            };
            if(do_print) {
                console.log('GET - ', ECOMM_TOKEN);
            }
            const response = await axios.get(ECOMM_TOKEN,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + ECOMM_TOKEN + ' : \n' + response.statusText);
            }
            return response.data;
        };

        /*
        * 3. Then access the ecomm API from Vipps to get a link to forward to the client
        * */
        const request_post_vipps_ecomm_payment = async (token, phone, amount, code) => {
            const headers = {
                'Merchant-Serial-Number' : VIPPS_MERCHANT_SERIAL_NUMBER ,
                'Authorization' : 'Bearer ' + token ,
                'Ocp-Apim-Subscription-Key' : VIPPS_SUBSCRIPTION_KEY
            };
            if(do_print) {
                console.log('POST - ', VIPPS_ECOMM_ENDPOINT);
            }
            const response = await axios.post(VIPPS_ECOMM_ENDPOINT ,
                {
                    "merchantInfo" : {
                        "callbackPrefix" : ECOMM_CALLBACK_PREFIX,
                        "consentRemovalPrefix": ECOMM_CONSENT_REMOVAL_PREFIX,
                        "fallBack": ECOMM_CALLBACK_PREFIX,
                        "merchantSerialNumber": VIPPS_MERCHANT_SERIAL_NUMBER,
                        "paymentType": "eComm Express Payment",
                        "shippingDetailsPrefix": ECOMM_CALLBACK_PREFIX,
                        "staticShippingDetails": [
                            {
                                "isDefault": "Y",
                                "priority": 1,
                                "shippingCost": 0,
                                "shippingMethod": "Allerede levert",
                                "shippingMethodId": "o"
                            }
                        ]
                    },
                    "customerInfo": {
                        "mobileNumber": phone
                    },
                    "transaction": {
                        "amount": amount * 100 ,
                        "orderId": VIPPS_MERCHANT_SERIAL_NUMBER + (new Date()).getTime(),
                        "transactionText": "Ved fra Vedbjørn : " + code , //text,
                        "useExplicitCheckoutFlow": false
                    }
                }, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST ' + VIPPS_ECOMM_ENDPOINT + ' : \n' + response.statusText);
            }
            return response.data;
        };

        /*
        * 5. When we have initiated the transaction, we have an order-id which we then can start processing
        * */
        const request_post_order_id = async (orderId, id) => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                })
            };
            if(do_print) {
                console.log('POST - ', VEDBJORN_ORDER_ID);
            }
            const response = await axios.post(VEDBJORN_ORDER_ID ,
                {
                    'orderId' : orderId ,
                    'vedbId' : id
                }, {
                    headers : headers
                });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST ' + VEDBJORN_ORDER_ID + ' : \n' + response.statusText);
            }
            return response.data;
        };

        try {
            if(do_print) {
                console.log('_______________________________');
                console.log('|      Initiate Order Begin    ');
                console.log('-------------------------------');
            }
            /*
            * 1 : Get the payment-details from our own MongoDB
            * */
            const payment = await request_get_vippsPaymentDetails();
            if (payment['status'] === 'paid') {
                dispatch(errorActions.setError({
                    errorTitle: 'Varen er allerede betalt',
                    errorMessage: 'Du har igangsatt en betalingsprosedyre for en ordre som allerede har blitt prosessert'
                }));
            }
            dispatch(deliveryActions.setPaymentInfo(payment));
            if(do_print) {
                console.log('Initiate Order :: PAYMENT DETAILS : ', payment);
            }
            /*
            * 2 : Get en eCom token from Vipps that we can use to initiate the transaction
            * */
            const token = await request_getToken();
            if(do_print) {
                console.log('Initiate Order :: PAYMENT TOKEN : ', token);
            }
            /*
            * 3. Initiate the Vipps transaction
            * */
            const ecomRet = await request_post_vipps_ecomm_payment(
                token,
                payment['paying_user_phone'],
                payment['amount_NOK'],
                payment['ref_code']
            );
            if(do_print) {
                console.log('Initiate Order :: VIPPS INITIATE : ', ecomRet);
            }
            /*
            * 4. Open the link that we got from Vipps, which leads into the Vipps-payment user experience
            * */
            dispatch(vippsActions.setPayLink(ecomRet['url']));

            /*
            * 5. Establish the order-id, so that the client has something to track
            * */
            dispatch(vippsActions.set_current_order_id(ecomRet['orderId']));
            await request_post_order_id(ecomRet['orderId'], payment['mongodb_id'])

            if(do_print) {
                console.log('_____________________________');
                console.log('|      Initiate Order Finished ');
                console.log('-----------------------------');
            }

        } catch (error) {
            if(do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sette i gang betaling med Vipps',
                errorMessage: errm
            }));
        }
    }
};

export const cancel_initiated_vipps_sequence = (orderId , restart = false) => {
    return async (dispatch) => {

        /*
        * 1. Get access token
        * */
        const request_getToken = async () => {

            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'multipart/form-data'
            };
            if(do_print) {
                console.log('GET - ', ECOMM_TOKEN);
            }
            const response = await axios.get(ECOMM_TOKEN,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + ECOMM_TOKEN + ' : \n' + response.statusText);
            }
            return response.data;
        };

        /*
        * 2. Send the cancel-message to Vipps
        * */
        const request_cancel_initiated_vipps_sequence = async (token) => {
            const headers = {
                'Merchant-Serial-Number' : VIPPS_MERCHANT_SERIAL_NUMBER ,
                'Authorization' : 'Bearer ' + token ,
                'Ocp-Apim-Subscription-Key' : VIPPS_SUBSCRIPTION_KEY
            };
            const uri = VIPPS_ECOMM_ENDPOINT + '/' + orderId + '/cancel'
            if(do_print) {
                console.log('PUT - ', uri);
            }
            const response = await axios.put(uri, {
                "merchantInfo": {
                    "merchantSerialNumber": VIPPS_MERCHANT_SERIAL_NUMBER
                },
                "transaction": {
                    "transactionText": 'Avbrutt av operatør'
                }
            },{
                headers: headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT ' + uri + ' : \n' + response.statusText);
            }
            return response.data;
        };

        /*
        * 3. Send the cancel-message to Vedbjørn
        * */
        const request_put_cancel_order_Vedbjorn = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
            };
            if(do_print) {
                console.log('PUT - ', VEDBJORN_ORDER_CANCEL);
            }
            const response = await axios.put(VEDBJORN_ORDER_CANCEL +
                '?payid=' + store.getState().delivery.paymentInfo['mongodb_id'], {},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT ' + VEDBJORN_ORDER_CANCEL + ' : \n' + response.statusText);
            }
            return response.data;
        };

        try {
            if(do_print) {
                console.log('_____________________________');
                console.log('|      Cancel Order Begin    ');
                console.log('-----------------------------');
            }

            /*
            * 1 : Get en eCom token from Vipps that we can use to cancel the initiated transaction
            * */
            const token = await request_getToken();
            if(do_print) {
                console.log('Cancel order :: PAYMENT TOKEN : ', token);
            }
            /*
            * 2 : Send the cancel-message to Vipps
            * */
            const cancelRet = await request_cancel_initiated_vipps_sequence(token);
            if(do_print) {
                console.log('Cancel order :: VIPPS CANCEL RET : ', cancelRet);
            }

            /*
            * 3 : Send the cancel-message to Vedbjørn, to update the payment status
            * */
            const updatedPaymentInfo = await request_put_cancel_order_Vedbjorn();
            if(do_print) {
                console.log('Cancel order :: UPDATED PAYMENT INFO : ', updatedPaymentInfo);
            }
            dispatch(deliveryActions.setPaymentInfo(updatedPaymentInfo));

            if(do_print) {
                console.log('_____________________________');
                console.log('|      Cancel Order Finished ');
                console.log('-----------------------------');
            }

            if (restart === true) {
                dispatch(vipps_initiate());
            }

        } catch (error) {
            if(do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle avbryte betalingen med Vipps',
                errorMessage: errm
            }));
        }
    }
};
