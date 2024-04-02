
import {do_print} from "../../routes";

import classes from './NewDeals.module.css';
import {BsHandThumbsDown, BsHandThumbsUp} from "react-icons/bs";
import {useEffect, useState} from "react";
import {infoActions} from "../../store/info-slice";
import {useDispatch, useSelector} from "react-redux";
import store from "../../store";
import {acceptNewDeal} from "../../store/sell-http";

const NewDealItem = (props) => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.user.name.email);

    const cardClicked = (event) => {
        if(do_print) {
            console.log(props.deal);
        }
        props.cardClicked(props.index);
    };

    const acceptClicked = (event) => {
        dispatch(acceptNewDeal(email, props.deal.planned_routes_id, true));
        dispatch(infoActions.setInformation({
            title : 'OPPDRAG GODKJENT' ,
            message: 'Dette oppdraget er nå godkjent fra din side. Det kan hende det er flere selgere som må godkjenne oppdraget før sjåføren ' +
                'kan iverksette. Dersom det bare er deg, eller alle øvrige selgere også har godkjent, da vil sjåføren få beskjed om å sette i gang. ' +
                'Da vil du også samtidig få beskjed om å klargjøre leveransen for henting. Det kan være en god ide å allerede nå gjøre klar ' +
                String(props.deal.numBags) + ' vedsekker for henting.'
        }));
    };

    const rejectClicked = (event) => {
        dispatch(infoActions.setPurpose('REJECT DEAL'));
        dispatch(infoActions.setInformation({
            title : 'AVSLÅ AVTALE' ,
            message: 'Dersom du avslår avtalen, så taper du salget. Det er sjelden noen god ide. Er du sikker på at det er dette du vil?' +
                ' (hvis ikke, klikk på utsiden for å fjerne dette vinduet)'
        }));
    };
    const rejectConfirmed = useSelector((state) => state.info.confirmed);
    useEffect(() => {
        if (rejectConfirmed === true && email !== '') {
            if (store.getState().info.purpose === 'REJECT DEAL') {
                dispatch(acceptNewDeal(email, props.deal.planned_routes_id, false));
            } else {
                dispatch(infoActions.setPurpose(''));
                dispatch(infoActions.setConfirmed(false));
            }
        }
    } , [rejectConfirmed , dispatch, email, props.index, props.deal.planned_routes_id]);

    const [timeStr, setTimeStr] = useState('');
    const [hasAccepted, setHasAccepted] = useState(false);
    useEffect(() => {
        const date = new Date(props.deal.calc_time * 1000);
        setTimeStr(String(date.toLocaleString()).toUpperCase());
        if (props.deal.accepted === true) {
            setHasAccepted(true);
        } else {
            setHasAccepted(false);
        }
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
                    { !hasAccepted &&
                        <div className={classes.gridcontainer}>
                            <div className={classes.gridleft} onClick={acceptClicked}>
                                <p className={classes.paragraph}>GODKJENN</p>
                                <div className={classes.centralize}>
                                    <BsHandThumbsUp className={classes.downloadicon}/>
                                </div>
                            </div>
                            <div className={classes.gridright} onClick={rejectClicked}>
                                <p className={classes.paragraph}>AVSLÅ</p>
                                <BsHandThumbsDown className={classes.downloadicon}/>
                            </div>
                        </div>
                    }
                    { hasAccepted &&
                        <div className={classes.centralize}>
                            <h1 className={classes.header2}>GODKJENT</h1>
                            <p className={classes.paragraph}>( VENTER... )</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default NewDealItem;
