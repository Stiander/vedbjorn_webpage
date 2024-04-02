
import classes from './DriveHistory.module.css';
import {BsCloudDownload} from "react-icons/bs";
import {useDispatch} from "react-redux";
import {getFinishedRouteInvoice, getFinishedRouteReceipt} from "../../store/drive-http";

const DriveHistoryItem = (props) => {
    const dispatch = useDispatch();
    let cardClass;
    if (props.emphasize === true) {
        cardClass = classes.innercard_emphasize;
    } else {
        cardClass = classes.innercard;
    }

    const cardClicked = (event) => {
        props.cardClicked(props.index);
    };

    const downloadClicked = (event) => {
        dispatch(getFinishedRouteReceipt(props.assignment.wrapup));
    };

    const downloadInvoiceClicked = (event) => {
        dispatch(getFinishedRouteInvoice(props.assignment.wrapup));
    };

    let num_pickups = 0;
    let num_deliveries = 0;
    let num_bags = 0;
    props.assignment.route.map((visit) => {
       if(visit.type === 'pickup') {
           num_pickups++;
           num_bags = num_bags + (visit.loaded_after - visit.loaded_before);
       } else if(visit.type === 'delivery') {
           num_deliveries++;
       }
    });

    return (
        <div className={cardClass} onClick={cardClicked}>
            <div className={classes.centralize}>
                <h1 className={classes.paragraph}>{props.assignment.finished_time_str}</h1>
            </div>

            <div className={classes.gridcontainer}>
                <div className={classes.gridleft}>
                    <p className={classes.paragraph2}>OPPLASTINGER : {num_pickups}</p>
                    <p className={classes.paragraph2}>LEVERINGER : {num_deliveries}</p>
                    <p className={classes.paragraph2}>SEKKER : {num_bags}</p>
                </div>
                <div className={classes.gridright} onClick={downloadClicked}>
                    <p className={classes.paragraph}>OPPDRAGET</p>
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

export default DriveHistoryItem;
