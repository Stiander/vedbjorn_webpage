import {configureStore} from "@reduxjs/toolkit";
import errorSlice from "./error-slice";
import infoSlice from "./info-slice";
import newUserSlice from "./new-user-slice";
import userSlice from "./user-slice";
import buySlice from "./buy-slice";
import sellSlice from "./sell-slice";
import driveSlice from "./drive-slice";
import routeSlice from "./route-slice";
import visitSlice from "./visit-slice";
import messagesSlice from "./messages-slice";
import deliverySlice from "./delivery-slice";
import vippsSlice from "./vipps-slice";
import brregSlice from "./brreg-slice";
import miscSlice from "./misc-slice";
import admSlice from "./adm-slice";

const store = configureStore({
    reducer: {
        error : errorSlice.reducer ,
        info : infoSlice.reducer ,
        newUser : newUserSlice.reducer ,
        user : userSlice.reducer ,
        buy : buySlice.reducer ,
        sell : sellSlice.reducer ,
        drive : driveSlice.reducer ,
        route : routeSlice.reducer ,
        visit : visitSlice.reducer ,
        messages : messagesSlice.reducer ,
        delivery : deliverySlice.reducer ,
        vipps : vippsSlice.reducer ,
        brreg : brregSlice.reducer ,
        misc : miscSlice.reducer ,
        adm : admSlice.reducer
    }
});

export default store;
