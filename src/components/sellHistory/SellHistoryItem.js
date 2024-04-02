
import classes from './SellHistory.module.css';
import {useEffect, useState} from "react";
import {BsCloudDownload} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {getSellInvoice, getSellReceipt} from "../../store/sell-http";

const SellHistoryItem = (props) => {

    const dispatch = useDispatch();

    const seller_email = useSelector((state) => state.sell.email);

    const [timeStr, setTimeStr] = useState('');

    useEffect(() => {
        const date = new Date(props.sell.calc_time * 1000);
        setTimeStr(String(date.toLocaleString()).toUpperCase());
    } , [props.sell, setTimeStr]);

    const downloadClicked = (event) => {
        dispatch(getSellReceipt(props.sell.ongoing_routes_id, seller_email));
    };

    const downloadInvoiceClicked = () => {
        dispatch(getSellInvoice(props.sell.ongoing_routes_id, seller_email));
    };

    return (
        <div className={classes.innercard}>
            <div className={classes.centralize}>
                <h1 className={classes.paragraph}>{timeStr}</h1>
            </div>

            <div className={classes.gridcontainer}>
                <div className={classes.gridleft}>
                    <p className={classes.paragraph}>{props.sell.numBags} SEKKER</p>
                    <p className={classes.paragraph}>{props.sell.earningEstimate} KR</p>
                    <p className={classes.paragraph}>LEVERT AV {String(props.sell.driverEmail).toUpperCase()}</p>
                </div>

                <div className={classes.gridright} onClick={downloadClicked}>
                    <p className={classes.paragraph}>HENTING</p>
                    <BsCloudDownload className={classes.downloadicon} />
                </div>

                <div className={classes.gridmid} onClick={downloadInvoiceClicked}>
                    <p className={classes.paragraph}>REGNINGEN</p>
                    <BsCloudDownload className={classes.downloadicon} />
                </div>

            </div>
        </div>
    );
};

export default SellHistoryItem;
