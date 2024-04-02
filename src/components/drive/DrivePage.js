
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import MakeDriveRequest from "./MakeDriveRequest";
import DriveStatus from "./DriveStatus";
import OngoingDriveAssignment from "./OngoingDriveAssignment";
import {getDriveRequest, getOngoingRoute} from "../../store/drive-http";
import {load_company} from "../../store/brreg-http";
import {brregActions} from "../../store/brreg-slice";
import classes from "../sell/MakeSellRequest.module.css";
import {useNavigate} from "react-router-dom";
import Card from "../UI/Card";

const DrivePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMakeNewDriveRequest, setShowMakeNewDriveRequest] = useState(false);
    const [showStatusDriveRequest, setShowStatusDriveRequest] = useState(false);
    const [showOngoingRoute, setShowOngoingRoute] = useState(false);

    const has_company = useSelector((state) => state.brreg.ok_loaded);
    useEffect(() => {
        dispatch(load_company());
    } , [dispatch]);
    const businessClicked = () => {
        dispatch(brregActions.set_business_back_page('/drive'));
        navigate('/mybusiness');
    };

    const has_a_driverequest = useSelector((state) => state.drive.has_a_driverequest);
    useEffect(() => {
        if (has_a_driverequest === true) {
            setShowStatusDriveRequest(true);
            setShowMakeNewDriveRequest(false);
        } else {
            setShowStatusDriveRequest(false);
            setShowMakeNewDriveRequest(true);
        }
    } , [has_a_driverequest]);

    useEffect(() => {
        dispatch(load_company());
    } , [dispatch]);

    const ongoing_route = useSelector((state) => state.route.ongoingRoute);
    useEffect(() => {
        const has_wrapped = ongoing_route.hasOwnProperty('wrapup') && ongoing_route['wrapup']
        if (ongoing_route && ongoing_route !== {} && 'route' in ongoing_route && !has_wrapped) {
            setShowOngoingRoute(true);
        } else {
            setShowOngoingRoute(false);
        }
    } , [ongoing_route]);

    const driverName = useSelector((state) => state.drive.name);
    useEffect(() => {
        if (driverName !== '' && driverName !== null) {
            dispatch(getOngoingRoute(driverName));
        }
    } , [dispatch , driverName]);

    const email = useSelector((state) => state.user.name.email);
    useEffect(() => {
        const has_email = email !== '' && email !== undefined;
        if (has_email) {
            dispatch(getDriveRequest(email));
        }
    } , [email, dispatch]);

    const backFromCongoing = () => {
        setShowOngoingRoute(false);
        setShowMakeNewDriveRequest(false);
        setShowStatusDriveRequest(true);
    } ;

    return (
        <div>
            {!has_company &&
                <p className={classes.paragraph}>
                    DU MÅ OPPGI NOEN OPPLYSNINGER OM VIRKSOMHETEN DIN FØR DU KAN BEGYNNE Å TA OPPDRAG SOM SJÅFØR.
                    DET GJØR DU VED Å TRYKKE PÅ KNAPPEN NEDENFOR
                </p>
            }
            <Card>
                <p className={classes.paragraph}>
                    TRYKK PÅ KNAPPEN NEDENFOR FOR Å FÅ OPP FAKTURERINGS-INFO OG INFORMASJON OM VIRKSOMHETEN DIN
                </p>
                <div className={classes.ctrl_buttons}>
                    <button className={classes.button_ok} onClick={businessClicked}>VIRKSOMHETEN MIN</button>
                </div>
            </Card>
            {has_company &&
                <div>
                    {showOngoingRoute && <OngoingDriveAssignment backFromCongoing={backFromCongoing}/>}
                    {(!showOngoingRoute && showMakeNewDriveRequest) && <MakeDriveRequest/>}
                    {(!showOngoingRoute && showStatusDriveRequest) && <DriveStatus/>}
                </div>
            }
        </div>
    );
};

export default DrivePage;
