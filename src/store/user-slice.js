
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    name : {
        email : '' ,
        phone : '' ,
        firstname : '' ,
        lastname : '' ,
        location_name : ''
    } ,
    location : {
        lat : 0 ,
        lng : 0 ,
        zip : 0 ,
        county : '' ,
        country : '' ,
        municipality : '' ,
        road : '' ,
        display_name : ''
    } ,
    deleted : false ,
    market : {
        municipality : {
            num_buyers : 0,
            num_sellers : 0,
            num_drivers : 0
        } ,
        county : {
            num_buyers : 0,
            num_sellers : 0,
            num_drivers : 0
        }
    }
};

const userSlice = createSlice({
    name: 'user' ,
    initialState: DEFAULT_STATE ,
    reducers: {
        setMarket(state, action) {
            if (action && action.payload) {
                if ('muni' in action.payload && action.payload.muni !== null) {
                    state.market.municipality = action.payload.muni;
                }
                if ('county' in action.payload && action.payload.county !== null) {
                    state.market.county = action.payload.county;
                }
            }
        },
        deleted(state, action) {
            if (action && action.payload) {
                state.deleted = action.payload;
            }
        } ,
        clear(state) {
            state.name.email = '';
            state.name.phone = '';
            state.name.firstname = '';
            state.name.lastname = '';
            state.name.location_name = '';
            state.location.lat = 0;
            state.location.lng = 0;
            state.location.zip = 0;
            state.location.county = '';
            state.location.country = '';
            state.location.municipality = '';
            state.location.road = '';
            state.location.display_name = '';
            state.deleted = false;
        },
        set_user(state, action) {
            if (action && action.payload) {
                if('email' in action.payload) {
                    state.name.email = String(action.payload.email);
                }
                if('phone' in action.payload) {
                    state.name.phone = String(action.payload.phone);
                }
                if('firstname' in action.payload) {
                    state.name.firstname = String(action.payload.firstname);
                }
                if('lastname' in action.payload) {
                    state.name.lastname = String(action.payload.lastname);
                }
                if('location_name' in action.payload) {
                    state.name.location_name = String(action.payload.location_name);
                }
            }
        },
        set_location(state, action) {
            if (action && action.payload) {
                if('lat' in action.payload) {
                    state.location.lat = Number(action.payload.lat);
                }
                if('lng' in action.payload) {
                    state.location.lng = Number(action.payload.lng);
                }
                if('postcode' in action.payload) {
                    state.location.zip = Number(action.payload.postcode);
                }
                if ('county' in action.payload) {
                    state.location.county = action.payload.county;
                }
                if ('country' in action.payload) {
                    state.location.country = action.payload.country;
                }
                if ('municipality' in action.payload) {
                    state.location.municipality = action.payload.municipality;
                }
                if ('road' in action.payload) {
                    state.location.road = action.payload.road;
                }
                if ('display_name' in action.payload) {
                    state.location.display_name = action.payload.display_name;
                }
            }
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;
