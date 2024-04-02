
import { createSlice } from "@reduxjs/toolkit";

const deliverySlice = createSlice({
    name: 'delivery' ,
    initialState: {
        deliveryNotification : {} ,
        paymentInfo : {} ,
        img : null ,
        delivery_history : []
    } ,
    reducers : {
        clear(state) {
            state.deliveryNotification = {};
            state.paymentInfo = {};
            state.img = null;
            state.delivery_history = [];
        },
        setPaymentInfo(state, action) {
            if (action) {
                if (!action.payload) {
                    state.paymentInfo = {};
                } else {
                    console.log('PAYMENT  : ' , action.payload);
                    state.paymentInfo = action.payload;
                }
            }
        },
        setDeliveryHistory(state, action) {
          if (action) {
            state.delivery_history = action.payload;
          }
        },
        clearDeliveryHistory(state) {
            state.delivery_history = [];
        },
        clearPayment(state) {
            state.paymentInfo = {};
        },
        clearDeliveryNotification(state) {
            state.deliveryNotification = {};
        },
        setDeliveryNotification(state, action) {
            if (action) {
                state.deliveryNotification = action.payload;
            }
        },
        setImage(state, action) {
            if (action && action.payload !== null) {
                state.img = action.payload;
            }
        }
    }
});

export const deliveryActions = deliverySlice.actions;
export default deliverySlice;
