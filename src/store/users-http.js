import {
    do_print,
    URL_ADDR_FROM_COORDS,
    URL_ADDR_FROM_NAME,
    URL_AREA_MARKET_INFO,
    URL_NEW_LOCATION,
    URL_NEW_USER,
    URL_USER_TAKEN,
    URL_VERIFY_EMAIL,
    URL_VERIFY_EMAIL_START,
    URL_VERIFY_NEW_USER, VEDBJORN_GET_VIPPS_USER
} from "../routes";

import axios from 'axios';
import store from "./index";
import {errorActions} from "./error-slice";
import {newUserActions} from "./new-user-slice";
import {userActions} from "./user-slice";
import {vippsActions} from "./vipps-slice";
import {admActions} from "./adm-slice";
import {auth} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirebaseUserFromVedbjorn} from "./vipps-http";

const sign = require('jwt-encode');

export const getAreaInfo = (email, muni, county) => {
    return async (dispatch) => {
        const requestAreaInfo = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_AREA_MARKET_INFO + '?email=' + email + '&muni=' + muni + '&county=' + county);
            }
            const response = await axios.get(URL_AREA_MARKET_INFO + '?email=' + email + '&muni=' + muni + '&county=' + county, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /areainfo : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestAreaInfo();
            dispatch(userActions.setMarket(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle finne informasjon om markedet.' ,
                errorMessage: errm
            }));
        }
    }
};

export const checkIfUserIsTaken = (email) => {
    return async (dispatch) => {
        const requestUserTaken = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_USER_TAKEN + '?email=' + email);
            }
            const response = await axios.get(URL_USER_TAKEN + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /usertaken : ' + response.statusText);
            }
            return response.data;
        };
        try {
            dispatch(newUserActions.set_checkState({
                'hasChecked' : false ,
                'emailIsAvailable' : false
            }));
            const ret = await requestUserTaken();
            dispatch(newUserActions.set_checkState({
                'hasChecked' : true ,
                'emailIsAvailable' : !ret
            }));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke om brukeren var ledig.' ,
                errorMessage: errm
            }));
        }
    }
};

export const addrFromCoords = (lat, lng) => {
    return async (dispatch) => {
        const requestAddrFromCoords = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_ADDR_FROM_COORDS + '?lat=' + lat + '&lng=' + lng);
            }
            const response = await axios.get(URL_ADDR_FROM_COORDS + '?lat=' + lat + '&lng=' + lng, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /addrfromcoords : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestAddrFromCoords();
            dispatch(newUserActions.set_tempLocation(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle finne addresse basert på koordinater.' ,
                errorMessage: errm
            }));
        }
    }
};

export const verifyNewUser = (newUserObj) => {
    return async (dispatch) => {
        const requestVerifyNewUser = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().newUser.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('POST - ', URL_VERIFY_NEW_USER);
            }
            const response = await axios.post(URL_VERIFY_NEW_USER , newUserObj,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST /checkuserverify : ' + response.statusText);
            }
            return response.data;
        };
        try {
            console.log('newUserObj = ' , newUserObj);
            const ret = await requestVerifyNewUser();
            console.log('requestVerifyNewUser returns : ' , ret);
            if(ret['verified'] === false) {
                let errm = ret['msg'];
                if(errm === undefined) {
                    errm = 'Prøv å refreshe browseren din, og prøv på nytt.'
                }
                dispatch(errorActions.setError({
                    errorTitle: 'Det gikk ikke!' ,
                    errorMessage: errm
                }));
            } else {
                dispatch(newUserActions.set_tempLocation(ret));
                dispatch(newUserActions.set_readyToSubmit(true));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle finne addresse basert på koordinater.' ,
                errorMessage: errm
            }));
        }
    }
};

export const createNewUser = () => {
    return async (dispatch) => {

        const registerUser = async (email, password) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                return userCredential.user;
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                throw new Error('Failed at registerUser ' + errorCode + ' , ' + errorMessage);
            }
        };

        const postLocation = async (lat, lng) => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().newUser.name.phone ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('POST - ', URL_NEW_LOCATION + '?lat=' + lat + '&lng=' + lng);
            }
            const response = await axios.post(URL_NEW_LOCATION + '?lat=' + lat + '&lng=' + lng ,{}, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST /location : ' + response.statusText);
            }
            return response.data;
        };

        const postNewUser = async (user) => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('POST - ', URL_NEW_USER);
            }
            const response = await axios.post(URL_NEW_USER, user,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST /user : ' + response.statusText);
            }
            return response.data;
        };

        try {
            const user = store.getState().newUser.name;
            const user_from_firebase = await registerUser(user['email'],user['password']);
            if (user_from_firebase !== null && user_from_firebase.accessToken !== undefined) {
                dispatch(vippsActions.setAccessToken(user_from_firebase['accessToken']));

                let lat = store.getState().newUser.location.lat;
                let lng = store.getState().newUser.location.lng;
                let tmp_lat = store.getState().newUser.tempLocation.lat;
                let tmp_lng = store.getState().newUser.tempLocation.lng;
                if (lat === 0 || lng === 0 || (tmp_lat !== 0 && tmp_lng !== 0)) {
                    lat = tmp_lat;
                    lng = tmp_lng;
                }

                const loc = await postLocation(lat, lng);
                const newusr = await postNewUser({
                    email: user['email'] ,
                    phone : store.getState().newUser.name.phone ,
                    firstname: user['firstname'] ,
                    lastname: user['lastname'] ,
                    location_name: loc['name']
                });
                console.log('NEW USER : ' , newusr)
                dispatch(vippsActions.setStatus('found_already'));
                dispatch(newUserActions.set_newUserIsReady(true));
            } else {
                throw new Error('Failed to receive Firebase user : ' , user_from_firebase);
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle opprette en ny bruker.' ,
                errorMessage: errm
            }));
        }
    }
};

