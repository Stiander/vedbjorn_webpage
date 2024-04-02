
import {do_print} from "../../routes";

import classes from './DriveAssignment.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {connectSocketIo} from "../streaming/socket";
import {driveActions} from "../../store/drive-slice";
import {useNavigate} from "react-router-dom";
import {getDrivePlannedRoute, putAcceptPlannedRoute} from "../../store/drive-http";
import RouteMap from "./RouteMap";
import RouteTable from "./RouteTable";
import sign from "jwt-encode";
import store from "../../store";

const DriveAssignment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [assignmentCountdown, setAssignmentCountdown] = useState(0);
    const driverName = useSelector((state) => state.drive.name);

    const [currentIndex, setCurrentIndex] = useState(1);

    const currentIndexFromMap = (index) => {
        setCurrentIndex(index);
    };
    const currentIndexFromTable = (index) => {
        setCurrentIndex(index);
    };

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
            console.log('SOCKET.IO -> DriveAssignment :: getnewassignments');
        }
        socket.emit('getnewassignments');
        socket.on('getnewassignments', (countdown) => {
            if (countdown > 0) {
                setAssignmentCountdown(Math.round(countdown));
                dispatch(driveActions.setHasDriveAssignment(true));
            } else {
                dispatch(driveActions.setHasDriveAssignment(false));
                navigate('/drive');
            }
        });

        if (do_print) {
            console.log('SOCKET.IO -> DriveAssignment :: getmustrefresh');
        }
        socket.emit('getmustrefresh');
        socket.on('getmustrefresh', (must_refresh) => {
            if (must_refresh === true) {
                console.log('MUST REFRESH ROUTE');
                dispatch(getDrivePlannedRoute(driverName));
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
    }, [driverName, dispatch, navigate]);

    const acceptClicked = (event) => {
        dispatch(putAcceptPlannedRoute(driverName, true));
        navigate('/drive');
    };

    const declineClicked = (event) => {
        dispatch(putAcceptPlannedRoute(driverName, false));
        navigate('/drive');
    };

    return (
        <div>
            <h1 className={classes.header}>TILGJENGELIG KJØREOPPDRAG!</h1>
            <div className={classes.centralize}>
                <p className={classes.paragraph2}>
                    SE OVER DETALJENE FOR KJØREOPPDRAGET HER OG VELG OM DU VIL AKSEPTERE ELLER AVSLÅ NEDERST PÅ SIDEN
                </p>
                <p  className={classes.paragraph2}>TIDSFRIST FOR Å AKSEPTERE OPPDRAGET : {assignmentCountdown} SEKUNDER</p>

                <RouteMap currentIndexFromMap={currentIndexFromMap} currentIndex={currentIndex} />
                <RouteTable currentIndexFromTable={currentIndexFromTable} currentIndex={currentIndex} />
            </div>

            <div className={classes.centralize}>
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={acceptClicked}>JEG AKSEPTERER OPPDRAGET</button>
                    <button className={classes.button_cancel} onClick={declineClicked}>JEG AVSLÅR OPPDRAGET</button>
                </div>
            </div>

        </div>
    );
};

export default DriveAssignment;
