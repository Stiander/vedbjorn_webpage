
import classes from "./AdminPanel.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import React from "react";
import Card from "../UI/Card";
import {useNavigate} from "react-router-dom";
import {getDeliveryHistory_ADM} from "../../store/adm-http";
import BuyHistoryItemAdm from "./BuyHistoryItemAdm";

const Attachments = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const earlier_deliveries = useSelector((state) => state.adm.delivery_history_ADM);
    const is_admin = useSelector((state) => state.adm.is_admin);

    useEffect(() => {
        if(is_admin) {
            dispatch(getDeliveryHistory_ADM(100));
        }
    } , [is_admin, dispatch]);

    const backClicked = (event) => {
        navigate('/adm');
    };

    return (
        <Card>
            <h1 className={classes.header}>BILAG</h1>
            <button className={classes.button_ok_small} onClick={backClicked}>TILBAKE</button>

            <h1 className={classes.header}>KUNDERS KJØPS-HISTORIKK</h1>
            <Card>
                {
                    earlier_deliveries.map((delivery, index) => (
                        <BuyHistoryItemAdm
                            key={index}
                            delivery={delivery}
                        />
                    ))
                }
            </Card>

        </Card>
    );
};

export default Attachments;
