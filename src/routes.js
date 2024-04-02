
export const is_debug = process.env.NODE_ENV === 'development';
//export const vipps_is_debug = is_debug;
export const vb_is_debug = is_debug;

//export const is_debug = true;
export const vipps_is_debug = false;
//export const vb_is_debug = true;

//export const do_print = (is_debug);
export const do_print = true;

//const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const CORS_ANYWHERE = 'https://corsproxy.io/?'

if (is_debug) {
    console.log('is_debug = ' , is_debug);
    console.log('vipps_is_debug = ' , vipps_is_debug);
    console.log('vb_is_debug = ' , vb_is_debug);
} else {
    console.log('Velkommen til Vedbjorn.no sin console.log =)');
    console.log('Det kommer ikke til å stå noe interessant her.');
}

/*
*
*
*       VIPPS
*
*
* */
let VIPPS_BASE = '';
if (vipps_is_debug) {
    VIPPS_BASE = CORS_ANYWHERE + 'https://apitest.vipps.no/';
} else {
    VIPPS_BASE = CORS_ANYWHERE + 'https://api.vipps.no/'
}

export const VIPPS_WELL_KNOWN_URI      = VIPPS_BASE + 'access-management-1.0/access/.well-known/openid-configuration';
export const VIPPS_TOKEN_ENDPOINT      = VIPPS_BASE + 'access-management-1.0/access/oauth2/token';
export const VIPPS_USERINFO_ENDPOINT   = VIPPS_BASE + 'vipps-userinfo-api/userinfo';
export const VIPPS_ECOMM_ENDPOINT      = VIPPS_BASE + 'ecomm/v2/payments/';

let _VIPPS_CLIENT_ID = '';
let _VIPPS_CLIENT_SECRET = '';
let _VIPPS_SUBSCRIPTION_KEY = '';
let _VIPPS_MERCHANT_SERIAL_NUMBER = '';

if (vipps_is_debug) {
    _VIPPS_CLIENT_ID = process.env.REACT_APP_VIPPS_CLIENT_ID_DEV;
    _VIPPS_CLIENT_SECRET = process.env.REACT_APP_VIPPS_CLIENT_SECRET_DEV;
    _VIPPS_SUBSCRIPTION_KEY = process.env.REACT_APP_VIPPS_SUBSCRIPTION_KEY_DEV;
    _VIPPS_MERCHANT_SERIAL_NUMBER = process.env.REACT_APP_VIPPS_MERCHANT_SERIAL_NUMBER_DEV;
} else {
    _VIPPS_CLIENT_ID = process.env.REACT_APP_VIPPS_CLIENT_ID_PROD;
    _VIPPS_CLIENT_SECRET = process.env.REACT_APP_VIPPS_CLIENT_SECRET_PROD;
    _VIPPS_SUBSCRIPTION_KEY = process.env.REACT_APP_VIPPS_SUBSCRIPTION_KEY_PROD;
    _VIPPS_MERCHANT_SERIAL_NUMBER = process.env.REACT_APP_VIPPS_MERCHANT_SERIAL_NUMBER_PROD;
}
export const VIPPS_CLIENT_ID = _VIPPS_CLIENT_ID;
export const VIPPS_CLIENT_SECRET = _VIPPS_CLIENT_SECRET;
export const VIPPS_SUBSCRIPTION_KEY = _VIPPS_SUBSCRIPTION_KEY;
export const VIPPS_MERCHANT_SERIAL_NUMBER = _VIPPS_MERCHANT_SERIAL_NUMBER;

/*
*
*
*       Vedbjørn
*
*
* */
let VEDBJORN_APP_BASE = '';
let VEDBJORN_REST_BASE = '';
if (vb_is_debug) {
    VEDBJORN_APP_BASE  = 'http://localhost:3000/';
    VEDBJORN_REST_BASE = 'http://localhost:8080/';
} else {
    VEDBJORN_APP_BASE = process.env.REACT_APP_VEDBJORN_APP_BASE;
    VEDBJORN_REST_BASE = process.env.REACT_APP_VEDBJORN_REST_BASE;
}

/*
*  vipps-http.js
* */
let _ECOMM_CALLBACK_PREFIX = '';
let _ECOMM_CONSENT_REMOVAL_PREFIX = '';
if (vb_is_debug) {
    _ECOMM_CALLBACK_PREFIX = 'https://example.com/vipps/callbacks-for-payment-update-from-vipps';
    _ECOMM_CONSENT_REMOVAL_PREFIX = 'https://example.com/vipps/consent-removal';
} else {
    _ECOMM_CALLBACK_PREFIX = VEDBJORN_APP_BASE + 'buy';
    _ECOMM_CONSENT_REMOVAL_PREFIX = VEDBJORN_APP_BASE + 'me';
}
export const VIPPS_LOGIN_REDIRECT_URI     = VEDBJORN_APP_BASE + 'vippslogin';
export const ECOMM_CALLBACK_PREFIX        = _ECOMM_CALLBACK_PREFIX
export const ECOMM_CONSENT_REMOVAL_PREFIX = _ECOMM_CONSENT_REMOVAL_PREFIX
export const VEDBJORN_GET_VIPPS_USER      = VEDBJORN_REST_BASE + 'vippsuser';
export const VEDBJORN_GET_VIPPS_PAYMENT   = VEDBJORN_REST_BASE + 'vippspayment';
export const ECOMM_TOKEN                  = VEDBJORN_REST_BASE + 'vippsecomkey';
export const VEDBJORN_ORDER_ID            = VEDBJORN_REST_BASE + 'vippsorderid';
export const VEDBJORN_ORDER_CANCEL        = VEDBJORN_REST_BASE + 'vippscancel';
export const VEDBJORN_PAYMENT_STATUS        = VEDBJORN_REST_BASE + 'paymentstatus';

