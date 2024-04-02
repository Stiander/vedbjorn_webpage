
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    name : {
        email : '' ,
        phone : '' ,
        firstname : '' ,
        lastname : '' ,
        password : ''
    } ,
    location : {
        lat : 0 ,
        lng : 0 ,
        zip : '' ,
        county : '' ,
        country : '' ,
        municipality : '' ,
        road : ''
    } ,
    tempLocation : {
        lat : 0 ,
        lng : 0 ,
        zip : '' ,
        county: '' ,
        country : '' ,
        municipality : '' ,
        road : ''
    } ,
    checkState : {
        hasChecked : false,
        emailIsAvailable : false
    } ,
    evaluating : false ,
    readyToSubmit : false ,
    newUserIsReady : false
};

const newUserSlice = createSlice({
    name: 'newUser' ,
    initialState: DEFAULT_STATE ,
    reducers: {
        set_newUserIsReady(state, action) {
            if (action && action.payload) {
                state.newUserIsReady = action.payload;
            }
        },
        set_readyToSubmit(state, action) {
            if (action && action.payload) {
                state.readyToSubmit = action.payload;
            }
        },
        set_tempLocation(state, action) {
            if (action && action.payload) {
                if('lat' in action.payload) {
                    state.tempLocation.lat = Number(action.payload.lat);
                }
                if('lng' in action.payload) {
                    state.tempLocation.lng = Number(action.payload.lng);
                }
                if('postcode' in action.payload) {
                    state.tempLocation.zip = Number(action.payload.postcode);
                }
                if ('county' in action.payload) {
                    state.tempLocation.county = action.payload.county;
                }
                if ('country' in action.payload) {
                    state.tempLocation.country = action.payload.country;
                }
                if ('municipality' in action.payload) {
                    state.tempLocation.municipality = action.payload.municipality;
                }
                if ('road' in action.payload) {
                    state.tempLocation.road = action.payload.road;
                }
            }
        },
        set_checkState(state, action) {
            if (action && action.payload) {
                state.checkState.hasChecked = action.payload.hasChecked;
                state.checkState.emailIsAvailable = action.payload.emailIsAvailable;
            }
        },
        set_cancel(state) {
            state.name.email = '';
            state.name.phone = '';
            state.name.password = '';
            state.name.firstname = '';
            state.name.lastname = '';
            state.location.lat = 0;
            state.location.lng = 0;
            state.location.zip = '';
            state.location.county = '';
            state.location.country = '';
            state.location.municipality = '';
            state.location.road = '';
            state.tempLocation.lat = 0;
            state.tempLocation.lng = 0;
            state.tempLocation.zip = '';
            state.tempLocation.county = '';
            state.tempLocation.country = '';
            state.tempLocation.municipality = '';
            state.tempLocation.road = '';
            state.checkState.hasChecked = false;
            state.checkState.emailIsAvailable = false;
            state.evaluating = false;
            state.readyToSubmit = false;
            state.newUserIsReady = false;
        } ,
        set_evaluating(state, action) {
            if(action && action.payload) {
                state.evaluating = action.payload;
            }
        } ,
        setName_email(state, action) {
            if(action && action.payload) {
                state.name.email = String(action.payload);
            }
        } ,
        setName_phone(state, action) {
            if(action && action.payload) {
                state.name.phone = String(action.payload);
            }
        },
        setName_firstname(state, action) {
            if(action && action.payload) {
                state.name.firstname = String(action.payload);
            }
        } ,
        setName_lastname(state, action) {
            if(action && action.payload) {
                state.name.lastname = String(action.payload);
            }
        } ,
        setName_pos(state, action) {
            if(action && action.payload && action.payload.lat && action.payload.lng) {
                state.location.lat = action.payload.lat;
                state.location.lng = action.payload.lng;
            }
        } ,
        setName_road(state, action) {
            if(action && action.payload) {
                state.location.road = action.payload;
            }
        } ,
        setName_zip(state, action) {
            if(action && action.payload) {
                state.location.zip = action.payload;
            }
        } ,
        setName_municipality(state, action) {
            if(action && action.payload) {
                state.location.municipality = action.payload;
            }
        } ,
        setName_country(state, action) {
            if(action && action.payload) {
                state.location.country = action.payload;
            }
        } ,
        setName_county(state, action) {
            if(action && action.payload) {
                state.location.county = action.payload;
            }
        } ,
        setName_password(state, action) {
            if(action && action.payload) {
                state.name.password = action.payload;
            }
        }
    }
});

export const newUserActions = newUserSlice.actions;
export default newUserSlice;
