
import classes from './DeliveryChecker.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getDeliveryProof} from "../../store/delivery-http";
import {infoActions} from "../../store/info-slice";
import store from "../../store";
import React from "react";
import {vipps_initiate} from "../../store/vipps-http";
import {vippsActions} from "../../store/vipps-slice";
import {isObjEmpty} from "../../miscFuncs";

const DeliveryChecker = (props) => {
    const dispatch = useDispatch();

    const delivery_notif     = useSelector((state) => state.delivery.deliveryNotification);
    const delivery_proof     = useSelector((state) => state.delivery.img);
    const vipps_paylink      = useSelector((state) => state.vipps.paylink);

    const [text            , setText            ] = useState("");
    const [showDeclineText , setShowDeclineText ] = useState(false);
    const [declineText     , seteclineText      ] = useState('AVSLÅ');

    useEffect(() => {
        if (!isObjEmpty(delivery_notif) && "ref_id" in delivery_notif) {
            if('web_text' in delivery_notif) {
                setText(delivery_notif['web_text']);
            }
            else if('text' in delivery_notif) {
                setText(delivery_notif['text']);
            }
            if('ref_id' in delivery_notif && delivery_proof === null) {
                dispatch(getDeliveryProof(delivery_notif['ref_id']));
            }
        }
    } , [delivery_notif, delivery_proof, dispatch]);

    const initializePaymentProcedure = (event) => {
        //
        // 1.
        // VIPPS ** Initiate **
        //
        //      See : https://vippsas.github.io/vipps-developer-docs/docs/APIs/ecom-api/vipps-ecom-api
        //
        dispatch(vipps_initiate());

        //
        // 2.
        // VIPPS ** Capture **
        //
        //      See : https://vippsas.github.io/vipps-developer-docs/docs/APIs/ecom-api/vipps-ecom-api
        //

        // ... then :
        //props.paymentCompleted();
    };

    useEffect( () => {
        if (vipps_paylink) {
            window.open(vipps_paylink);
            dispatch(vippsActions.setPayLink(""));
        }
    }, [vipps_paylink, dispatch]);

    const declineClicked = (event) => {
        setShowDeclineText(!showDeclineText);
    };
    useEffect(() => {
        if(showDeclineText) {
            seteclineText('IKKE AVSLÅ ALLIKEVEL');
        } else {
            seteclineText('AVSLÅ');
        }
    } , [showDeclineText])

    const [isWrongAmount, setIsWrongAmount] = useState(false);
    const isWrongAmountChanged = () => {
        setIsWrongAmount(!isWrongAmount);
    };

    const [badQuality, setBadQuality] = useState(false);
    const badQUalityChanged = () => {
        setBadQuality(!badQuality);
    };

    const [wrongPrice, setWrongPrice] = useState(false);
    const wrongPriceChanged = () => {
        setWrongPrice(!wrongPrice);
    };

    const modalConfirmed  = useSelector((state) => state.info.confirmed);
    const [declineConfirmation, setDeclineConfirmation] = useState(false);
    const declineConfirmed = () => {
        dispatch(infoActions.setPurpose('DECLINE DELIVERY'));
        dispatch(infoActions.setInformation({
            title : 'AVSLÅ LEVERANSEN' ,
            message: 'Er du sikker på at du vil avslå leveransen? (hvis ikke, klikk på utsiden for å fjerne dette vinduet)'
        }));
    };
    useEffect(() => {
        if (modalConfirmed === true) {
            const purpose = store.getState().info.purpose;
            if (purpose === 'DECLINE DELIVERY') {
                setDeclineConfirmation(true);
            }
        } else {
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
        }
    } , [modalConfirmed, dispatch]);
    useEffect(() => {
        if(declineConfirmation === true) {
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            props.declineClicked({
                isWrongAmount : isWrongAmount ,
                badQuality : badQuality ,
                wrongPrice : wrongPrice
            });
        }
    } , [declineConfirmation, dispatch, isWrongAmount, badQuality, wrongPrice, props]);

    return (
        <div>
            <div className={classes.centralize}>
                <h1 className={classes.header}>LEVERANSE</h1>
                {!showDeclineText &&
                    <div>
                        <p className={classes.paragraph}>{String(text).toUpperCase()}</p>
                        <div>
                            <img src={delivery_proof}  alt="Bildet kommer her, forhåpentligvis.." />
                        </div>
                    </div>
                }
            </div>

            {!showDeclineText &&
                // <div className={classes.buttons}>
                //     <button className={classes.button_ok} onClick={approveClicked}>GODKJENN</button>
                // </div>
                //

                <div className={classes.loginbox}>
                    <img
                        src={require("../../assets/pay_with_vipps_pill_250_NO@2x.png")}
                        className={classes.loginbox}
                        onClick={initializePaymentProcedure}
                    />
                </div>
            }
            <div className={classes.buttons}>
                <button className={classes.button_cancel} onClick={declineClicked}>{declineText}</button>
            </div>
            { showDeclineText &&
                <div className={classes.centralize}>
                    <h1 className={classes.header}>HVA GIKK GALT?</h1>
                    <p className={classes.paragraph2}>
                        DETTE VAR LITT NEDTUR DA. VI GJØR VÅRT YTTERSTE FOR AT ALLE VEDKJØPERE I VEDBJØRN VET HVA SOM KAN
                        FORVENTES AV LEVERANSENE. MEN DERSOM DU MENER AT VI HAR BOMMET HER SÅ ER DET SELVSAGT DIN RETT
                        SOM FORBRUKER Å AVSLÅ LEVERANSEN.
                    </p>
                    <p className={classes.paragraph2}>
                        FOR AT VI SKAL KUNNE VITE HVORDAN VI KAN FORBEDRE TJENESTEN SLIK AT EN FREMTIDIG LEVERANSE KAN BLI
                        GODKJENT AV DEG SÅ BER VI DEG OM Å SPESIFISERE PÅ HVILKE OMRÅDER LEVERANSEN VAR MISLYKKET.
                    </p>

                    <div>
                        <input
                            className={classes.checkbox}
                            type='checkbox'
                            checked={isWrongAmount}
                            onChange={isWrongAmountChanged}
                        />
                        <p className={classes.paragraph}>FEIL MENGDE VED (SJÅFØREN HAR BOMMET)</p>
                    </div>
                    <br/>

                    <div>
                        <input
                            className={classes.checkbox}
                            type='checkbox'
                            checked={wrongPrice}
                            onChange={wrongPriceChanged}
                        />
                        <p className={classes.paragraph}>FEIL PRIS (VEDBJØRN HAR BOMMET)</p>
                    </div>
                    <br/>

                    <div>
                        <input
                            className={classes.checkbox}
                            type='checkbox'
                            checked={badQuality}
                            onChange={badQUalityChanged}
                        />
                        <p className={classes.paragraph}>FOR DÅRLIG KVALITET (SELGEREN HAR BOMMET)</p>
                    </div>
                    <br/>

                    <div className={classes.buttons}>
                        <button className={classes.button_cancel} onClick={declineConfirmed}>SEND INN AVSLAGET</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default DeliveryChecker;
