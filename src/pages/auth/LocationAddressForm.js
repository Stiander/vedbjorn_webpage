import classes from "./LocationAddressForm.module.css"
import {useEffect, useRef, useState} from "react";
import {newUserActions} from "../../store/new-user-slice";
import {useDispatch, useSelector} from "react-redux";
import {errorActions} from "../../store/error-slice";
import {addrFromCoords} from "../../store/users-http";
import {infoActions} from "../../store/info-slice";

const validateStreet = (name) => {
    const mStr = String(name);
    if (mStr.length < 3) {
        return false;
    }
    return mStr.toLowerCase()
        .match(
            //^[a-z ,.'-]+$/i/
        ) != null;
};

const validateMunicipality = (muni) => {
    const mStr = String(muni);
    if (mStr.length < 3) {
        return false;
    }
    return mStr.toLowerCase()
        .match(
            //^[a-z ,.'-]+$/i/
        ) != null;
};

const LocationAddressForm = (props) => {

    const dispatch = useDispatch();

    const [streetIsValid, setStreetIsValid] = useState(false);
    const [muniIsValid, setMuniIsValid] = useState(false);

    const location_road = useSelector((state) => state.newUser.tempLocation.road);
    const location_zip = useSelector((state) => state.newUser.tempLocation.zip);
    const location_muni = useSelector((state) => state.newUser.tempLocation.municipality);

    const streetRef = useRef(location_road);
    const muniRef = useRef(location_muni);

    const [zipRef, setZipRef] = useState(location_zip);

    const [okButtonActive , setOkButtonActive] = useState(false);

    useEffect(() => {
        setStreetIsValid(validateStreet(streetRef.current.value));
        setMuniIsValid(validateMunicipality(muniRef.current.value));
        //setZipRef(location_zip);
        setOkButtonActive(streetIsValid && muniIsValid);
    } , [streetIsValid , muniIsValid, location_road, location_zip, location_muni])


    const streetChanged = (event) => {
        setStreetIsValid(validateStreet(streetRef.current.value));
        setOkButtonActive(streetIsValid && muniIsValid);
    };

    const zipChanged = (event) => {
        setZipRef(event.target.value);
    };

    const muniChanged = (event) => {
        setMuniIsValid(validateMunicipality(muniRef.current.value));
        setOkButtonActive(streetIsValid && muniIsValid);
    };

    const goBackFromAddress = (event) => {
        props.goBackFromAddress();
    };

    const proceed = (event) => {

        let strref = streetRef.current.value;
        if(!strref) {
            strref = streetRef;
        }
        if(!strref) {
            dispatch(infoActions.setInformation({
                title : 'OK' ,
                message: 'Ugyldig Gate'
            }));
            return;
        }
        let zip = zipRef;
        if(!strref) {
            zip(infoActions.setInformation({
                title : 'OK' ,
                message: 'Ugyldig postnummer'
            }));
            return;
        }
        let muni = muniRef.current.value;
        if(!muni) {
            muni = muniRef;
        }
        if(!muni) {
            zip(infoActions.setInformation({
                title : 'OK' ,
                message: 'Kommune'
            }));
            return;
        }

        console.log('strref = ', strref);
        console.log('zip = ', zip);
        console.log('muni = ', muni);

        dispatch(newUserActions.setName_road(strref));
        dispatch(newUserActions.setName_zip(zip));
        dispatch(newUserActions.setName_municipality(muni));
        dispatch(newUserActions.set_evaluating(true));
        props.receiveAddress();
    };

    const getLocationFromBrowser = (event) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                dispatch(newUserActions.setName_pos({
                    lat : position.coords.latitude ,
                    lng : position.coords.longitude
                }));
                dispatch(addrFromCoords(position.coords.latitude , position.coords.longitude));
                //setPos(position.coords.latitude, position.coords.longitude);
            });
        } else {
            dispatch(errorActions.setError({
                title : 'Kunne ikke hente posisjon' ,
                message : 'Vedbjørn har ikke tillatelse til å hente posisjon fra browseren din. Trykk på kartet isteden.'
            }));
        }
    };

    return (
        <div>
            <h1 className={classes.header}>ADDRESSEN DIN</h1>

            <button className={classes.tool_button_getpos} onClick={getLocationFromBrowser}>HENT POSISJON</button>


            <div className={classes.cards}>
                <label className={classes.label} htmlFor='street'>GATE</label>
                <input
                    className={classes.input}
                    onChange={streetChanged}
                    type='street' id='street'
                    required ref={streetRef}
                    defaultValue={location_road}
                />

                <label className={classes.label} htmlFor='zip'>POSTNUMMER</label>
                <input
                    className={classes.input}
                    onChange={zipChanged}
                    type='number'
                    placeholder={"1"}
                    value={zipRef}
                    min={1}
                    max={9999}
                />

                <label className={classes.label} htmlFor='municipality'>KOMMUNE</label>
                <input
                    className={classes.input}
                    onChange={muniChanged}
                    type='text' id='municipality'
                    required ref={muniRef}
                    defaultValue={location_muni}
                />

            </div>

            <div className={classes.buttons}>
                <button className={classes.back_button} onClick={goBackFromAddress}>TILBAKE</button>
                { okButtonActive && <button className={classes.button_ok} onClick={proceed}>OK - FORTSETT</button> }
            </div>
        </div>
    );
};

export default LocationAddressForm;
