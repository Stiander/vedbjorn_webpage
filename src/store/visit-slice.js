
import { createSlice } from "@reduxjs/toolkit";

const visitSlice = createSlice({
    name: 'visit' ,
    initialState: {
        img : null
    },
    reducers: {
        clear(state) {
            state.img = null;
        },
        setImage(state, action) {
            if (action && action.payload !== null) {
                state.img = action.payload;
            }
        }
    }
});

export const visitActions = visitSlice.actions;
export default visitSlice;
