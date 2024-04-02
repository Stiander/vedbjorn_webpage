import {do_print,
    URL_MESSAGES
} from "../routes";

import axios from 'axios';
import {errorActions} from "./error-slice";
import {messagesActions} from "./messages-slice";
import sign from "jwt-encode";
import store from "./index";

export const getMessages = (email) => {
    return async (dispatch) => {
        const requestGetMessages = async () => {
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
                console.log('GET - ', URL_MESSAGES + '?email=' + email);
            }
            const response = await axios.get(URL_MESSAGES + '?email=' + email,{
                headers : headers
            });
            if (!response || response.status !== 200) {
                throw new Error('Failed to GET /messages : ' + response.statusText);
            }
            return response.data;
        };
        try {
            const ret = await requestGetMessages();
            dispatch(messagesActions.setMessages(ret));
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
                errorTitle: 'Opps. Det skjedde en feil da vi skulle hente meldingene dine.',
                errorMessage: errm
            }));
        }
    }
};
