import Card from "../../components/UI/Card";

import classes from './UserProfile.module.css';
import {useDispatch, useSelector} from "react-redux";
import SimpleMap from "../../components/UI/MyPosition";
import {infoActions} from "../../store/info-slice";
import {useEffect} from "react";
import {deleteUser} from "../../store/users-http";
import {useNavigate} from "react-router-dom";
import {userActions} from "../../store/user-slice";
import {newUserActions} from "../../store/new-user-slice";
import store from "../../store";
import {brregActions} from "../../store/brreg-slice";
import {buyActions} from "../../store/buy-slice";
import {deliveryActions} from "../../store/delivery-slice";
import {driveActions} from "../../store/drive-slice";
import {errorActions} from "../../store/error-slice";
import {messagesActions} from "../../store/messages-slice";
import {routeActions} from "../../store/route-slice";
import {sellActions} from "../../store/sell-slice";
import {vippsActions} from "../../store/vipps-slice";
import {visitActions} from "../../store/visit-slice";

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector((state) => state.user.name);
    const location = useSelector((state) => state.user.location);
    const deleteConfirmed = useSelector((state) => state.info.confirmed);
    const deleteCompleted = useSelector((state) => state.user.deleted);

    const logOut = (event) => {
        dispatch(brregActions.clear());
        dispatch(buyActions.clear());
        dispatch(deliveryActions.clear());
        dispatch(driveActions.clear());
        dispatch(errorActions.clearError());
        dispatch(infoActions.clearInformation());
        dispatch(messagesActions.clear());
        dispatch(newUserActions.set_cancel());
        dispatch(routeActions.clear());
        dispatch(sellActions.clear());
        dispatch(userActions.clear());
        dispatch(vippsActions.clear());
        dispatch(visitActions.clear());
        navigate('/');
    };

    const deleteMe = (event) => {
        dispatch(infoActions.setPurpose('DELETE USER'));
        dispatch(infoActions.setInformation({
            title : 'SLETT BRUKER' ,
            message: 'Alle dine data vil bli slettet. Er du sikker? \n(Trykk på utsiden for å avbryte.)'
        }));
    }

    useEffect(() => {
        if (deleteConfirmed === true && name.email !== '') {
            if (store.getState().info.purpose === 'DELETE USER') {
                dispatch(deleteUser(name.email));
            } else if (store.getState().info.purpose === 'LOGGED IN') {

            } else {
                dispatch(infoActions.setPurpose(''));
                dispatch(infoActions.setConfirmed(false));
            }
        }
    } , [deleteConfirmed , dispatch, name.email]);

    useEffect(() => {
        if (deleteCompleted === true) {
            dispatch(userActions.deleted(false));
            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            logOut();
        }
    } , [deleteCompleted , navigate , dispatch, logOut]);

    return (
        <Card>
            <h1 className={classes.header}>DIN BRUKERPROFIL</h1>
            <
                p className={classes.paragraph}>
                NAVN : {String(name.firstname).toUpperCase()} {String(name.lastname).toUpperCase()} , E-POST : {String(name.email).toUpperCase()}
            </p>
            <p className={classes.paragraph}>
                ADRESSE : {String(location.display_name).toUpperCase()}
            </p>

            <div className={classes.mapwrap}>
                <SimpleMap
                    lat={location.lat}
                    lng={location.lng}
                />
            </div>

            <div className={classes.ctrl_buttons}>
                <button className={classes.button_del} onClick={logOut}>LOGG UT</button>
                {/*<button className={classes.button_del} onClick={deleteMe}>SLETT MEG</button>*/}
            </div>

        </Card>
    );
};

export default UserProfile;
