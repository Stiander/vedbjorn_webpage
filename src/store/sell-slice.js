
import { createSlice } from "@reduxjs/toolkit";

const sellSlice = createSlice({
    name: 'sell' ,
    initialState: {
        current_capacity : 0,
        has_a_sellrequest : false,
        email : '' ,
        new_deals : [] ,
        ongoing_deals : [] ,
        completed_sells : [] ,
        has_sent_batchsell_request : false
    },
    reducers: {
        clear(state) {
            state.current_capacity = 0;
            state.has_a_sellrequest = false;
            state.email = '';
            state.new_deals = [];
            state.ongoing_deals = [];
            state.completed_sells = [];
            state.has_sent_batchsell_request = false;
        },
        set_has_sent_batchsell_request(state, action) {
            if (action) {
                if(action.payload === null) {
                    state.has_sent_batchsell_request = false;
                } else {
                    state.has_sent_batchsell_request = action.payload;
                }
            }
        },
        setCompletedSells(state, action) {
            if (action) {
                if(action.payload === null) {
                    state.completed_sells = [];
                } else {
                    state.completed_sells = action.payload;
                }
            }
        },
        setOngoingDeals(state, action) {
            if (action && action.payload !== null) {
                state.ongoing_deals = action.payload;
            }
        },
        setNewDeals(state, action) {
            if (action && action.payload !== null) {
                state.new_deals = action.payload;
            }
        },
        setHasSellRequest(state, action) {
            if (action && action.payload !== null) {
                state.has_a_sellrequest = action.payload;
                if (state.has_a_sellrequest === false) {
                    state.current_capacity = 0;
                }
            }
        } ,
        setSellRequest(state, action) {
            if (action && action.payload !== null) {
                state.current_capacity = action.payload.current_capacity;
            }
        } ,
        setSellEmail(state, action) {
            if (action && action.payload !== null) {
                state.email = action.payload;
            }
        }
    }
});

export const sellActions = sellSlice.actions;
export default sellSlice;
