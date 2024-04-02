
import classes from './FinalConfirm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {createNewUser} from "../../store/users-http";
import {useRef, useState} from "react";
import {newUserActions} from "../../store/new-user-slice";
import {infoActions} from "../../store/info-slice";
import {useNavigate} from "react-router-dom";
import store from "../../store";

const validatePassword = (pw) => {
    const mStr = String(pw);
    if (mStr.length < 7) {
        return false;
    }
    return true;
};

const FinalConfirm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newUser = useSelector((state) => state.newUser);
    const passwordInputRef_1 = useRef();
    const passwordInputRef_2 = useRef();

    const [pw1IsValid, setPw1IsValid] = useState(false);
    const [pw2IsValid, setPw2IsValid] = useState(false);
    const [pwsAreEqual, setPwsAreEqual] = useState(false);

    const confirmed = (event) => {

        let lat = newUser.location.lat;
        let lng = newUser.location.lng;
        let tmp_lat = newUser.tempLocation.lat;
        let tmp_lng = newUser.tempLocation.lng;
        if (lat === 0 || lng === 0 || (tmp_lat !== 0 && tmp_lng !== 0)) {
            lat = tmp_lat;
            lng = tmp_lng;
        }

        if (lat === 0 || lng === 0 ) {
            dispatch(infoActions.setInformation({
                title : 'En liten utfordring' ,
                message: 'Adressen er ugyldig. Prøv å gå tilbake for å sette den på nytt.'
            }));
            return;
        }
        dispatch(newUserActions.setName_password(passwordInputRef_1.current.value));
        dispatch(createNewUser());
        dispatch(infoActions.setInformation({
            title : 'Ny bruker opprettet' ,
            message: 'Nå kan du logge inn med din epost og ditt passord.'
        }));
        navigate('/auth/login');
    };

    const pw_changed = (event) => {
        setPw1IsValid(validatePassword(passwordInputRef_1.current.value));
        setPw2IsValid(validatePassword(passwordInputRef_2.current.value));
        setPwsAreEqual(passwordInputRef_1.current.value === passwordInputRef_2.current.value);
    };

    return (
        <div>
            <h1 className={classes.header}>INFO</h1>

            <p className={classes.paragraph}>
                NAVN : {String(newUser.name.firstname).toUpperCase()} {String(newUser.name.lastname).toUpperCase()}
            </p>
            <p className={classes.paragraph}>
                E-POST : {String(newUser.name.email).toUpperCase()}
            </p>
            <p className={classes.paragraph}>
                TLF : {String(newUser.name.phone).toUpperCase()}
            </p>
            <p className={classes.paragraph}>
                ADRESSE : {String(newUser.location.road).toUpperCase()} , {String(newUser.location.zip).toUpperCase()} {String(newUser.location.municipality).toUpperCase()}
            </p>

            <p>
                <input
                    className={classes.input}
                    placeholder={"Passord"}
                    onChange={pw_changed}
                    type='password' id='password'
                    required ref={passwordInputRef_1}
                />
            </p>
            <p>
                <input
                    className={classes.input}
                    placeholder={"Gjenta Passord"}
                    onChange={pw_changed}
                    type='password' id='password'
                    required ref={passwordInputRef_2}
                />
            </p>

            { (pw1IsValid && pw2IsValid && pwsAreEqual) &&
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={confirmed}>OPPRETT</button>
                </div>
            }
        </div>
    );
};

export default FinalConfirm;
