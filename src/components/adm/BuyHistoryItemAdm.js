
import {do_print} from "../../routes";

import classes from '../buyHistory/BuyHistory.module.css';
import {useEffect, useState} from "react";
import {BsCloudDownload} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {getDeliveryReceipt_ADM} from "../../store/adm-http";

const BuyHistoryItemAdm = (props) => {
    const dispatch = useDispatch();
    const [mvaState, setMvaState] = useState(true);

    const mvaStateChanged = (event) => {
        setMvaState(!mvaState);
    };

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
        dispatch(getDeliveryReceipt_ADM(props.delivery.deliveries_id, mvaState));
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
                    <p className={classes.paragraph}>KJØPT AV {String(props.delivery.email).toUpperCase()}</p>
                    <p className={classes.paragraph}>LEVERT AV {String(props.delivery.driverEmail).toUpperCase()}</p>
                    <p className={classes.paragraph}>SOLGT AV {String(props.delivery.sellerEmail).toUpperCase()}</p>
                </div>
                <div className={classes.gridright}>
                    <p className={classes.paragraph}>MVA</p>
                    <input
                        className={classes.checkbox}
                        type='checkbox'
                        checked={mvaState}
                        onChange={mvaStateChanged}
                    />
                    <p className={classes.paragraph}>LAST NED</p>
                    <BsCloudDownload className={classes.downloadicon} onClick={downloadClicked}/>
                </div>
            </div>
        </div>
    );
};

export default BuyHistoryItemAdm;
