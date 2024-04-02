
import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
    name: 'messages' ,
    initialState: {
        messages : []
    },
    reducers: {
        clear(state) {
            state.messages = [];
        },
        setMessages(state, action) {
            if (action) {
                const arr = action.payload;
                arr.sort((a, b) => b.timestamp - a.timestamp);
                const set = new Set(arr)
                state.messages = [...set];
                // console.log('setMessages : ' , action.payload);
            }
        } ,
        addMessage(state, action) {
            if (action) {
                const arr = state.messages;
                arr.push(action.payload);
                arr.sort((a, b) => b.timestamp - a.timestamp);
                const set = new Set(arr)
                state.messages = [...set];
                // console.log('addMessage : ' , action.payload);
            }
        }
    }
});

export const messagesActions = messagesSlice.actions;
export default messagesSlice;
