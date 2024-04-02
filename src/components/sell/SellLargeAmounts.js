
import Card from "../UI/Card";
import classes from "./MakeSellRequest.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getBatchSell, setBatchSell} from "../../store/sell-http";

const SellLargeAmounts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const has_sent_batchsell_request = useSelector((state) => state.sell.has_sent_batchsell_request);

    const [showDoSell   , setShowDoSell  ] = useState(false);

    useEffect(() => {
        dispatch(getBatchSell());
    }, [dispatch])

    const showDoSellChanged = (event) => {
        setShowDoSell(!showDoSell);
    };

    const backClicked = (event) => {
        navigate('/sell');
    };

    const contactMeClicked = () => {
        dispatch(setBatchSell());
    };

    return (
        <div>

            <div>
                <h1 className={classes.header}>SELGE VED-LASS</h1>
                <p className={classes.paragraph}>
                    ØNSKER DU Å SELGE EN STØRRE MENGDE VED ALT PÅ EN GANG? DET KAN VÆRE ET GODT ALTERNATIV FOR DEG SOM
                    TRENGER Å BLI KVITT MYE VED.
                </p>

                <p className={classes.paragraph}>
                    DET FOREGÅR SLIK AT DU BEKREFTER NEDENFOR AT DU HAR VED Å SELGE, OG DERETTER TRYKKER DU PÅ EN KNAPP
                    SOM GJØR AT VI I VEDBJØRN FÅR BESKJED OM AT DU HAR VED Å SELGE. DA VIL VI TA KONTAKT MED DEG SÅ SNART VI
                    KAN FOR Å GJØRE EN AVTALE.
                </p>
            </div>

            <Card>

                {!has_sent_batchsell_request &&
                    <div>
                        <p className={classes.paragraph}>JA, JEG VIL SELGE ET VEDLASS</p>
                        <input
                            className={classes.checkbox}
                            type='checkbox'
                            checked={showDoSell}
                            onChange={showDoSellChanged}
                        />
                    </div>
                }

                {has_sent_batchsell_request &&
                    <h1 className={classes.header2}>
                        DU HAR ALLEREDE BEDT OM Å BLI KONTAKTET. VI TAR KONTAKT MED DEG SÅ SNART VI KAN.
                    </h1>
                }

                { showDoSell && !has_sent_batchsell_request &&
                    <div className={classes.buttons}>
                        <button className={classes.button_orange} onClick={contactMeClicked}>KONTAKT MEG</button>
                    </div>
                }

            </Card>

            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={backClicked}>TILBAKE</button>
            </div>

        </div>
    );
};

export default SellLargeAmounts;
