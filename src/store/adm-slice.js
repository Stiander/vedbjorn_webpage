import { createSlice} from "@reduxjs/toolkit";

const admSlice = createSlice({
    name: 'adm' ,
    initialState: {
        is_admin : false ,
        prices : [] ,
        is_in_season : true ,
        delivery_history_ADM : []
    } ,
    reducers: {
        set_is_admin(state, action) {
            if (action && action.payload !== null) {
                state.is_admin = action.payload;
            }
        } ,
        set_prices(state, action) {
            if (action && action.payload !== null) {
                state.prices = action.payload;
            }
        } ,
        set_is_in_season(state, action) {
            if (action && action.payload !== null) {
                if (action.payload === 'on') {
                    state.is_in_season = true
                } else if(action.payload === 'off') {
                    state.is_in_season = false
                }
            }
        } ,
        setDeliveryHistory_ADM(state, action) {
            if (action) {
                state.delivery_history_ADM = action.payload;
            }
        }
    }
});

export const admActions = admSlice.actions;
export default admSlice;
