import {
    do_print,
    URL_POST_SEND_EMAILS,
    URL_ADM_PRICES,
    URL_ADM_IN_SEASON,
    URL_DELIVERY_HISTORY_ADM,
    URL_DELIVERY_RECEIPT_ADM
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import sign from "jwt-encode";
import store from "./index";
import {admActions} from "./adm-slice";
import {deliveryActions} from "./delivery-slice";
import fileDownload from "js-file-download";

export const postAdmSendEmails = (body) => {
    return async (dispatch) => {
        const request_postAdmSendEmails = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('POST - ', URL_POST_SEND_EMAILS , body);
            }
            const response = await axios.post(URL_POST_SEND_EMAILS, body, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST ', URL_POST_SEND_EMAILS, ' : ' + response.statusText);
            }
            return response.data;
        };
        try {

            const ret = await request_postAdmSendEmails();
            if(do_print) {
                console.log('request_postAdmSendEmails : ', ret);
            }
        } catch (error) {
            let errm = error.toString()
            if (typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] &&
                error['response']['data'] && 'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response']
                && error['response']['data'] && 'info' in error['response']['data'] && error['response']['data']['info']
                && 'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sende bestille masse-utsendelse av eposter.',
                errorMessage: errm
            }));
        }
    }
};

export const getPrices = () => {
    return async (dispatch) => {
        const request_getPrices = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_ADM_PRICES);
            }
            const response = await axios.get(URL_ADM_PRICES, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET  ', URL_ADM_PRICES, ' : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getPrices();
            dispatch(admActions.set_prices(ret));
        } catch (error) {
            let errm = error.toString()
            if (typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] && error['response']['data'] && 'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] && error['response']['data'] && 'info' in error['response']['data'] && error['response']['data']['info'] && 'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente prisene.',
                errorMessage: errm
            }));
        }
    }
};

export const setPrices = (prices) => {
    return async (dispatch) => {
        const request_setPrices = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('POST - ', URL_ADM_PRICES);
            }
            const response = await axios.post(URL_ADM_PRICES, {'items' : prices},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST  ', URL_ADM_PRICES, ' : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_setPrices();
            console.log('RETURN from POST ' , URL_ADM_PRICES, ' : ', ret);
        } catch (error) {
            let errm = error.toString()
            if (typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] && error['response']['data'] && 'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] && error['response']['data'] && 'info' in error['response']['data'] && error['response']['data']['info'] && 'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle oppdatere prisene.',
                errorMessage: errm
            }));
        }
    }
};

export const getIsInSeason = () => {
    return async (dispatch) => {
        const request_getIsInSeason = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_ADM_IN_SEASON);
            }
            const response = await axios.get(URL_ADM_IN_SEASON, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET  ', URL_ADM_IN_SEASON, ' : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getIsInSeason();
            dispatch(admActions.set_is_in_season(ret));
        } catch (error) {
            let errm = error.toString()
            if (typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] && error['response']['data'] && 'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] && error['response']['data'] && 'info' in error['response']['data'] && error['response']['data']['info'] && 'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente sesonginfo.',
                errorMessage: errm
            }));
        }
    }
};

export const postSetIsInSeason = (on_or_off) => {
    return async (dispatch) => {
        const request_postSetIsInSeason = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('POST - ', URL_ADM_IN_SEASON , on_or_off);
            }
            const response = await axios.post(URL_ADM_IN_SEASON, {value: on_or_off}, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST ', URL_ADM_IN_SEASON, ' : ' + response.statusText);
            }
            return response.data;
        };
        try {

            const ret = await request_postSetIsInSeason();
            if(do_print) {
                console.log('request_postSetIsInSeason : ', ret);
            }
            dispatch(getIsInSeason());
        } catch (error) {
            let errm = error.toString()
            if (typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response'] &&
                error['response']['data'] && 'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(typeof error === 'object' && 'response' in error && error['response'] && 'data' in error['response']
                && error['response']['data'] && 'info' in error['response']['data'] && error['response']['data']['info']
                && 'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle oppdatere sesong.',
                errorMessage: errm
            }));
        }
    }
};

export const getDeliveryHistory_ADM = (num) => {
    return async (dispatch) => {
        const requestgetDeliveryHistory = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_DELIVERY_HISTORY_ADM + '?num=' + num);
            }
            const response = await axios.get(URL_DELIVERY_HISTORY_ADM + '?num=' + num, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /delivery/history/adm : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetDeliveryHistory();
            dispatch(admActions.setDeliveryHistory_ADM(ret));
        } catch (error) {
            let errm = error.toString()
            if (error !== null && typeof error === 'object' && 'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'content' in error['response']['data'] && error['response']['data']['content']
            ) {
                errm = error['response']['data']['content'];
            } else if(error !== null && typeof error === 'object' &&'response' in error && error['response'] &&
                'data' in error['response'] && error['response']['data'] &&
                'info' in error['response']['data'] && error['response']['data']['info'] &&
                'content' in error['response']['data']['info'] && error['response']['data']['info']['content']
            ) {
                errm = error['response']['data']['info']['content']
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente all leveransehistorikk.',
                errorMessage: errm
            }));
        }
    }
};


export const getDeliveryReceipt_ADM = (id , ismva) => {
    return async (dispatch) => {
        const requestgetDeliveryReceipt = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().user.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/pdf'
            };
            if(do_print) {
                console.log('GET - ', URL_DELIVERY_RECEIPT_ADM + '?id=' + id + '&ismva=' + ismva);
            }
            const response = await axios.get(URL_DELIVERY_RECEIPT_ADM + '?id=' + id + '&ismva=' + ismva, {
                headers : headers ,
                responseType : "blob"
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /delivery/receipt/adm : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetDeliveryReceipt();
            fileDownload(ret , 'KvitteringVebjørn_' + id + '.pdf');
            // if(do_print) {
            //     console.log('RECEIPT RECEIVED : ', ret);
            // }
        } catch (error) {
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente kvittering.',
                errorMessage: errm
            }));
        }
    }
};
