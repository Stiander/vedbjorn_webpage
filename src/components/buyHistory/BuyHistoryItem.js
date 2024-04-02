
import {do_print} from "../../routes";

import classes from './BuyHistory.module.css';
import {useEffect, useState} from "react";
import {BsCloudDownload} from "react-icons/bs";
import {getDeliveryReceipt} from "../../store/delivery-http";
import {useDispatch} from "react-redux";

const BuyHistoryItem = (props) => {
    const dispatch = useDispatch();
    const cardClicked = (event) => {
        if (do_print) {
            console.log(props.delivery);
        }
    };

    const [timeStr, setTimeStr] = useState('');
    useEffect(() => {
        const date = new Date(props.delivery.time * 1000);
        setTimeStr(String(date.toLocaleString()).toUpperCase());
    } , [props.delivery, setTimeStr]);

    const downloadClicked = (event) => {
        dispatch(getDeliveryReceipt(props.delivery.deliveries_id))
    };

    return (
        <div className={classes.innercard} onClick={cardClicked}>
            <div className={classes.centralize}>
                <h1 className={classes.paragraph}>{timeStr}</h1>
            </div>
                <div className={classes.gridcontainer}>
                    <div className={classes.gridleft}>
                        <p className={classes.paragraph}>{props.delivery.amount} SEKKER</p>
                        <p className={classes.paragraph}>{props.delivery.paidAmount} KR</p>
                        <p className={classes.paragraph}>LEVERT AV {String(props.delivery.driverEmail).toUpperCase()}</p>
                        <p className={classes.paragraph}>SOLGT AV {String(props.delivery.sellerEmail).toUpperCase()}</p>
                    </div>
                    <div className={classes.gridright} onClick={downloadClicked}>
                        <p className={classes.paragraph}>LAST NED</p>
                        <BsCloudDownload className={classes.downloadicon} />
                    </div>
                </div>
        </div>
    );
};

export default BuyHistoryItem;
