

import {useEffect, useRef, useState} from "react";
import classes from "./NameForm.module.css";
import {newUserActions} from "../../store/new-user-slice";
import {useDispatch, useSelector} from "react-redux";
import {checkIfUserIsTaken} from "../../store/users-http";
import {errorActions} from "../../store/error-slice";

export const validateEmail = (email) => {
    const mStr = String(email);
    if (mStr.length < 4) {
        return false;
    }
    return mStr.toLowerCase()
        .match(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        ) != null;
};

export const validate_phoneNumber_NOR = (phoneNumber) => {
    const mStr = String(phoneNumber);
    if (mStr.length !== 8) {
        return false;
    }
    let integerValue = parseInt(mStr, 10);
    return (integerValue >= 40000000 && integerValue <= 99999999);
};

const validateName = (name) => {
    const mStr = String(name);
    if (mStr.length < 3) {
        return false;
    }
    return mStr.toLowerCase()
        .match(
            //^[a-z ,.'-]+$/i/
        ) != null;
};

const NameForm = (props) => {

    const dispatch = useDispatch();

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
    const [nameIsValid, setNameIsValid] = useState(false);
    const [lastNameIsValid, setLastNameIsValid] = useState(false);
    const [okButtonActive, setOkButtonActive] = useState(false);



    const email = useSelector((state) => state.newUser.name.email);
    const emailInputRef = useRef(email);

    const phoneNumber = useSelector((state) => state.newUser.name.phone);
    const phoneNumberInputRef = useRef(phoneNumber);

    const surname = useSelector((state) => state.newUser.name.firstname);
    const surnameInputRef = useRef(surname);

    const lastname = useSelector((state) => state.newUser.name.lastname);
    const lastnameInputRef = useRef(lastname);

    const hasChecked = useSelector((state) => state.newUser.checkState.hasChecked);
    const emailIsAvailable = useSelector((state) => state.newUser.checkState.emailIsAvailable);

    useEffect(() => {
        if (hasChecked && !emailIsAvailable) {
            dispatch(errorActions.setError({
                errorTitle: 'Du kan dessverre ikke bruke denne eposten' ,
                errorMessage: 'Den er allerede tatt i bruk.'
            }));
            emailInputRef.current.value = ''
        } else if (hasChecked && emailIsAvailable) {
            dispatch(newUserActions.setName_email(emailInputRef.current.value));
            dispatch(newUserActions.setName_firstname(surnameInputRef.current.value));
            dispatch(newUserActions.setName_lastname(lastnameInputRef.current.value));
            dispatch(newUserActions.setName_phone(phoneNumberInputRef.current.value));
            props.nameProceedClicked();
            dispatch(newUserActions.set_checkState({
                'hasChecked' : false ,
                'emailIsAvailable' : emailIsAvailable
            }));
        }
    } , [hasChecked , emailIsAvailable , dispatch , props]);

    useEffect( () => {
        setEmailIsValid(validateEmail(emailInputRef.current.value));
        setNameIsValid(validateName(surnameInputRef.current.value));
        setLastNameIsValid(validateName(lastnameInputRef.current.value));
        setPhoneNumberIsValid(validate_phoneNumber_NOR(phoneNumberInputRef.current.value))
        setOkButtonActive(emailIsValid && nameIsValid && lastNameIsValid);
    } , [phoneNumberIsValid, emailIsValid , nameIsValid , lastNameIsValid , phoneNumberIsValid]);

    const emailChanged = (event) => {
        setEmailIsValid(validateEmail(emailInputRef.current.value));
        setOkButtonActive(phoneNumberIsValid && emailIsValid && nameIsValid && lastNameIsValid);
    };

    const phoneNUmberChanged = (event) => {
        setPhoneNumberIsValid(validate_phoneNumber_NOR(phoneNumberInputRef.current.value));
        setOkButtonActive(phoneNumberIsValid && emailIsValid && nameIsValid && lastNameIsValid);
    };

    const nameChanged = (event) => {
        setNameIsValid(validateName(surnameInputRef.current.value));
        setOkButtonActive(phoneNumberIsValid && emailIsValid && nameIsValid && lastNameIsValid);
    };

    const lastnameChanged = (event) => {
        setLastNameIsValid(validateName(lastnameInputRef.current.value));
        setOkButtonActive(phoneNumberIsValid && emailIsValid && nameIsValid && lastNameIsValid);
    };

    const proceed = (event) => {
        dispatch(checkIfUserIsTaken(emailInputRef.current.value));
    };

    return(
        <div>
            <div className={classes.cards}>

                <label className={classes.label} htmlFor='email'>E-POST ADDRESSE</label>
                <input
                    className={classes.input}
                    onChange={emailChanged}
                    type='email' id='email'
                    required ref={emailInputRef}
                    defaultValue={email}
                />

                <label className={classes.label} htmlFor='phonenumber'>TELEFON NUMMER</label>
                <input
                    className={classes.input}
                    onChange={phoneNUmberChanged}
                    type='number' id='number'
                    required ref={phoneNumberInputRef}
                    defaultValue={phoneNumber}
                />

                <label className={classes.label} htmlFor='surname'>FORNAVN</label>
                <input
                    className={classes.input}
                    onChange={nameChanged}
                    type='surname' id='surname'
                    required ref={surnameInputRef}
                    defaultValue={surname}
                />

                <label className={classes.label} htmlFor='lastname'>ETTERNAVN</label>
                <input
                    className={classes.input}
                    onChange={lastnameChanged}
                    type='lastname' id='lastname'
                    required ref={lastnameInputRef}
                    defaultValue={lastname}
                />

            </div>

            <div className={classes.buttons}>
                { okButtonActive && <button className={classes.button_ok} onClick={proceed}>OK - FORTSETT</button> }
            </div>
        </div>
    );
};

export default NameForm;
