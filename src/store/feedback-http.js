import {do_print ,
    URL_FEEDBACK_COMPLAINT_NONDELIVERY
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {buyActions} from "./buy-slice";
import sign from "jwt-encode";
import store from "./index";

export const postComplaintNondelivery = (email , ongoing_route) => {
    return async (dispatch) => {
        const requestPostComplaintNondelivery = async () => {
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
                console.log('PUT - ', URL_FEEDBACK_COMPLAINT_NONDELIVERY + '?email=' + email + '&ongoing_route=' + ongoing_route);
            }
            const response = await axios.put(URL_FEEDBACK_COMPLAINT_NONDELIVERY + '?email=' + email + '&ongoing_route=' + ongoing_route,{},{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to PUT /feedback/complaint/nondelivery : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestPostComplaintNondelivery();
            dispatch(buyActions.setMatchingOngoingRoute(''));
            if(do_print) {
                console.log('COMPLAINT RETURNED : ', ret);
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle sende inn din tilbakemelding.',
                errorMessage: errm
            }));
        }
    }
};
