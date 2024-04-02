import { createSlice } from "@reduxjs/toolkit";

const vippsSlice = createSlice({
    name: 'vipps' ,
    initialState: {
        start_login_uri : '' ,
        access_token : '',
        id_token  : '' ,
        user : {} ,
        status : '' , // must_make_new , found_already
        email_verification_state : '', // Expired, Mismatch, Already verified, Match ,
        paylink : '' ,
        current_order_id : ''
    } ,
    reducers: {
        clear(state) {
            state.start_login_uri = '';
            state.access_token = '';
            state.id_token = '';
            state.user = {};
            state.status = '';
            state.email_verification_state = '';
            state.paylink = '';
            state.current_order_id = '';
        },
        set_current_order_id(state, action) {
            if (action) {
                if (!action.payload) {
                    state.current_order_id = '';
                } else {
                    state.current_order_id = action.payload;
                }
            }
        },
        setPayLink(state, action) {
            if (action) {
                if (!action.payload) {
                    state.paylink = '';
                } else {
                    state.paylink = action.payload;
                }
            }
        },
        setEmail_verification_state(state, action) {
            if (action) {
                if (!action.payload) {
                    state.email_verification_state = '';
                } else {
                    state.email_verification_state = action.payload;
                }
            }
        } ,
        setStatus(state, action) {
            if (action) {
                if (!action.payload) {
                    state.status = '';
                } else {
                    state.status = action.payload;
                }
            }
        } ,
        setStartLoginUri(state, action) {
            if (action) {
                if (!action.payload) {
                    state.start_login_uri = '';
                } else {
                    state.start_login_uri = action.payload;
                }
            }
        } ,
        setAccessToken(state, action) {
            if (action) {
                if (!action.payload) {
                    state.access_token = '';
                } else {
                    state.access_token = action.payload;
                }
            }
        } ,
        setIdToken(state, action) {
            if (action) {
                if (!action.payload) {
                    state.id_token = '';
                } else {
                    state.id_token = action.payload;
                }
            }
        } ,
        setVippsUser(state, action) {
            if (action) {
                if (!action.payload) {
                    state.access_token = {};
                } else {
                    state.user = action.payload;
                }
            }
        },
        set_phone(state, action) {
            if (action) {
                state.user['phone'] = action.payload;
            }
        }
    }
});

export const vippsActions = vippsSlice.actions;
export default vippsSlice;
