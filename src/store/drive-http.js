import {do_print ,
    URL_DRIVE,
    URL_PLANNED_ROUTE,
    URL_PLANNED_ROUTE_ACCEPT,
    URL_ONGOING_ROUTE,
    URL_ONGOING_ROUTE_OLD,
    URL_ONGOING_ROUTE_OLD_RECEIPT,
    URL_ONGOING_ROUTE_OLD_INVOICE,
    URL_VISITED_PROOF
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {driveActions} from "./drive-slice";
import {routeActions} from "./route-slice";
import {visitActions} from "./visit-slice";
import fileDownload from "js-file-download";
import sign from "jwt-encode";
import store from "./index";

export const getDriveRequest = (email) => {
    return async (dispatch) => {
        const requestDriveReq = async () => {
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
                console.log('GET - ', URL_DRIVE + '?email=' + email);
            }
            const response = await axios.get(URL_DRIVE + '?email=' + email, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /driverequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestDriveReq();
            if ('info' in ret && ret.info === 'no drivereq') {
                dispatch(driveActions.setHasDriveRequest(false));
            } else {
                dispatch(driveActions.setDriveRequest(ret));
                dispatch(driveActions.setHasDriveRequest(true));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke din sjåførstatus.',
                errorMessage: errm
            }));
        }
    }
};


export const putDriveRequest = (email , drivereq) => {
    return async (dispatch) => {
        const requestputDriveReq = async () => {
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
                console.log('PUT - ', URL_DRIVE + '?email=' + email);
            }
            const response = await axios.put(URL_DRIVE + '?email=' + email, drivereq,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /driverequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestputDriveReq();
            if (do_print) {
                console.log('RETURNED : ', ret);
            }
            dispatch(getDriveRequest(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle oppdatere din kjørestatus.',
                errorMessage: errm
            }));
        }
    }
};


export const deleteDriveRequest = (email) => {
    return async (dispatch) => {
        const requestDeleteDriveReq = async () => {
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
                console.log('DELETE - ', URL_DRIVE + '?email=' + email);
            }
            const response = await axios.delete(URL_DRIVE + '?email=' + email,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /driverequest : ' + response.statusText);
            }
            return response.data;
        };
        try {
            await requestDeleteDriveReq();
            dispatch(getDriveRequest(email));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle slette din kjørestatus.',
                errorMessage: errm
            }));
        }
    }
};

export const getDrivePlannedRoute = (name) => {
    return async (dispatch) => {
        const requestDrivePlannedRoute = async () => {
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
                console.log('GET - ', URL_PLANNED_ROUTE + '?name=' + name);
            }
            const response = await axios.get(URL_PLANNED_ROUTE + '?name=' + name, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /plannedroute : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestDrivePlannedRoute();
            if (do_print) {
                console.log('requestDrivePlannedRoute = ', ret);
            }
            dispatch(routeActions.setRoute(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sjekke din rute.',
                errorMessage: errm
            }));
        }
    }
};

export const getOngoingRoute = (name) => {
    return async (dispatch) => {
        const requestGetOngoing = async () => {
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
                console.log('GET - ', URL_ONGOING_ROUTE + '?name=' + name);
            }
            const response = await axios.get(URL_ONGOING_ROUTE + '?name=' + name, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /ongoingroute : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestGetOngoing();
            if (!ret || ret['info']['code'] !== 200) {
                dispatch(routeActions.clearOngoingRoute());
            } else {
                dispatch(routeActions.setOngoingRoute(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente din pågående rute',
                errorMessage: errm
            }));
        }
    }
};

