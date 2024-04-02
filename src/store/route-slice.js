
import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
    name : 'route' ,
    initialState : {
        route : {} ,
        ongoingRoute : {} ,
        status : '' ,
        completed_routes : [] ,
        all_delivered : false
    } ,
    reducers : {
        clear(state) {
            state.route = {};
            state.ongoingRoute = {};
            state.status = '';
            state.completed_routes = [];
            state.all_delivered = false;
        } ,
        setCompletedRoutes(state, action) {
            if(action) {
                if (action.payload === null) {
                    state.completed_routes = [];
                } else {
                    state.completed_routes = action.payload;
                }
            }
        },
        setRoute(state, action) {
            if (action && action.payload !== null) {
                state.route = action.payload;
            }
        } ,
        clearRoute(state) {
            if (state) {
                state.route = {}
            }
        } ,
        setOngoingRoute(state, action) {
            if (action && action.payload !== null) {
                if ('status' in action.payload) {
                    state.status = action.payload.status;
                    if (action.payload.status === 'finished') {
                        state.ongoingRoute = {};
                        state.all_delivered = false;
                    } else {
                        state.ongoingRoute = action.payload;
                        if (action.payload.status === 'all_delivered') {
                            state.all_delivered = true;
                        }
                    }
                } else {
                    state.ongoingRoute = action.payload;
                    state.all_delivered = false;
                }
            }
        } ,
        clearOngoingRoute(state) {
            if (state) {
                state.ongoingRoute = {}
            }
        }
    }
});

export const routeActions = routeSlice.actions;
export default routeSlice;
