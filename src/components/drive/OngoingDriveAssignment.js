import {do_print} from "../../routes";

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import classes from './OngoingDriveAssignment.module.css';
import OngoingRouteMap from "./OngoingRouteMap";
import {useState} from "react";
import {getDrivePlannedRoute} from "../../store/drive-http";
import {connectSocketIo} from "../streaming/socket";
import OngoingRouteTable from "./OngoingRouteTable";
import Visit from "../visit/Visit";
import Card from "../UI/Card";
import sign from "jwt-encode";
import store from "../../store";
import {isObjEmpty} from "../../miscFuncs";

const OngoingDriveAssignment = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [due               , setDue               ] = useState(0);
    const [isVisiting        , setIsVisiting        ] = useState(false);
    const [isFinished        , setIsFinished        ] = useState(false);
    const [notifications     , setNotifications     ] = useState([]);
    const [headerText        , setHeaderText        ] = useState('PÅGÅENDE OPPDRAG');
    const [isCancelled       , setIsCancelled       ] = useState(false);
    const [currentIndex      , setCurrentIndex      ] = useState(1);
    const [remainingTimeText , setRemainingTimeText ] = useState("");

    const driverName    = useSelector((state) => state.drive.name);
    const email         = useSelector((state) => state.user.name.email);
    const routeStatus   = useSelector((state) => state.route.status);
    const all_delivered = useSelector((state) => state.route.all_delivered);
    const ongoing_route = useSelector((state) => state.route.ongoingRoute);

    const currentIndexFromMap = (index) => {
        setCurrentIndex(index);
    };
    const currentIndexFromTable = (index) => {
        setCurrentIndex(index);
    };

    const visitClicked = () => {
        setIsVisiting(true);
    }

    const backFromVisit = () => {
        setIsVisiting(false);
    };

    useEffect(() => {
        setIsFinished(routeStatus === 'finished');
    } , [routeStatus])

    useEffect(() => {
        if (isObjEmpty(ongoing_route)) {
            navigate('/');
        }
        if ('status' in ongoing_route && ongoing_route['status'] === 'failed') {
            setHeaderText("AVBRUDT OPPDRAG");
            setIsCancelled(true);
        } else {
            setHeaderText("PÅGÅENDE OPPDRAG");
            setIsCancelled(false);
        }
    } , [ongoing_route, navigate]);

    let messageBox = (<div></div>);
    useEffect(() => {
        if (notifications.length > 0) {
            messageBox = (
              <Card>
                  <h1 className={classes.header2}>DU HAR {notifications.length} BESKJEDER</h1>
                  <ul>
                  {notifications.map( (notification, index) => (
                      <li
                        key={index}
                      >
                          <p>{index + 1}</p>
                      </li>
                  ))}
                  </ul>
              </Card>
            );
        }
    },[notifications]);

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
            driverName : driverName ,
            email : email
        });

        if (do_print) {
            console.log('SOCKET.IO -> OngoingDriveAssignment :: getongoingassignments');
        }

        socket.emit('getongoingassignments');
        socket.on('getongoingassignments', (countdown) => {
            if (countdown > 0) {
                setDue(Math.round(countdown));
            }
        });

        if (do_print) {
            console.log('SOCKET.IO -> OngoingDriveAssignment :: getdrivernotification');
        }

        socket.emit('getdrivernotification');
        socket.on('getdrivernotification' , (notifications) => {
            if (notifications.length > 0) {
                console.log('NOTIFICATIONS : ' , notifications);
                dispatch(getDrivePlannedRoute(driverName));
                setNotifications(notifications);
            }
        })

        if (all_delivered === true) {

            if (do_print) {
                console.log('SOCKET.IO -> OngoingDriveAssignment :: ongoing_isfinished');
            }

            if (!ongoing_route) {
                if (do_print) {
                    console.log('!ongoing_route, so will not look for finished ids');
                }
            }
            socket.emit('ongoing_isfinished');
            socket.on('ongoing_isfinished' , (ids) => {
                if (ids.length > 0) {
                    const or_id = String(ongoing_route['id']);
                    const found_index = ids.indexOf(or_id);
                    if (found_index >= 0) {
                        setIsFinished(true);
                    }
                }
            })
        }

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
    }, [driverName, dispatch, navigate, email, all_delivered, ongoing_route]);

    useEffect(() => {
        if (due <= 7200 && due > 1800) {
            const timeStr = new Date(due * 1000).toISOString().substring(11, 16);
            setRemainingTimeText("TID IGJEN : " + timeStr + ". DU BEGYNNER Å FÅ LITT DÅRLIG TID");
        } else if (due <= 1800) {
            const timeStr = new Date(due * 1000).toISOString().substring(14, 19)
            setRemainingTimeText("TID IGJEN : " + timeStr + ". NÅ HAR DU DÅRLIG TID.");
        } else {
            const timeStr = new Date(due * 1000).toISOString().substring(11, 16);
            setRemainingTimeText("TID IGJEN : " + timeStr);
        }
    } , [due]);


    return (
        <div>
            {messageBox}
        { !isFinished &&
            <div>
                <h1 className={classes.header}>{headerText}</h1>
                <div className={classes.centralize}>
                    {!isCancelled && !all_delivered &&
                        <p className={classes.paragraph2}>{remainingTimeText}</p>
                    }
                    {isCancelled && !all_delivered &&
                        <div>
                            <p className={classes.paragraph2}>VENNLIGST LEVER VEDEN DU HAR HENTET TILBAKE TIL DER DU HENTET DET FRA</p>
                            <p className={classes.paragraph2}>SE INNBOKSEN FOR MER INFORMASJON</p>
                        </div>
                    }
                    {all_delivered &&
                        <div>
                            <p className={classes.paragraph2}>DU ER FERDIG! GODT JOBBET!</p>
                            <p className={classes.paragraph2}>NÅ VENTER VI BARE PÅ AT ALLE KUNDENE SKAL BETALE</p>
                        </div>
                    }
                    {isVisiting &&
                        <Visit
                            backFromVisit={backFromVisit}
                            currentIndex={currentIndex}
                        />
                    }
                    {!isVisiting &&
                        <div>
                            <OngoingRouteMap currentIndexFromMap={currentIndexFromMap} currentIndex={currentIndex}/>
                            <OngoingRouteTable
                                currentIndexFromTable={currentIndexFromTable}
                                currentIndex={currentIndex}
                                visitClicked={visitClicked}
                            />
                        </div>
                    }
                </div>
            </div>
        }
        {isFinished &&
            <div>
                <h1 className={classes.header}>DETTE OPPDRAGET ER FERDIG UTFØRT</h1>
                <div className={classes.centralize}>
                    <p className={classes.paragraph2}>
                        DU KAN GÅ TILBAKE TIL OPPDRAGS OVERSIKTEN FOR Å SE ET SAMMENDRAG
                    </p>
                </div>
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={props.backFromCongoing}>TIL OPPDRAGSOVERSIKTEN</button>
                </div>
            </div>
        }
        </div>

    );
};

export default OngoingDriveAssignment;