/*
*  brreg-http.js
* */
let _BRREG_SEARCH_URL = '';
if (vb_is_debug) {
    _BRREG_SEARCH_URL = CORS_ANYWHERE + 'https://data.brreg.no/enhetsregisteret/api/enheter/';
} else {
    _BRREG_SEARCH_URL = CORS_ANYWHERE + 'https://data.brreg.no/enhetsregisteret/api/enheter/';
}
export const BRREG_SEARCH_URL = _BRREG_SEARCH_URL;
export const VEDBJORN_COMPANY = VEDBJORN_REST_BASE + 'company';

/*
* buy-http.js
* */
export const URL_BUY = VEDBJORN_REST_BASE + 'buyrequest';
export const URL_BUY_MATCH = VEDBJORN_REST_BASE + 'buyrequest/match';

/*
* delivery-http.js
* */
export const URL_DELIVERY_NOTIFICATION = VEDBJORN_REST_BASE + 'buyrequest/notification';
export const URL_DELIVERY_PROOF = VEDBJORN_REST_BASE + 'deliveryproof';
export const URL_DELIVERY_DECLINE = VEDBJORN_REST_BASE + 'delivery/decline';
export const URL_DELIVERY_ACCEPT = VEDBJORN_REST_BASE + 'delivery/accept';
export const URL_DELIVERY_HISTORY = VEDBJORN_REST_BASE + 'delivery/history';
export const URL_DELIVERY_RECEIPT = VEDBJORN_REST_BASE + 'delivery/receipt';

/*
*  drive-http.js
* */
export const URL_DRIVE = VEDBJORN_REST_BASE + 'driverequest';
export const URL_PLANNED_ROUTE = VEDBJORN_REST_BASE + 'plannedroute';
export const URL_PLANNED_ROUTE_ACCEPT = VEDBJORN_REST_BASE + 'plannedrouteaccept';
export const URL_ONGOING_ROUTE = VEDBJORN_REST_BASE + 'ongoingroute';
export const URL_ONGOING_ROUTE_OLD = VEDBJORN_REST_BASE + 'ongoingroute/old';
export const URL_ONGOING_ROUTE_OLD_RECEIPT = VEDBJORN_REST_BASE + 'ongoingroute/old/receipt';
export const URL_ONGOING_ROUTE_OLD_INVOICE = VEDBJORN_REST_BASE + 'ongoingroute/old/invoice';
export const URL_VISITED_PROOF = VEDBJORN_REST_BASE + 'visitedproof';

/*
*  feedback.http.js
* */
export const URL_FEEDBACK_COMPLAINT_NONDELIVERY = VEDBJORN_REST_BASE + 'feedback/complaint/nondelivery';

/*
*  mesages-http.js
* */
export const URL_MESSAGES = VEDBJORN_REST_BASE + 'messages';

/*
*  sell-http.js
* */
export const URL_SELL = VEDBJORN_REST_BASE + 'sellrequest';
export const URL_SELL_DEALS_NEW = VEDBJORN_REST_BASE + 'sellrequest/deals/new';
export const URL_SELL_DEALS_NEW_ACCEPT = VEDBJORN_REST_BASE + 'sellrequest/deals/new/accept';
export const URL_SELL_DEALS_ONGOING = VEDBJORN_REST_BASE + 'sellrequest/deals/ongoing';
export const URL_PREV_SALES = VEDBJORN_REST_BASE + 'sells/old';
export const URL_SELL_RECEIPT = VEDBJORN_REST_BASE + 'sells/receipt';
export const URL_SELL_INVOICE = VEDBJORN_REST_BASE + 'sells/invoice';
export const URL_SELL_BATCG = VEDBJORN_REST_BASE + 'batchsell';

/*
* users-http.js
* */
export const URL_USER_TAKEN = VEDBJORN_REST_BASE + 'usertaken';
export const URL_ADDR_FROM_COORDS = VEDBJORN_REST_BASE + 'addrfromcoords';
export const URL_VERIFY_NEW_USER = VEDBJORN_REST_BASE + 'checkuserverify';
export const URL_NEW_LOCATION = VEDBJORN_REST_BASE + 'location';
export const URL_NEW_USER = VEDBJORN_REST_BASE + 'user';
export const URL_VERIFY_EMAIL_START = VEDBJORN_REST_BASE + 'user/verify/start';
export const URL_VERIFY_EMAIL = VEDBJORN_REST_BASE + 'user/verify';
export const URL_ADDR_FROM_NAME = VEDBJORN_REST_BASE + 'addrfromname';
export const URL_AREA_MARKET_INFO = VEDBJORN_REST_BASE + 'areainfo';

/*
* adm-http.js
* */
export const URL_POST_SEND_EMAILS = VEDBJORN_REST_BASE + 'adm/sendemails';
export const URL_ADM_PRICES = VEDBJORN_REST_BASE + 'adm/prices';
export const URL_ADM_IN_SEASON = VEDBJORN_REST_BASE + 'adm/inseason';
export const URL_DELIVERY_HISTORY_ADM = VEDBJORN_REST_BASE + 'delivery/history/adm';
export const URL_DELIVERY_RECEIPT_ADM = VEDBJORN_REST_BASE + 'delivery/receipt/adm';

/*
*  socket.js
* */
let _STREAM_ENDPOINT = '';
if(vb_is_debug) {
    _STREAM_ENDPOINT = 'localhost:5000'
} else {
    _STREAM_ENDPOINT = VEDBJORN_REST_BASE = process.env.REACT_APP_VEDBJORN_STREAM;
}
export const STREAM_ENDPOINT = _STREAM_ENDPOINT;
