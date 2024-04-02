import {do_print,
    URL_SELL ,
    URL_SELL_DEALS_NEW ,
    URL_SELL_DEALS_NEW_ACCEPT ,
    URL_SELL_DEALS_ONGOING ,
    URL_PREV_SALES ,
    URL_SELL_RECEIPT ,
    URL_SELL_INVOICE ,
    URL_SELL_BATCG
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {sellActions} from "./sell-slice";
import fileDownload from "js-file-download";
import sign from "jwt-encode";
import store from "./index";

export const getSellRequest = (email) => {
    return async (dispatch) => {
        const requestSellReq = async () => {
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
                console.log('GET - ', URL_SELL + '?email=' + email);
            }
            const response = await axios.get(URL_SELL + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /sellrequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestSellReq();
            if ('info' in ret && ret.info === 'no sellreq') {
                dispatch(sellActions.setHasSellRequest(false));
            } else {
                dispatch(sellActions.setSellEmail(ret['email']));
                dispatch(sellActions.setSellRequest(ret));
                dispatch(sellActions.setHasSellRequest(true));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke din selgestatus.',
                errorMessage: errm
            }));
        }
    }
};

export const putSellRequest = (email , sellreq) => {
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
                console.log('PUT - ', URL_SELL + '?email=' + email);
            }
            const response = await axios.put(URL_SELL + '?email=' + email, sellreq,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /sellrequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestputBuyReq();
            if (do_print) {
                console.log('requestputBuyReq = ', ret);
            }
            dispatch(getSellRequest(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle oppdatere din selgestatus.',
                errorMessage: errm
            }));
        }
    }
};

export const deleteSellRequest = (email) => {
    return async (dispatch) => {
        const requestDeleteSellReq = async () => {
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
                console.log('DELETE - ', URL_SELL + '?email=' + email);
            }
            const response = await axios.delete(URL_SELL + '?email=' + email,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /sellrequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            await requestDeleteSellReq();
            dispatch(getSellRequest(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette din selgerstatus.',
                errorMessage: errm
            }));
        }
    }
};

export const getSellRequestNewDeals = (email) => {
    return async (dispatch) => {
        const requestSellReqNewDeals = async () => {
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
                console.log('GET - ', URL_SELL_DEALS_NEW + '?email=' + email);
            }
            const response = await axios.get(URL_SELL_DEALS_NEW + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /sellrequest/deals/new : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestSellReqNewDeals();
            dispatch(sellActions.setNewDeals(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle finne kjøps-avtaler for deg.',
                errorMessage: errm
            }));
        }
    }
};

export const acceptNewDeal = (email, id, accept) => {
    return async (dispatch) => {
        const requestacceptNewDeal = async () => {
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
                console.log('PUT - ', URL_SELL_DEALS_NEW_ACCEPT + '?email=' + email + '&id=' + id + '&accept=' + accept);
            }
            const response = await axios.put(URL_SELL_DEALS_NEW_ACCEPT + '?email=' + email + '&id=' + id +'&accept=' + accept,{},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /sellrequest/deals/new/accept : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestacceptNewDeal();
            if (do_print) {
                console.log('requestacceptNewDeal = ', ret);
            }
            dispatch(getSellRequestNewDeals(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sende inn ditt svar på salgs-tilbud.',
                errorMessage: errm
            }));
        }
    }
};

export const getSellRequestDealsOngoing = (email) => {
    return async (dispatch) => {
        const requestgetSellRequestDealsOngoing = async () => {
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
                console.log('GET - ', URL_SELL_DEALS_ONGOING + '?email=' + email);
            }
            const response = await axios.get(URL_SELL_DEALS_ONGOING + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /sellrequest/deals/ongoing : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetSellRequestDealsOngoing();
            dispatch(sellActions.setOngoingDeals(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke pågående oppdrag.',
                errorMessage: errm
            }));
        }
    }
};

export const getPrevSales = (email) => {
    return async (dispatch) => {
        const requestGetPrevSales = async () => {
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
                console.log('GET - ', URL_PREV_SALES + '?email=' + email);
            }
            const response = await axios.get(URL_PREV_SALES + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /sells/old : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestGetPrevSales();
            if (do_print) {
                console.log(URL_PREV_SALES, ' = ', ret);
            }
            if (ret && ret.length > 0) {
                dispatch(sellActions.setCompletedSells(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente dine tidligere fullførte oppdrag.',
                errorMessage: errm
            }));
        }
    }
};

export const getSellReceipt = (id, email) => {
    return async (dispatch) => {
        const requestgetSellReceipt = async () => {
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
            if (do_print) {
                console.log('GET - ', URL_SELL_RECEIPT + '?id=' + id);
            }
            const response = await axios.get(URL_SELL_RECEIPT + '?id=' + id + '&email=' + email, {
                headers : headers ,
                responseType : "blob"
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /sells/receipt : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetSellReceipt();
            fileDownload(ret , 'KvitteringVebjørn_Salg.pdf');
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle last ned salgs-bilaget ditt.',
                errorMessage: errm
            }));
        }
    }
};

export const getSellInvoice = (id, email) => {
    return async (dispatch) => {
        const requestgetSellInvoice = async () => {
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
            if (do_print) {
                console.log('GET - ', URL_SELL_INVOICE + '?id=' + id);
            }
            const response = await axios.get(URL_SELL_INVOICE + '?id=' + id + '&email=' + email, {
                headers : headers ,
                responseType : "blob"
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /sells/invoice : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetSellInvoice();
            fileDownload(ret , 'Regning_Til_Vedbjørn.pdf');
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle last ned regningen som ble sendt til Vedbjørn fra deg',
                errorMessage: errm
            }));
        }
    }
};


export const setBatchSell = () => {
    return async (dispatch) => {
        const request_setBatchSell = async () => {
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
            if (do_print) {
                console.log('PUT - ', URL_SELL_BATCG);
            }
            const response = await axios.put(URL_SELL_BATCG, {},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /batchsell : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_setBatchSell();
            dispatch(sellActions.set_has_sent_batchsell_request(true));
            if(ret['info']['content'] === 'sent') {
                if (do_print) {
                    console.log('PUT BATCHSELL : SENT');
                }
                dispatch(sellActions.set_has_sent_batchsell_request(true));
            } else {
                if (do_print) {
                    console.log('PUT BATCHSELL : NOT SENT');
                }
                dispatch(sellActions.set_has_sent_batchsell_request(false));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle last ned salgs-bilaget ditt.',
                errorMessage: errm
            }));
        }
    }
};

export const getBatchSell = () => {
    return async (dispatch) => {
        const request_getBatchSell = async () => {
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
            if (do_print) {
                console.log('GET - ', URL_SELL_BATCG);
            }
            const response = await axios.get(URL_SELL_BATCG, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /batchsell : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await request_getBatchSell();
            if(ret['info']['content'] === 'sent') {
                if (do_print) {
                    console.log('GET BATCHSELL : SENT');
                }
                dispatch(sellActions.set_has_sent_batchsell_request(true));
            } else {
                if (do_print) {
                    console.log('GET BATCHSELL : NOT SENT');
                }
                dispatch(sellActions.set_has_sent_batchsell_request(false));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle last ned salgs-bilaget ditt.',
                errorMessage: errm
            }));
        }
    }
};
