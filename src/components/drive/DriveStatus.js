
import {do_print} from "../../routes";

import classes from './DriveStatus.module.css';
import {BounceLoader} from "react-spinners";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {infoActions} from "../../store/info-slice";
import store from "../../store";
import {deleteDriveRequest, getDrivePlannedRoute, getOldCompletedAssignments} from "../../store/drive-http";
import MarketMiniStats from "../stats/MarketMiniStats";
import {connectSocketIo} from "../streaming/socket";
import {driveActions} from "../../store/drive-slice";
import Card from "../UI/Card";
import sign from "jwt-encode";
import {getIsInSeason} from "../../store/adm-http";

const DriveStatus = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [hasAssignment       , setHasAssignment       ] = useState(false);
    const [assignmentCountdown , setAssignmentCountdown ] = useState(0);
    const [showPrev            , setShowPrec            ] = useState(false);

    const is_in_season       = useSelector((state) => state.adm.is_in_season);
    const email              = useSelector((state) => state.user.name.email);
    const cancelConfirmed    = useSelector((state) => state.info.confirmed);
    const has_a_driverequest = useSelector((state) => state.drive.has_a_driverequest);
    const driverName         = useSelector((state) => state.drive.name);
    const old_routes         = useSelector((state) => state.route.completed_routes);
    const planned_route      = useSelector((state) => state.route.route);

    useEffect(() => {
        dispatch(getIsInSeason());
    }, []);

    useEffect(() => {
        if(planned_route && !(!planned_route['id']) && planned_route['wrapup'] === "") {
            setHasAssignment(true);
            dispatch(driveActions.setHasDriveAssignment(true));
        }
    } , [planned_route, dispatch]);

    useEffect(() => {
        if (cancelConfirmed === true && email !== '') {
            if (store.getState().info.purpose === 'CANCEL DRIVEREQ') {
                dispatch(deleteDriveRequest(email));
            } else {
                dispatch(infoActions.setPurpose(''));
                dispatch(infoActions.setConfirmed(false));
            }
        }
    } , [cancelConfirmed , dispatch, email]);

    useEffect(() => {
        if (has_a_driverequest === false) {
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            navigate('/');
        }
    } , [has_a_driverequest, navigate, dispatch]);

    useEffect(() => {
        if(driverName !== '') {
            dispatch(getOldCompletedAssignments(driverName));
        }
    } , [dispatch, driverName]);

    useEffect(() => {
        if(old_routes.length > 0) {
            setShowPrec(true);
        } else {
            setShowPrec(false);
        }
    } , [old_routes]);

    useEffect(() => {
        let socket;
        dispatch(getDrivePlannedRoute(driverName));
        if(socket) {
            socket.disconnect();
        }
        socket = connectSocketIo(sign({
            phone : store.getState().user.name['phone'] ,
            email : store.getState().user.name['email'] ,
            access_token : store.getState().vipps.access_token
        } , process.env.REACT_APP_JWT_SECRET , {
            alg: "HS256",
            typ: "JWT"
        }), {
            driverName : driverName
        });

        if (do_print) {
            console.log('SOCKET.IO -> DriveStatus :: getnewassignments');
        }
        socket.emit('getnewassignments');

        socket.on('getnewassignments', (countdown) => {
            if (countdown > 0) {
                setAssignmentCountdown(Math.round(countdown));
                setHasAssignment(true);
                dispatch(driveActions.setHasDriveAssignment(true));
            } else {
                setHasAssignment(false);
                dispatch(driveActions.setHasDriveAssignment(false));
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
    }, [driverName, dispatch]);

    const cancel = (event) => {
        dispatch(infoActions.setPurpose('CANCEL DRIVEREQ'));
        dispatch(infoActions.setInformation({
            title : 'AVBRYT SØKET' ,
            message: 'Er du sikker på at du vil avbryte søket? (hvis ikke, klikk på utsiden for å fjerne dette vinduet)'
        }));
    };

    const seeAssignment = (event) => {
        navigate('/driveassignment')
    };

    const seeOldAssignments = (event) => {
        navigate('/driveassignment/old');
    };

    return (
        <div>
            {showPrev &&
                <Card>
                    <div className={classes.centralize}>
                        <h1 className={classes.header3}>DU HAR {old_routes.length} TIDLIGERE UTFØRTE OPPDRAG</h1>
                        <div className={classes.buttons}>
                            <button className={classes.button_ok} onClick={seeOldAssignments}>KLIKK FOR Å SE</button>
                        </div>
                    </div>
                </Card>
            }
            {!hasAssignment &&
                <div>
                    {is_in_season &&
                        <div>
                            <h1 className={classes.header}>VEDBJØRN LETER ETTER KJØREOPPDRAG FOR DEG</h1>
                            <BounceLoader
                            className={classes.spinwrap}
                            size={200}
                            color={"#732A20"}
                            />
                            <div className={classes.centralize}>
                            <h3 className={classes.header2}>HVA SKJER NÅR VEDBJØRN FINNER ET KJØREOPPDRAG?</h3>
                            <p className={classes.paragraph2}>
                            DA FÅR DU EN EPOST OM DET OG DU VIL OGSÅ SE EN STATUS-OPPDATERING OM DET PÅ DENNE SIDEN. DU
                            KAN SE
                            OVER KJØRERUTEN OG BESTEMME DEG FOR OM DU VIL AKSEPTERE OPPDRAGET ELLER IKKE.
                            </p>
                            </div>
                            {/*<MarketMiniStats/>*/}

                        </div>
                    }
                    {!is_in_season &&
                        <div>
                            <h1 className={classes.header}>VEDBJØRN ER UTENFOR SESONGEN</h1>
                            <div className={classes.centralize}>
                                <h3 className={classes.header2}>SÅ HVA SKJER NÅ DA?</h3>
                                <p className={classes.paragraph2}>
                                    NÅR SESONGEN STARTER IGJEN (NOVEMBER) DA VIL DU AUTOMATISK VÆRE REGISTRERT SOM
                                    SJÅFØR. DU TRENGER IKKE GJØRE NOE MER HER.
                                </p>
                            </div>
                        </div>
                    }

                    <div className={classes.buttons}>
                        <button className={classes.button_cancel} onClick={cancel}>AVBRYT</button>
                    </div>

                </div>
            }

            {hasAssignment &&
                <div className={classes.centralize}>
                    <h1 className={classes.header}>DU HAR FÅTT ET OPPDRAG !</h1>

                    <div className={classes.buttons}>
                        <button className={classes.button_ok} onClick={seeAssignment}>KLIKK FOR Å SE OPPDRAGET</button>
                    </div>

                    <p  className={classes.paragraph2}>TIDSFRIST FOR Å AKSEPTERE OPPDRAGET : {assignmentCountdown} SEKUNDER</p>
                </div>
            }

        </div>
    );
};

export default DriveStatus;
