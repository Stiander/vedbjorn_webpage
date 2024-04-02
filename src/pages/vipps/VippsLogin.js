import {do_print} from "../../routes";

import classes from './VippsLogin.module.css';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOIDC_WellKnown, getToken, getUserInfo, getFirebaseUserFromVedbjorn} from "../../store/vipps-http";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {BounceLoader} from "react-spinners";
import {infoActions} from "../../store/info-slice";
import store from "../../store";
import {getBuyRequest} from "../../store/buy-http";
import {getDriveRequest} from "../../store/drive-http";
import {getSellRequest} from "../../store/sell-http";
import {getIsInSeason} from "../../store/adm-http";

const VippsLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const start_login_uri   = useSelector((state) => state.vipps.start_login_uri);
    const access_token      = useSelector((state) => state.vipps.access_token);
    const vipps_user        = useSelector((state) => state.vipps.user);
    const vipps_user_status = useSelector((state) => state.vipps.status);
    const existing_email    = useSelector((state) => state.user.name.email);
    const login_confirmed   = useSelector((state) => state.info.confirmed);

    const [queryParameters] = useSearchParams();

    const [showSpinner, setShowSpinner] = useState(false);
    const [lookForToken, setLookForToken] = useState(false);


    /*
    *   VIPPS Login Flow
    *
    * See https://vippsas.github.io/vipps-developer-docs/docs/APIs/login-api/vipps-login-api-quick-start :
    *
    *  Make API calls :: Vipps Login in Browser
    *
    * */

    // 1. Send request Get OIDC well-known.
    const vippsLogin = () => {
        setShowSpinner(true);
        dispatch(getOIDC_WellKnown());
    };

    // 2. In your active Postman environment, copy the value of key start_login_uri, and use this URL in any browser.
    useEffect(() => {
        if (start_login_uri) {

            if (do_print) {
                console.log('OPENING VIPPS TAB');
            }

            window.open(start_login_uri);
            setLookForToken(true);
        }
    } , [start_login_uri]);

    useEffect(() => {
        let intervalId;
        if (lookForToken) {

            if (do_print) {
                console.log('__STARTING LOOP TO CHECK FOR VIPPS CODE');
            }

            intervalId = setInterval(() => {
                const code = localStorage.getItem('VIPPS_CODE');
                if (code) {

                    if (do_print) {
                        console.log('VIPPS CODE FOUND');
                    }

                    localStorage.setItem('VIPPS_CODE', '');
                    setShowSpinner(true);
                    dispatch(getToken(code));
                    setLookForToken(false);
                } else {
                    if (do_print) {
                        console.log('VIPPS CODE NOT FOUND YET');
                    }
                }
            }, 200);
        }

        return () => clearInterval(intervalId);
    } , [lookForToken, dispatch]);

    /*
    *  3. : Finish Vipps login. This request includes a scope parameter that requests access to user information. This means
    *  that if you have not yet consented to sharing your user information, a distinct screen asking for your consent
    *  will appear the first time.
    *
    *  4. : When you finish your login, the website will update. If you used http://localhost,
    *  it will appear to be broken, but that doesn't matter. Copy the query param code from the URL in the browser.
    *  Paste this code into the key code in the active Postman environment.
    *
    *  5. : From the Vipps Login in Browser folder, send request Get token. This provides the access token and id token
    * */
    useEffect(() => {
        const code = queryParameters.get("code");
        if (code) {

            if (do_print) {
                console.log('VIPPS CODE FOUND FROM VIPPS TAB');
            }

            localStorage.setItem('VIPPS_CODE', code);
            window.close();
        } else {
            if (do_print) {
                console.log('WAS NOT PRESENT IN RETURN FROM VIPPS TAB');
            }
        }
    } , [queryParameters, dispatch]);

    // 6. Send request Get user info to get the user info of the logged-in user.
    useEffect( () => {
        if (access_token) {
            dispatch(getUserInfo());
        }
    }, [access_token, dispatch]);

    /*
    *
    *  FROM HERE; VEDBJØRN API
    *
    * */
    useEffect( () => {
        if (vipps_user && 'phone_number' in vipps_user) {
            dispatch(getFirebaseUserFromVedbjorn(vipps_user['phone_number']));
        }
    } , [vipps_user, dispatch]);

    /*
    *  When we asked Vedbjørn REST if it is familiar with the Vipps-user which just authenticated, the reply
    *  from the server will set the vipps.status to either "must_make_new" or "found_already". And we can proceed
    *  accordingly
    *
    * */
    useEffect(() => {
        if (vipps_user_status === 'must_make_new') {
            if (do_print) {
                console.log('MAKE NEW USER - Starting');
            }
            navigate('/auth/newuser');
        } else if(vipps_user_status === 'found_already') {
            if (do_print) {
                console.log('WE HAVE SIGNED IN !');
            }
        }
    } , [vipps_user_status, navigate]);

    useEffect(() => {
        if (existing_email !== '') {

            dispatch(getBuyRequest(existing_email));
            dispatch(getDriveRequest(existing_email));
            dispatch(getSellRequest(existing_email));
            dispatch(getIsInSeason());

            dispatch(infoActions.setPurpose('LOGGED IN'));
            dispatch(infoActions.setInformation({
                title : 'DU ER INNLOGGET' ,
                message: 'Du kan lukke dette vinduet, og vil da bli sendt til forsiden. Du kan ' +
                    ' se på profilen din ved å klikke "MIN PROFIL" fra hovedmenyen.'
            }));

        } else {
            if (do_print) {
                console.log('EXISTING USER NOT FOUND');
            }
        }
    } , [existing_email, dispatch]);

    // useEffect(() => {
    //     console.log('XXXXXXXXXXXXXXXXXXXX');
    //     const purpose = store.getState().info.purpose;
    //     if(purpose === 'LOGGED IN') {
    //         console.log('YYYYYYYYYYYYYYYYYYY');
    //         if (do_print) {
    //             console.log('EXISTING USER WAS FOUND; FORWARDING TO FRONT PAGE');
    //         }
    //
    //         dispatch(infoActions.setPurpose(''));
    //         dispatch(infoActions.setConfirmed(false));
    //         navigate('/');
    //     }
    // } , [login_confirmed, dispatch, navigate]);

    return (
        <div>
            { !showSpinner &&
                <div>
                    <img
                        src={require("../../assets/log_in_with_vipps_pill_250_NO@2x.png")}
                        onClick={vippsLogin}
                        alt='Vipps'
                        className={classes.loginbox}
                    />
                </div>
            }
            { showSpinner &&
                <div className={classes.centralize}>
                    <p className={classes.paragraph}>BRUKER DU SAFARI (E.G. IPHONE)? DA KAN DET HENDE DU OPPLEVER AT DET TAR LANG TID Å LOGGE INN. DA KAN DU PRØVE Å GÅ FREM OG TILBAKE, ELLER UT OG INN AV SIDEN.</p>
                    <BounceLoader
                        className={classes.spinwrap}
                        size={200}
                        color={"#732A20"}
                    />
                </div>
            }
        </div>)
};

export default VippsLogin;