export const putAcceptPlannedRoute = (name , accept) => {
    return async (dispatch) => {
        const requestPutAcceptPlannedRoute = async () => {
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
                console.log('PUT - ', URL_PLANNED_ROUTE_ACCEPT + '?name=' + name + '&accept=' + accept);
            }
            const response = await axios.put(URL_PLANNED_ROUTE_ACCEPT + '?name=' + name + '&accept=' + accept, {},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /plannedrouteacceept : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestPutAcceptPlannedRoute();
            if (do_print) {
                console.log(URL_PLANNED_ROUTE_ACCEPT, ' : ', ret);
            }
            dispatch(routeActions.clearRoute());
            dispatch(getOngoingRoute(name));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle oppdatere aksept-status for din rute.',
                errorMessage: errm
            }));
        }
    }
};

const bytesToBlob = (bts) => {
    var ab = new ArrayBuffer(bts.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bts.length; i++) {
        ia[i] = bts.charCodeAt(i);
    }
    return new Blob([ab]);
}

export const postVisitedImage = (name , img , imgname , index) => {
    return async (dispatch) => {
        const requestPostVisitedImage = async () => {
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
            if (do_print) {
                console.log('POST - ', URL_VISITED_PROOF + '?name=' + name + '&index=' + index);
            }
            const bb = bytesToBlob(img);
            const fd = new FormData();
            fd.append('file', bb, imgname);

            const response = await axios.post(URL_VISITED_PROOF + '?name=' + name + '&index=' + index, fd, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to POST /visitedproof : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestPostVisitedImage();
            if (do_print) {
                console.log(URL_VISITED_PROOF, ' : ', ret);
            }
            dispatch(getVisitedImage(name, index));
            dispatch(getOngoingRoute(name));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sende inn bildet for denne leveransen.',
                errorMessage: errm
            }));
        }
    }
};

export const getVisitedImage = (name, index) => {
    return async (dispatch) => {
        const requestGETVisitedImage = async () => {
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
            if (do_print) {
                console.log('GET - ', URL_VISITED_PROOF + '?name=' + name + '&index=' + index);
            }
            const response = await axios.get(URL_VISITED_PROOF + '?name=' + name + '&index=' + index, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /visitedproof : ' + response.statusText);
            }
            return response.data;
        };
        try {
            dispatch(visitActions.setImage(null));
            const img = await requestGETVisitedImage();
            dispatch(visitActions.setImage(img));
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

export const getOldCompletedAssignments = (name) => {
    return async (dispatch) => {
        const requestGetOldCompletedAssignments = async () => {
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
                console.log('GET - ', URL_ONGOING_ROUTE_OLD + '?name=' + name);
            }
            const response = await axios.get(URL_ONGOING_ROUTE_OLD + '?name=' + name, {
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /ongoingroute/old : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestGetOldCompletedAssignments();
            if (ret && ret.length > 0) {
                dispatch(routeActions.setCompletedRoutes(ret));
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

export const getFinishedRouteReceipt = (wrapupid) => {
    return async (dispatch) => {
        const requestgetFinishedRouteReceipt = async () => {
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
                console.log('GET - ', URL_ONGOING_ROUTE_OLD_RECEIPT + '?id=' + wrapupid);
            }
            const response = await axios.get(URL_ONGOING_ROUTE_OLD_RECEIPT + '?id=' + wrapupid, {
                headers : headers ,
                responseType : "blob"
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /ongoingroute/old/receipt : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetFinishedRouteReceipt();
            fileDownload(ret , 'KvitteringVebjørn_Oppdrag.pdf');
            // if (do_print) {
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente kvitteringen din.',
                errorMessage: errm
            }));
        }
    }
};


export const getFinishedRouteInvoice = (wrapupid) => {
    return async (dispatch) => {
        const requestgetFinishedRouteInvoice = async () => {
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
                console.log('GET - ', URL_ONGOING_ROUTE_OLD_INVOICE + '?id=' + wrapupid);
            }
            const response = await axios.get(URL_ONGOING_ROUTE_OLD_INVOICE + '?id=' + wrapupid, {
                headers : headers ,
                responseType : "blob"
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /ongoingroute/old/invoice : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestgetFinishedRouteInvoice();
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente regningen som du sendte til Vedbjørn.',
                errorMessage: errm
            }));
        }
    }
};
