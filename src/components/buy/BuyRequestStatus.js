
import {do_print} from "../../routes";

import classes from './BuyRequestStatus.module.css';
import {BounceLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import {useEffect , useState} from "react";
import store from "../../store";
import {deleteBuyRequest, getCurrentMatchForBuyer, putBuyRequest} from "../../store/buy-http";
import {infoActions} from "../../store/info-slice";
import {useNavigate} from "react-router-dom";
import MarketMiniStats from "../stats/MarketMiniStats";
import {connectSocketIo} from "../streaming/socket";
import {postComplaintNondelivery} from "../../store/feedback-http";
import {buyActions} from "../../store/buy-slice";
import {deliveryActions} from "../../store/delivery-slice";
import {MdNotificationsActive} from "react-icons/md";
import {GiWoodPile} from "react-icons/gi";
import {
    getDeliveryHistory,
    getDeliveryNotification,
    postDeclineDelivery,
    putAcceptDelivery
} from "../../store/delivery-http";
import DeliveryChecker from "./DeliveryChecker";
import Card from "../UI/Card";
import OrderStatus from "./OrderStatus";
import sign from "jwt-encode";
import {isObjEmpty} from "../../miscFuncs";
import {getIsInSeason} from "../../store/adm-http";
import {get_payment_details} from "../../store/vipps-http";

const BuyRequestStatus = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const is_in_season       = useSelector((state) => state.adm.is_in_season);
    const email              = useSelector((state) => state.user.name.email);
    const ongoing_route      = useSelector((state) => state.buy.matching_ongoing_route);
    const cancelConfirmed    = useSelector((state) => state.info.confirmed);
    const has_a_buyrequest   = useSelector((state) => state.buy.has_a_buyrequest);
    const delivery_notif     = useSelector((state) => state.delivery.deliveryNotification);
    const vipps_currentOrder = useSelector((state) => state.vipps.current_order_id);
    const payment            = useSelector((state) => state.delivery.paymentInfo);

    const [yesReserve        , setYesReserve]        = useState(store.getState().buy.reserved_weeks > 0);
    const [yesReserveClicked , setYesReserveClicked] = useState(false);
    const [showDeclineInfo   , setShowDeclineInfo]   = useState(false);
    const [foundSeller       , setFoundSeller]       = useState(false);
    const [foundDelivery     , setFoundDelivery]     = useState(false);
    const [lastNotifHandled  , setLastNotifHandled]  = useState('');
    const [orderProcessing   , setOrderProcessing ]  = useState(false);

    useEffect(() => {
        dispatch(getIsInSeason());
        dispatch(get_payment_details());
    }, []);

    useEffect(() => {
        if(ongoing_route) {
            setFoundSeller(true);
        }
    } , [ongoing_route , delivery_notif]);

    useEffect(() => {
        if(vipps_currentOrder) {
            if (do_print) {
                console.log('vipps_currentOrder = ', vipps_currentOrder);
            }
            setOrderProcessing(true);
        }
    }, [vipps_currentOrder]);

    useEffect(() => {
        if (!isObjEmpty(payment)) {
            const vipps_order_id = payment['vipps_order_id'];
            if(payment['status'] === 'paid') {
                paymentCompleted();
            }
            else if (payment['mongodb_id'] === "") {
                // there is no "current" payment to deal with
                setFoundDelivery(false);
                setOrderProcessing(false);
            }
            else if (vipps_order_id) {
                if (do_print) {
                    console.log('payment[\'vipps_order_id\'] = ', payment['vipps_order_id']);
                }
                setOrderProcessing(true);
            }
        }
    } , [payment]);

    useEffect(() => {
        if(yesReserveClicked === true) {
            let reserved_weeks = 4;
            if(yesReserve === false) {
                reserved_weeks = 0;
            }
            const current_requirement = store.getState().buy.current_requirement;
            const buyreq = {
                current_requirement: current_requirement,
                reserved_weeks: reserved_weeks
            }
            dispatch(putBuyRequest(email, buyreq));
        }
        setYesReserveClicked(false)
    } , [yesReserve , yesReserveClicked , dispatch , email]);

    useEffect(() => {
        if (cancelConfirmed === true && email !== '') {
            const purpose = store.getState().info.purpose
            if (purpose === 'CANCEL BUYREQ') {
                dispatch(deleteBuyRequest(email));
            }
            else if (purpose === 'CANCEL DELIVERY') {
                if (!ongoing_route || ongoing_route === "")  {
                    setFoundSeller(false);
                } else {
                    dispatch(postComplaintNondelivery(email, ongoing_route));
                }
            }
            else {
                dispatch(infoActions.setPurpose(''));
                dispatch(infoActions.setConfirmed(false));
            }
        }
    } , [cancelConfirmed , dispatch, email , ongoing_route]);

    useEffect(() => {
        if (has_a_buyrequest === false) {
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            navigate('/');
        }
    } , [has_a_buyrequest, navigate, dispatch]);

    useEffect(() => {
        if (email) {
            dispatch(getCurrentMatchForBuyer(email));
            dispatch(getDeliveryNotification(email));
            dispatch(getDeliveryHistory(email, 100));
        }
    } , [dispatch , email]);

    useEffect(() => {
        if(!email) {
            return;
        }
        if(!isObjEmpty(delivery_notif) && "ref_id" in delivery_notif) {
            if (lastNotifHandled && lastNotifHandled === delivery_notif['ref_id']) {
                return;
            }
            setFoundDelivery(true);
            return;
        }

        if (isObjEmpty(ongoing_route) || isObjEmpty(delivery_notif) || !('ref_id' in delivery_notif)) {
            setFoundSeller(false);
            setShowDeclineInfo(false);

            /*
            *   Attempting here to replace the socket-IO part with state-logic
            * */
            if (!isObjEmpty(ongoing_route)) {
                dispatch(buyActions.setMatchingOngoingRoute(ongoing_route));
                setFoundSeller(true);
            }

            if (!isObjEmpty(delivery_notif)) {
                if(delivery_notif['ref_id'] === lastNotifHandled) {
                    return;
                }
                dispatch(deliveryActions.setDeliveryNotification(delivery_notif));
                setFoundDelivery(true);
            }

            /*
            *
            * */

            // let socket;
            // if(socket) {
            //     socket.disconnect();
            // }
            // socket = connectSocketIo(sign({
            //     phone : store.getState().vipps.user.phone_number ,
            //     email : store.getState().user.name['email'] ,
            //     access_token : store.getState().vipps.access_token
            // } , process.env.REACT_APP_JWT_SECRET , {
            //     alg: "HS256",
            //     typ: "JWT"
            // }), {
            //     driverName : '' ,
            //     email : email
            // });
            //
            // if (do_print) {
            //     console.log('SOCKET.IO -> BuyRequestStatus :: getfoundbagstobuy');
            // }
            // socket.emit('getfoundbagstobuy');
            // socket.on('getfoundbagstobuy', (ongoing_route_from_stream) => {
            //     if (ongoing_route_from_stream !== '') {
            //         // This local variable will update the state, which in turn is the subject of a selector, which
            //         // then will updated our local state variable.
            //         dispatch(buyActions.setMatchingOngoingRoute(ongoing_route_from_stream));
            //         setFoundSeller(true);
            //     }
            // });
            //
            // if (do_print) {
            //     console.log('SOCKET.IO -> BuyRequestStatus :: getdelivery');
            // }
            // socket.emit('getdelivery');
            // socket.on('getdelivery', (delivery_notification_from_stream) => {
            //     if (delivery_notification_from_stream !== '') {
            //         if(delivery_notification_from_stream['ref_id'] === lastNotifHandled) {
            //             return;
            //         }
            //         dispatch(deliveryActions.setDeliveryNotification(delivery_notification_from_stream));
            //         setFoundDelivery(true);
            //     }
            // });
            //
            // socket.on('connect', () => {
            //     if (do_print) {
            //         console.log('Connected to socket.io');
            //     }
            // });
            // socket.on('disconnect', () => {
            //     if (do_print) {
            //         console.log('Disconnected from socket.io');
            //     }
            // });
            //
            // return () => socket.disconnect();

        } else {
            setFoundSeller(true);
        }
    } , [ongoing_route, email, dispatch, delivery_notif, lastNotifHandled]);

    const missingDelivery = (event) => {
        setShowDeclineInfo(!showDeclineInfo);
    };

    const cancelDelivery = (event) => {
        dispatch(infoActions.setPurpose('CANCEL DELIVERY'));
        dispatch(infoActions.setInformation({
            title : 'AVBRYT KJØPET' ,
            message: 'Er du sikker på at du vil avbryte kjøpet? (hvis ikke, klikk på utsiden for å fjerne dette vinduet)'
        }))
    };

    // const doReservedChanged = (event) => {
    //     setYesReserveClicked(true);
    //     setYesReserve(!yesReserve);
    // };

    const cancel = (event) => {
        dispatch(infoActions.setPurpose('CANCEL BUYREQ'));
        dispatch(infoActions.setInformation({
            title : 'AVBRYT SØKET' ,
            message: 'Er du sikker på at du vil avbryte søket? (hvis ikke, klikk på utsiden for å fjerne dette vinduet)'
        }));
    };

    let declineInfo = (<div></div>);
    if (showDeclineInfo) {
        declineInfo = (
            <div>
                <h1 className={classes.header2}>Å NEI :(</h1>
                <div className={classes.middleicon}>
                    <MdNotificationsActive />
                </div>
                <p className={classes.paragraph}>DETTE VAR DUMT. NÅR SJÅFØREN DIN IKKE LEVERER I TIDE GIR DET DEG RETT TIL Å AVBRYTE
                    KJØPET DERSOM DU ØNSKER DET. DENNE SJÅFØREN VIL FÅ BESKJED OM DETTE OG BLI SATT I KARANTENE FOR EN PERIODE.
                </p>
                <div className={classes.buttons}>
                    <button className={classes.button_cancel} onClick={cancelDelivery}>AVBRYT KJØPET</button>
                </div>
            </div>
        );
    }

    const paymentCompleted = () => {
        let notif_id = delivery_notif['ref_id'];
        if (notif_id) {
            if (do_print) {
                console.log('delivery_notif[\'ref_id\'] = ', notif_id);
            }
            setLastNotifHandled(notif_id);
            dispatch(putAcceptDelivery(email, notif_id));
        } else {
            if (do_print) {
                console.log('WARNING - Delivery Notification already cleared !!');
            }
        }
        dispatch(deliveryActions.clearDeliveryNotification());
        dispatch(deliveryActions.clearPayment());
        setFoundDelivery(false);
        setOrderProcessing(false);
    };

    const declineClicked = (feedback) => {
        setLastNotifHandled(delivery_notif['ref_id']);
        dispatch(postDeclineDelivery(email, delivery_notif['ref_id'], feedback));
        setFoundDelivery(false);
    };

    const earlier_deliveries = useSelector((state) => state.delivery.delivery_history);
    const [showPrev , setShowPrec] = useState(false);
    useEffect( () => {
        if(earlier_deliveries.length > 0) {
            setShowPrec(true);
        } else {
            setShowPrec(false);
        }
    } , [earlier_deliveries]);

    const seePrevDeliveries = (event) => {
      navigate('/buy/history');
    };

    return (
        <div>
            {showPrev &&
                <Card>
                    <div className={classes.centralize}>
                        <h1 className={classes.header3}>DU HAR TIDLIGERE UTFØRTE KJØP</h1>
                        <div className={classes.buttons}>
                            <button className={classes.button_ok} onClick={seePrevDeliveries}>KLIKK FOR Å SE</button>
                        </div>
                    </div>
                </Card>
            }
            {orderProcessing &&
                <OrderStatus
                    paymentCompleted={paymentCompleted}
                />
            }
            {!orderProcessing && foundDelivery &&
                <DeliveryChecker
                    paymentCompleted={paymentCompleted}
                    declineClicked={declineClicked}
                />
            }
            {!orderProcessing && !foundDelivery && foundSeller &&
                <div className={classes.centralize}>
                    <h1 className={classes.header}>VEDBJØRN HAR FUNNET VED TIL DEG</h1>

                    <div className={classes.middleicon}>
                        <GiWoodPile />
                    </div>

                    <p className={classes.paragraph}>DET KOMMER EN SJÅFØR TIL DEG FOR Å LEVERE {store.getState().buy.current_requirement} VED-SEKKER INNEN 2 DAGER.</p>
                    <p className={classes.paragraph}>NÅR SJÅFØREN HAR LAGT FRA SEG VEDEN VED BOLIGEN DIN VIL DU FÅ EN EPOST SAMT INFORMASJON HER PÅ DENNE SIDEN.</p>
                    <p className={classes.paragraph}>INFORMASJONEN INNEHOLDER ET BILDE AV VEDEN. I BILDET LIGGER DET OGSÅ TEKST SOM BESKRIVER
                        LEVERANSE-TIDSPUNKTET SAMT ANTALLET SEKKER.
                    </p>
                    <p className={classes.paragraph}>DU VIL OGSÅ FÅ EN BETALINGSANMODNING FRA VIPPS. DERSOM INFORMASJONEN I BILDET STEMMER SÅ ER DET VELDIG FINT OM DU KAN FÅ BETALT
                        SÅ FORT DU KAN.
                    </p>

                    <div className={classes.buttons}>
                        <button className={classes.button_cancel} onClick={missingDelivery}>DET HAR GÅTT MER EN 2 DAGER OG VEDEN MIN HAR IKKE KOMMET ENDA.</button>
                    </div>
                    {declineInfo}
                </div>
            }
            {!orderProcessing && !foundDelivery && !foundSeller &&
                <div>
                    {is_in_season &&
                        <div>
                            <h1 className={classes.header}>VEDBJØRN LETER ETTER VED FOR DEG</h1>
                            <BounceLoader
                                className={classes.spinwrap}
                                size={200}
                                color={"#732A20"}
                            />

                            <div className={classes.centralize}>
                                {/*<h3 className={classes.header2}>JA, JEG ØNSKER Å RESERVERE VED</h3>*/}
                                {/*<p className={classes.paragraph2}>*/}
                                {/*    (DETTE ER ET ALTERNATIVT VALGFRITT TILLEGG. GIR DEG PRIORITET OVENFOR ANDRE KJØPERE, KOSTER*/}
                                {/*    10 KR. EKSTRA PER SEKK SOM BETALES VED LEVERING)*/}
                                {/*</p>*/}
                                {/*<input*/}
                                {/*    className={classes.checkbox}*/}
                                {/*    onChange={doReservedChanged}*/}
                                {/*    type='checkbox' id='yesreserve'*/}
                                {/*    checked={yesReserve}*/}
                                {/*/>*/}

                                <h3 className={classes.header2}>HVA SKJER NÅR VEDBJØRN FINNER VED?</h3>
                                <p className={classes.paragraph2}>
                                    DA FÅR DU EN EPOST OM DET OG DU VIL OGSÅ SE EN STATUS-OPPDATERING OM DET PÅ DENNE
                                    SIDEN.
                                </p>

                                <p className={classes.paragraph2}>
                                    DERSOM MARKEDET I NÆRHETEN AV DER DU ER LIGGER TILRETTE FOR DET SÅ VIL VEDBJØRN
                                    FINNE VED TIL DEG CA 1 GANG PER UKE
                                </p>
                            </div>
                        </div>
                    }
                    { !is_in_season &&
                        <div>
                            <h1 className={classes.header}>VEDBJØRN ER UTENFOR SESONGEN</h1>
                            <div className={classes.centralize}>
                                <h3 className={classes.header2}>SÅ HVA SKJER NÅ DA?</h3>
                                <p className={classes.paragraph2}>
                                    NÅR SESONGEN STARTER IGJEN (NOVEMBER) DA VIL DU AUTOMATISK VÆRE REGISTRERT SOM
                                    VED-ABONNENT. DU TRENGER IKKE GJØRE NOE MER HER.
                                </p>
                            </div>
                        </div>
                    }

                    {/*<MarketMiniStats/>*/}

                    <div className={classes.buttons}>
                        <button className={classes.button_cancel} onClick={cancel}>AVBRYT</button>
                    </div>

                </div>
            }
        </div>
    );
};

export default BuyRequestStatus;
