import {do_print ,
    URL_BUY ,
    URL_BUY_MATCH
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {buyActions} from "./buy-slice";
import sign from "jwt-encode";
import store from "./index";

export const getBuyRequest = (email) => {
    return async (dispatch) => {
        const requestBuyReq = async () => {
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
            if (do_print) {
                console.log('GET - ', URL_BUY + '?email=' + email);
            }
            const response = await axios.get(URL_BUY + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /buyrequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestBuyReq();
            if ('info' in ret && ret.info === 'no buyreq') {
                dispatch(buyActions.setHasBuyRequest(false));
            } else {
                dispatch(buyActions.setBuyReq(ret));
                dispatch(buyActions.setHasBuyRequest(true));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke din kjøpestatus.',
                errorMessage: errm
            }));
        }
    }
};

export const putBuyRequest = (email , buyreq) => {
    return async (dispatch) => {
        const requestputBuyReq = async () => {
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
            if (do_print) {
                console.log('PUT - ', URL_BUY + '?email=' + email);
            }
            const response = await axios.put(URL_BUY + '?email=' + email, buyreq,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /buyrequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestputBuyReq();
            if (do_print) {
                console.log('RETURNED : ', ret);
            }
            dispatch(getBuyRequest(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle oppdatere din kjøpestatus.',
                errorMessage: errm
            }));
        }
    }
};

export const deleteBuyRequest = (email) => {
    return async (dispatch) => {
        const requestDeleteBuyReq = async () => {
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
            if (do_print) {
                console.log('DELETE - ', URL_BUY + '?email=' + email);
            }
            const response = await axios.delete(URL_BUY + '?email=' + email,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /buyrequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            await requestDeleteBuyReq();
            dispatch(getBuyRequest(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette din kjøpestatus.',
                errorMessage: errm
            }));
        }
    }
};

export const getCurrentMatchForBuyer = (email) => {
    return async (dispatch) => {
        const requestGetCurrentMatchForBuyer = async () => {
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
            if (do_print) {
                console.log('GET - ', URL_BUY_MATCH + '?email=' + email);
            }
            const response = await axios.get(URL_BUY_MATCH + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /buyrequest/match : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestGetCurrentMatchForBuyer();
            dispatch(buyActions.setMatchingOngoingRoute(ret));
        } catch (error) {
            let errm = error.toString()
            if (error !== null && typeof error === 'object' &&'response' in error && error['response'] &&
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke om du hadde noen match for ditt kjøptsønske.',
                errorMessage: errm
            }));
        }
    }
};
