import {do_print ,
    BRREG_SEARCH_URL ,
    VEDBJORN_COMPANY
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import store from "./index";
import {brregActions} from "./brreg-slice";
import sign from "jwt-encode";



export const companyOrgnumSearch = (orgnum) => {
    return async (dispatch) => {
        const get_companyOrgnumSearch = async () => {
            if (do_print) {
                console.log('GET - ', BRREG_SEARCH_URL);
            }
            const response = await axios.get(BRREG_SEARCH_URL + orgnum);
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + BRREG_SEARCH_URL + ' : \n' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await get_companyOrgnumSearch();
            if (do_print) {
                console.log('COMPANY : ', ret);
            }
            dispatch(brregActions.set_name(ret['navn']));
            const address = ret['forretningsadresse']['adresse'][0] + ' , ' +
                ret['forretningsadresse']['postnummer'] + ' , ' +
                ret['forretningsadresse']['poststed']
            dispatch(brregActions.set_address(address));
        } catch (error) {
            if (do_print) {
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

export const save_company = (billname, accountnum, companyname, companynum, companyaddress) => {
    return async (dispatch) => {
        const request_put_save_company = async () => {
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
            if (do_print) {
                console.log('GET - ', VEDBJORN_COMPANY);
            }
            let _billname = '_';
            if (billname) {
                _billname = billname;
            }
            let _accountnum = '_';
            if (accountnum) {
                _accountnum = accountnum;
            }
            let _companyname = '_';
            if (companyname) {
                _companyname = companyname;
            }
            let _companynum = '_';
            if (companynum) {
                _companynum = companynum;
            }
            let _companyaddress = '_';
            if (companyaddress) {
                _companyaddress = companyaddress;
            }
            const response = await axios.put(VEDBJORN_COMPANY +
                '?billname=' + _billname + '&accountnum=' + _accountnum + '&companyname=' + _companyname +
                '&companynum=' + _companynum + '&companyaddress=' + _companyaddress,
                {},{
                headers: headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT ' + VEDBJORN_COMPANY + ' : \n' + response.statusText);
            }
            return response.data;
        };

        try {
            const company = await request_put_save_company();
            if (do_print) {
                console.log('SAVE COMPANY RETURNED : ', company);
            }
            dispatch(brregActions.set_company_num(company['companynum']));
            dispatch(brregActions.set_bill_name(company['billname']));
            dispatch(brregActions.set_account_number(company['accountnum']));
            dispatch(brregActions.set_name(company['companyname']));
            dispatch(brregActions.set_address(company['companyaddress']));
            dispatch(brregActions.set_ok_saved(true));
        } catch (error) {
            if (do_print) {
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

export const load_company = () => {
    return async (dispatch) => {
        const request_put_save_company = async () => {
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
            if (do_print) {
                console.log('GET - ', VEDBJORN_COMPANY);
            }
            const response = await axios.get(VEDBJORN_COMPANY,{
                    headers: headers
                });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + VEDBJORN_COMPANY + ' : \n' + response.statusText);
            }
            return response.data;
        };

        try {
            const company = await request_put_save_company();
            if (company['accountnum']) {
                if (do_print) {
                    console.log('LOAD COMPANY RETURNED : ', company);
                }
                dispatch(brregActions.set_company_num(company['companynum']));
                dispatch(brregActions.set_bill_name(company['billname']));
                dispatch(brregActions.set_account_number(company['accountnum']));
                dispatch(brregActions.set_name(company['companyname']));
                dispatch(brregActions.set_address(company['companyaddress']));
                dispatch(brregActions.set_ok_loaded(true));
            } else {
                dispatch(brregActions.set_ok_loaded(false));
            }
        } catch (error) {
            if (do_print) {
                console.log('ERROR : ', error);
            }
            let errm = error.toString();
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
