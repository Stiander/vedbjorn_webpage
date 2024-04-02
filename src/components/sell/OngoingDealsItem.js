
import {do_print} from "../../routes";

import classes from './NewDeals.module.css';
import {useState, useEffect} from "react";

const OngoingDealsItem = (props) => {

    const cardClicked = (event) => {
        if (do_print) {
            console.log('ONGOING DEAL : ', props.deal);
        }
    };

    const [timeStr, setTimeStr] = useState('');
    useEffect(() => {
        const date = new Date(props.deal.calc_time * 1000);
        setTimeStr(String(date.toLocaleString()).toUpperCase());
    } , [props.deal, setTimeStr]);

    return (
        <div className={classes.innercard} onClick={cardClicked}>
            <div className={classes.centralize}>
                <h1 className={classes.paragraph}>{timeStr}</h1>
            </div>

            <div className={classes.gridcontainer}>

                <div className={classes.gridleft}>
                    <p className={classes.paragraph2}>SEKKER : {props.deal.numBags}</p>
                    <p className={classes.paragraph2}>BEREGNET INNTEKT : {props.deal.earningEstimate}</p>
                    <p className={classes.paragraph2}>SJÅFØR : {String(props.deal.driverName + '  (' + props.deal.driverEmail + ')').toUpperCase()}</p>
                </div>

                <div className={classes.gridright}>
                </div>

            </div>

        </div>
    );
};

export default OngoingDealsItem;
