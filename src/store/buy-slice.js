
import { createSlice } from "@reduxjs/toolkit";

const buySlice = createSlice({
    name: 'buy' ,
    initialState: {
        current_requirement : 0,
        reserved_weeks: 0,
        has_a_buyrequest : false,
        matching_ongoing_route : ''
    } ,
    reducers : {
        clear(state) {
            state.current_requirement = 0;
            state.reserved_weeks = 0;
            state.has_a_buyrequest = false;
            state.matching_ongoing_route = '';
        },
        setMatchingOngoingRoute(state, action) {
            if (action) {
                state.matching_ongoing_route = action.payload;
            }
        },
        setHasBuyRequest(state, action) {
            if (action && action.payload !== null) {
                state.has_a_buyrequest = action.payload;
                if (state.has_a_buyrequest === false) {
                    state.current_requirement = 0;
                    state.reserved_weeks = 0;
                }
            }
        },
        setBuyReq(state, action) {
            if (action && action.payload !== null) {
                state.current_requirement = action.payload.current_requirement;
                state.reserved_weeks = action.payload.reserved_weeks;
            }
        }
    }
});

export const buyActions = buySlice.actions;
export default buySlice;
