import {do_print ,
    URL_DELIVERY_NOTIFICATION ,
    URL_DELIVERY_PROOF,
    URL_DELIVERY_DECLINE,
    URL_DELIVERY_ACCEPT,
    URL_DELIVERY_HISTORY,
    URL_DELIVERY_RECEIPT
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {deliveryActions} from "./delivery-slice";
import fileDownload from 'js-file-download'
import sign from "jwt-encode";
import store from "./index";
import {get_payment_details} from "./vipps-http";

export const getDeliveryHistory = (email, num) => {
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
                console.log('GET - ', URL_DELIVERY_HISTORY + '?email=' + email + '&num=' + num);
            }
            const response = await axios.get(URL_DELIVERY_HISTORY + '?email=' + email + '&num=' + num, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /delivery/history : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetDeliveryHistory();
            dispatch(deliveryActions.setDeliveryHistory(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente din leveransehistorikk.',
                errorMessage: errm
            }));
        }
    }
};

export const getDeliveryNotification = (email) => {
    return async (dispatch) => {
        const requestgetDeliveryNotification = async () => {
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
                console.log('GET - ', URL_DELIVERY_NOTIFICATION + '?email=' + email);
            }
            const response = await axios.get(URL_DELIVERY_NOTIFICATION + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /buyrequest/notification : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetDeliveryNotification();
            if ('info' in ret && ret['info']['content'] === 'no delivery') {
                dispatch(deliveryActions.setDeliveryNotification({}));
            } else {
                const status = ret['status']
                // if (status && status !== 'paid') {
                if (status && status !== 'accepted' && status !== 'paid') {
                    dispatch(deliveryActions.setDeliveryNotification(ret));
                    dispatch(get_payment_details());
                } else {
                    dispatch(deliveryActions.setDeliveryNotification({}));
                }
            }

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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke din leveranse.',
                errorMessage: errm
            }));
        }
    }
};

export const getDeliveryProof = (id) => {
    return async (dispatch) => {
        const requestgetDeliveryProof = async () => {
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
                console.log('GET - ', URL_DELIVERY_PROOF + '?id=' + id);
            }
            const response = await axios.get(URL_DELIVERY_PROOF + '?id=' + id, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /deliveryproof : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const img = await requestgetDeliveryProof();
            dispatch(deliveryActions.setImage(img));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente bilde fra denne leveransen.',
                errorMessage: errm
            }));
        }
    }
};

export const postDeclineDelivery = (email , id , feedback) => {
    return async (dispatch) => {
        const requestPostDeclineDelivery = async () => {
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
                console.log('POST - ', URL_DELIVERY_DECLINE + '?email=' + email + '&id=' + id);
            }
            const response = await axios.post(URL_DELIVERY_DECLINE + '?email=' + email + '&id=' + id, feedback, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST /delivery/decline : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestPostDeclineDelivery();
            if(do_print) {
                console.log('requestPostDeclineDelivery : ', ret);
            }
            dispatch(deliveryActions.clearDeliveryNotification());
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sende inn avslaget for leveransen.',
                errorMessage: errm
            }));
        }
    }
};

export const putAcceptDelivery = (email , id) => {
    return async (dispatch) => {
        const requestPutAcceptDelivery = async () => {
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
                console.log('PUT - ', URL_DELIVERY_ACCEPT + '?email=' + email + '&id=' + id);
            }
            const response = await axios.put(URL_DELIVERY_ACCEPT + '?email=' + email + '&id=' + id, {},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /delivery/accept : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestPutAcceptDelivery();
            if(do_print) {
                console.log('URL_DELIVERY_ACCEPT returned : ', ret);
            }
            dispatch(getDeliveryHistory(email, 100));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sende inn godkjennelsen av leveransen.',
                errorMessage: errm
            }));
        }
    }
};

export const getDeliveryReceipt = (id) => {
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
                console.log('GET - ', URL_DELIVERY_RECEIPT + '?id=' + id);
            }
            const response = await axios.get(URL_DELIVERY_RECEIPT + '?id=' + id, {
                headers : headers ,
                responseType : "blob"
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /delivery/receipt : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetDeliveryReceipt();
            fileDownload(ret , 'KvitteringVebjørn.pdf');
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente bilde fra denne leveransen.',
                errorMessage: errm
            }));
        }
    }
};
