
import {do_print} from "../../routes";

import classes from './SellStatus.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {infoActions} from "../../store/info-slice";
import store from "../../store";
import {
    deleteSellRequest,
    getPrevSales,
    getSellRequestDealsOngoing,
    getSellRequestNewDeals
} from "../../store/sell-http";
import MarketMiniStats from "../stats/MarketMiniStats";
import Card from "../UI/Card";
import {connectSocketIo} from "../streaming/socket";
import sign from "jwt-encode";
import {getIsInSeason} from "../../store/adm-http";

const SellStatus = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [hasNewDeals     , setHasNewDeals     ] = useState(false);
    const [hasOngoingDeals , setHasOngoingDeals ] = useState(false);
    const [showPrevSales   , setShowPrevSales   ] = useState(false);

    const is_in_season      = useSelector((state) => state.adm.is_in_season);
    const cancelConfirmed   = useSelector((state) => state.info.confirmed);
    const email             = useSelector((state) => state.user.name.email);
    const new_deals         = useSelector((state) => state.sell.new_deals);
    const ongoing_deals     = useSelector((state) => state.sell.ongoing_deals);
    const has_a_sellrequest = useSelector((state) => state.sell.has_a_sellrequest);
    const seller_email      = useSelector((state) => state.sell.email);
    const old_sales         = useSelector((state) => state.sell.completed_sells);

    useEffect(() => {
        dispatch(getIsInSeason());
    }, []);

    useEffect(() => {
        if (cancelConfirmed === true && email !== '') {
            if (store.getState().info.purpose === 'CANCEL SELLREQ') {
                dispatch(deleteSellRequest(email));
            } else {
                dispatch(infoActions.setPurpose(''));
                dispatch(infoActions.setConfirmed(false));
            }
        }
    } , [cancelConfirmed , dispatch, email]);

    useEffect(() => {
        if (has_a_sellrequest === false) {
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            navigate('/');
        }
    } , [has_a_sellrequest, navigate, dispatch]);

    useEffect(() => {
        if(!seller_email) {
            return;
        }
        dispatch(getSellRequestNewDeals(seller_email));
        dispatch(getSellRequestDealsOngoing(seller_email));
        let socket;
        socket = connectSocketIo(sign({
            phone : store.getState().user.name['phone'] ,
            email : store.getState().user.name['email'] ,
            access_token : store.getState().vipps.access_token
        } , process.env.REACT_APP_JWT_SECRET , {
            alg: "HS256",
            typ: "JWT"
        }), {
            email : seller_email
        });

        if (do_print) {
            console.log('SOCKET.IO -> SellStatus :: getnewdeals');
        }

        socket.emit('getnewdeals');
        socket.on('getnewdeals', (num) => {
            if( (!hasNewDeals && num > 0) || (hasNewDeals && num <= 0) ) {
                dispatch(getSellRequestNewDeals(seller_email));
            }
        });

        if (do_print) {
            console.log('SOCKET.IO -> SellStatus :: getnongoingdeals');
        }

        socket.emit('getnongoingdeals');
        socket.on('getnongoingdeals', (num) => {
            if( (!hasOngoingDeals && num > 0) || (hasOngoingDeals && num <= 0) ) {
                dispatch(getSellRequestDealsOngoing(seller_email));
            }
        });

        if (do_print) {
            console.log('SOCKET.IO -> BuyRequestStatus :: gethasolddeals');
        }

        socket.emit('gethasolddeals');
        socket.on('gethasolddeals', (num) => {
            if (num > 0) {
                if (showPrevSales === false) {
                    dispatch(getPrevSales(seller_email));
                }
                setShowPrevSales(true);
            }
        });

        socket.on('connect' , () => {
            if (do_print) {
                console.log('Connected to socket.io');
            }
        });
        socket.on('disconnect' , () => {
            if (do_print) {
                console.log('Disconnected from socket.io');
            }
        });
        return () => socket.disconnect();
    } , [seller_email, dispatch, hasNewDeals, hasOngoingDeals, showPrevSales]);

    useEffect(() => {
        if(new_deals.length > 0) {
            setHasNewDeals(true);
        } else {
            setHasNewDeals(false);
        }
    } , [new_deals]);

    useEffect(() => {
        if(ongoing_deals.length > 0) {
            setHasOngoingDeals(true);
        } else {
            setHasOngoingDeals(false);
        }
    } , [ongoing_deals]);

    useEffect(() => {
        if(seller_email !== '') {
            dispatch(getPrevSales(seller_email));
        }
    } , [dispatch, seller_email]);

    useEffect(() => {
        if(old_sales.length > 0) {
            setShowPrevSales(true);
        } else {
            setShowPrevSales(false);
        }
    } , [old_sales]);

    const seeNewDeals = (event) => {
        navigate('/sell/deals/new');
    };

    const seeOngoingDeals = (event) => {
      navigate('/sell/deals/ongoing');
    };

    const goToInfo = (event) => {
        navigate('/sellinfo');
    };

    const cancel = (event) => {
        dispatch(infoActions.setPurpose('CANCEL SELLREQ'));
        dispatch(infoActions.setInformation({
            title : 'AVBRYT SØKET' ,
            message: 'Er du sikker på at du vil avbryte søket? (hvis ikke, klikk på utsiden for å fjerne dette vinduet)'
        }))
    };

    const seePrevSales = (event) => {
        navigate('/sell/deals/old');
    };

    return (
        <div>
            {showPrevSales &&
                <Card>
                    <div className={classes.centralize}>
                        <h1 className={classes.header3}>DU HAR {old_sales.length} TIDLIGERE UTFØRTE SALG</h1>
                        <div className={classes.buttons}>
                            <button className={classes.button_ok} onClick={seePrevSales}>KLIKK FOR Å SE</button>
                        </div>
                    </div>
                </Card>
            }
            {hasNewDeals &&
                <Card>
                    <div className={classes.centralize}>
                        <h1 className={classes.header3}>DU HAR {new_deals.length} NYE SALG</h1>
                        <div className={classes.buttons}>
                            <button className={classes.button_ok} onClick={seeNewDeals}>KLIKK FOR Å SE</button>
                        </div>
                    </div>
                </Card>
            }
            {hasOngoingDeals &&
                <Card>
                    <div className={classes.centralize}>
                        <h1 className={classes.header3}>DU HAR {ongoing_deals.length} PÅGÅENDE SALGSPROSESSER</h1>
                        <div className={classes.buttons}>
                            <button className={classes.button_ok} onClick={seeOngoingDeals}>KLIKK FOR Å SE</button>
                        </div>
                    </div>
                </Card>
            }

            {is_in_season &&
                <div>
                    <h1 className={classes.header}>VEDBJØRN LETER ETTER KUNDER FOR DEG</h1>
                    <BounceLoader
                        className={classes.spinwrap}
                        size={200}
                        color={"#732A20"}
                    />

                    <div className={classes.centralize}>
                        <h3 className={classes.header2}>HVA SKJER VIDERE NÅ?</h3>
                        <p className={classes.paragraph2}>
                            VEDBJØRN ER I TENKEBOKSEN OG PRØVER Å FINNE KUNDER FOR Å KJØPE VEDEN DIN SAMT SJÅFØRER FOR Å
                            HENTE VEDEN
                            DIN HOS DEG OG LEVERE DEN FOR DEG UT TIL KUNDENE.
                        </p>

                        <p className={classes.paragraph2}>
                            NÅR DETTE SKJER DA VIL DU FÅ EN EPOST MED INFORMASJON OM HVEM DET ER SOM KOMMER TIL DEG FOR
                            Å HENTE OG
                            SÅNN CA NÅR DETTE BLIR. DU VIL OGSÅ FÅ OPP DENNE INFORMASJONEN HER PÅ DENNE SIDEN.
                        </p>
                    </div>
                </div>
            }
            {!is_in_season &&
                <div>
                    <h1 className={classes.header}>VEDBJØRN ER UTENFOR SESONGEN</h1>
                    <div className={classes.centralize}>
                        <h3 className={classes.header2}>SÅ HVA SKJER NÅ DA?</h3>
                        <p className={classes.paragraph2}>
                            NÅR SESONGEN STARTER IGJEN (NOVEMBER) DA VIL DU AUTOMATISK VÆRE REGISTRERT SOM
                            SELGER. DU TRENGER IKKE GJØRE NOE MER HER.
                        </p>
                    </div>
                </div>
            }

            {/*<MarketMiniStats />*/}

            <p className={classes.paragraph_link} onClick={goToInfo}>
                KLIKK ELLER TRYKK HER FOR MER INFORMASJON OM SELVE PROSESSEN
            </p>

            <div className={classes.buttons}>
                <button className={classes.button_cancel} onClick={cancel}>AVBRYT</button>
            </div>

        </div>
    );
};

export default SellStatus;
