import { createSlice } from "@reduxjs/toolkit";

const brregSlice = createSlice({
    name: 'brreg' ,
    initialState: {
        name : '',
        address : '',
        bill_name : '' ,
        company_num : '' ,
        account_number : '',
        ok_saved : false ,
        ok_loaded : false ,
        business_back_page : '/sell'
    } ,
    reducers: {
        clear(state) {
            state.name = '';
            state.address = '';
            state.bill_name = '';
            state.company_num = '';
            state.account_number = '';
            state.ok_saved = false;
            state.ok_loaded = false;
            state.business_back_page = '/sell';
        },
        set_business_back_page(state, action) {
            if (action) {
                if (!action.payload) {
                    state.business_back_page = '/sell';
                } else {
                    state.business_back_page = action.payload;
                }
            }
        },
        set_ok_loaded(state, action) {
            if (action) {
                if (!action.payload) {
                    state.ok_loaded = false;
                } else {
                    state.ok_loaded = Boolean(action.payload);
                }
            }
        },
        set_ok_saved(state, action) {
            if (action) {
                if (!action.payload) {
                    state.ok_saved = false;
                } else {
                    state.ok_saved = Boolean(action.payload);
                }
            }
        },
        set_company_num(state, action) {
            if (action) {
                if (!action.payload) {
                    state.company_num = '';
                } else {
                    state.company_num = action.payload;
                }
            }
        },
        set_bill_name(state, action) {
            if (action) {
                if (!action.payload) {
                    state.bill_name = '';
                } else {
                    state.bill_name = action.payload;
                }
            }
        },
        set_account_number(state, action) {
            if (action) {
                if (!action.payload) {
                    state.account_number = '';
                } else {
                    state.account_number = action.payload;
                }
            }
        },
        set_name(state, action) {
            if (action) {
                if (!action.payload) {
                    state.name = '';
                } else {
                    state.name = action.payload;
                }
            }
        },
        set_address(state, action) {
            if (action) {
                if (!action.payload) {
                    state.address = '';
                } else {
                    state.address = action.payload;
                }
            }
        }
    }
});

export const brregActions = brregSlice.actions;
export default brregSlice;
