import classes from "./LocationForm.module.css";
import {useEffect, useState} from "react";
import SimpleMap from "../../components/UI/MyPosition";
import {useDispatch, useSelector} from "react-redux";
import {errorActions} from "../../store/error-slice";
import {newUserActions} from "../../store/new-user-slice";
import {addrFromCoords} from "../../store/users-http";

const LocationForm = (props) => {

    const _lat = useSelector((state) => state.newUser.location.lat);
    const _lng = useSelector((state) => state.newUser.location.lng);
    const dispatch = useDispatch();
    const [okButtonActive , setOkButtonActive] = useState(false);

    useEffect( () => {
        if(_lat > 0 && _lng > 0) {
            setOkButtonActive(true);
        } else {
            setOkButtonActive(false);
        }
    } , [_lat , _lng])

    const getLocationFromBrowser = (event) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(newUserActions.setName_pos({
                    lat : position.coords.latitude ,
                    lng : position.coords.longitude
                }));
                //setPos(position.coords.latitude, position.coords.longitude);
            });
        } else {
            dispatch(errorActions.setError({
                title : 'Kunne ikke hente posisjon' ,
                message : 'Vedbjørn har ikke tillatelse til å hente posisjon fra browseren din. Trykk på kartet isteden.'
            }));
        }
    };

    const proceed = (event) => {
        props.locationProceedClicked();
        dispatch(addrFromCoords(_lat , _lng));
    };

    const goBackFromLocation = (event) => {
        props.goBackFromLocation();
    };

    return (
        <div>

            <h1 className={classes.header}>VI TRENGER Å VITE HVOR DU ER</h1>
            <div className={classes.tool_line_getpos}>
                <button className={classes.tool_button_getpos} onClick={getLocationFromBrowser}>HENT POSISJON</button>
                <h1 className={classes.header}>..ELLER..</h1>
                <button className={classes.tool_button_getpos} onClick={proceed}>SKRIV INN SELV</button>
            </div>

            <div className={classes.mapwrap}>
                <SimpleMap
                    lat={_lat}
                    lng={_lng}
                />
            </div>

            <div className={classes.buttons}>
                <button className={classes.back_button} onClick={goBackFromLocation}>TILBAKE</button>
                { okButtonActive && <button className={classes.button_ok} onClick={proceed}>OK - FORTSETT</button> }
            </div>
        </div>
    );
};

export default LocationForm;
