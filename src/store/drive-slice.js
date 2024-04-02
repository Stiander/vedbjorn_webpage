
import { createSlice } from "@reduxjs/toolkit";

const driveSlice = createSlice({
    name: 'drive' ,
    initialState: {
        available : false,
        name : '' ,
        has_a_driverequest : false ,
        has_a_drive_assignment : false
    },
    reducers: {
        clear(state) {
            state.available = false;
            state.name = '';
            state.has_a_driverequest = false;
            state.has_a_drive_assignment = false;
        },
        setHasDriveAssignment(state, action) {
            if (action && action.payload !== null) {
                state.has_a_drive_assignment = action.payload;
            }
        } ,
        setHasDriveRequest(state, action) {
            if (action && action.payload !== null) {
                state.has_a_driverequest = action.payload;
                if (state.has_a_driverequest === false) {
                    state.available = false;
                    state.name = '';
                }
            }
        } ,
        setDriveRequest(state, action) {
            if (action && action.payload !== null) {
                state.available = action.payload.available;
                state.name = action.payload.name;
            }
        }
    }
});

export const driveActions = driveSlice.actions;
export default driveSlice;