export const loginAndLoadUser = (email, password) => {
    return async (dispatch) => {

        const loginUser = async (email, password) => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                return userCredential.user;
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                throw new Error('Failed at loginUser ' + errorCode + ' , ' + errorMessage);
            }
        };

        const request_getVippsIserFromVedbjorn = async () => {
            const access_token = store.getState().vipps.access_token;
            console.log('access_token = ', access_token);
            const headers = {
                'Authorization' : sign({
                    email : email ,
                    access_token :access_token , //< is actually now from firebase
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                })
            };
            if(do_print) {
                console.log('GET - ', VEDBJORN_GET_VIPPS_USER);
            }
            const response = await axios.get(VEDBJORN_GET_VIPPS_USER + '?email=' + email, {
                headers : headers
            });

            if (!response || response.status !== 200) {
                throw new Error('Failed to GET ' + VEDBJORN_GET_VIPPS_USER + ' : \n' + response.statusText);
            }
            return response.data;
        };

        const requestUser = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().newUser.name['phone'] ,
                    email ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_NEW_USER + '?email=' + email);
            }
            const response = await axios.get(URL_NEW_USER + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /user : ' + response.statusText);
            }
            return response.data;
        };

        const requestAddress = async (name) => {
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
                console.log('GET - ', URL_ADDR_FROM_NAME + '?name=' + name);
            }
            const response = await axios.get(URL_ADDR_FROM_NAME + '?name=' + name, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /user : ' + response.statusText);
            }
            return response.data;
        };

        try {
            console.log('FIREBASE STUFF STARTS');
            const guser = await loginUser(email, password);
            if (!guser['accessToken']) {
                throw Error('Login failed');
            }
            dispatch(vippsActions.setAccessToken(guser['accessToken']));
            const fbuser = await request_getVippsIserFromVedbjorn(email);
            if (fbuser === undefined || !fbuser) {
                throw new Error('User not registered or not found');
            }
            dispatch(vippsActions.setAccessToken(guser['accessToken']));
            const user = await requestUser();
            dispatch(admActions.set_is_admin(user['is_admin'] === true));
            if (do_print) {
                console.log('USER OBJ : ' , user);
            }
            dispatch(userActions.set_user(user));
            dispatch(vippsActions.set_phone(user['phone']));
            /*
            * TODO : user['location_name'] is incorrect! It doesn't reflect any address
            *  corrections that the user has made in the UI.
            * */
            const address = await requestAddress(user['location_name']);
            dispatch(userActions.set_location(address));
            dispatch(newUserActions.set_cancel());
        } catch (error) {
            let errm = '';
            if (typeof error === 'string') {
                errm = error;
            } else {
                errm = error.toString()
                if (error !== null && typeof error === 'object' && error['response'] &&
                    error['response']['data'] && error['response']['data']['content']
                ) {
                    errm = error['response']['data']['content'];
                } else if (error !== null && typeof error === 'object' && error['response'] &&
                    error['response']['data'] &&
                    error['response']['data']['info'] &&
                    error['response']['data']['info']['content']
                ) {
                    errm = error['response']['data']['info']['content']
                }
            }
            dispatch(errorActions.setError({
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke om brukeren var ledig.' ,
                errorMessage: errm
            }));
        }
    }
};

export const deleteUser = (email) => {
    return async (dispatch) => {
        const requestDeleteUser = async () => {
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
                console.log('DELETE - ', URL_NEW_USER + '?email=' + email);
            }
            const response = await axios.delete(URL_NEW_USER + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to DELETE /user : ' + response.statusText);
            }
            return response.data;
        };
        try {
            await requestDeleteUser();
            dispatch(userActions.deleted(true));

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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette brukeren.' ,
                errorMessage: errm
            }));
        }
    }
};

export const verifyUserStart = (email) => {
    return async (dispatch) => {
        const request_verifyUserStart = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_VERIFY_EMAIL_START + '?email=' + email);
            }
            const response = await axios.get(URL_VERIFY_EMAIL_START + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /user/verify/start : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const verify_ret = await request_verifyUserStart();
            if(do_print) {
                console.log('VERIFY EMAIL STARTED : ', verify_ret);
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette brukeren.' ,
                errorMessage: errm
            }));
        }
    }
};

//
export const verifyUser = (email, code) => {
    return async (dispatch) => {
        const request_verifyUser = async () => {
            const headers = {
                'Authorization' : sign({
                    phone : store.getState().user.name['phone'] ,
                    email : store.getState().newUser.name['email'] ,
                    access_token : store.getState().vipps.access_token
                } , process.env.REACT_APP_JWT_SECRET , {
                    alg: "HS256",
                    typ: "JWT"
                }) ,
                'Content-Type' : 'application/json'
            };
            if(do_print) {
                console.log('GET - ', URL_VERIFY_EMAIL + '?email=' + email + '&code=' + code);
            }
            const response = await axios.get(URL_VERIFY_EMAIL + '?email=' + email + '&code=' + code, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /user/verify : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const verify_ret = await request_verifyUser();
            if(do_print) {
                console.log('VERIFY EMAIL : ', verify_ret);
                if ('code' in verify_ret && verify_ret['code'] !== 200) {
                    console.log('VERIFICATION FAILED : ', verify_ret['content']);
                } else {
                    console.log('VERIFICATION SUCCESSFUL : ', verify_ret['content']);
                }
            }
            dispatch(vippsActions.setEmail_verification_state(verify_ret['content']));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette brukeren.' ,
                errorMessage: errm
            }));
        }
    }
};
