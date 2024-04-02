import { createSlice} from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    is_loading : false ,
    information : {
        title : '' ,
        message : ''
    } ,
    confirmed : false ,
    purpose : ''
};

const infoSlice = createSlice({
    name: 'info' ,
    initialState : DEFAULT_STATE ,
    reducers: {
        setIsLoading(state) {
            state.is_loading = true;
        } ,
        setLoadingCompleted(state) {
            state.is_loading = false;
        } ,
        setInformation(state, action) {
            if (action && action.payload && action.payload.title && action.payload.message) {
                state.information.title = action.payload.title;
                state.information.message = action.payload.message;
            }
        },
        clearInformation(state) {
            state.information.title = '';
            state.information.message = '';
            state.confirmed = false;
        } ,
        setConfirmed(state, action) {
            if (action && action.payload !== null) {
                state.confirmed = action.payload;
            }
        },
        setPurpose(state, action) {
            if (action && action.payload !== null) {
                console.log('SETTING INFO PURPOSE TO : ' , action.payload);
                state.purpose = action.payload;
            }
        }
    }
});

export const infoActions = infoSlice.actions;
export default infoSlice;
