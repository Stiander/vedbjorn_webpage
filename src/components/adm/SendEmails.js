import {useDispatch} from "react-redux";
import {useEffect, useRef, useState} from "react";
import classes from "./AdminPanel.module.css";
import React from "react";
import {validateEmail} from "../../pages/auth/NameForm";
import {infoActions} from "../../store/info-slice";
import {postAdmSendEmails} from "../../store/adm-http";
import {useNavigate} from "react-router-dom";
import Card from "../UI/Card";

const validateTitle = (title) => {
    return String(title).length >= 4 && String(title).length < 30;
};

const validateText = (text) => {
    return String(text).length >= 10 && String(text).length < 1000;
};

const SendEmails = () => {

    const [titleIsValid, setTitleIsValid] = useState(false);
    const [textIsValid, setTextIsValid] = useState(false);
    const [toBuyers , setToBuyers] = useState(false);
    const [toSellers , setToSellers] = useState(false);
    const [toDrivers , setToDrivers] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [sendButtonIsActive, setSendButtonIsActive] = useState(false);
    const [emails, setEmails] = useState([]);

    const titleRef = useRef('');
    const textRef = useRef();
    const emailInputRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const evaluateAllEmailInputs = () => {
        setTitleIsValid(validateTitle(titleRef.current.value));
        setTextIsValid(validateText(textRef.current.value));
        const atLeastOneCheck = toBuyers === true || toSellers === true || toDrivers === true;
        const hasEmails = emails.length > 0;
        const hasRecipients = atLeastOneCheck === true || hasEmails === true;
        setSendButtonIsActive(titleIsValid && textIsValid && hasRecipients);
    };

    const titleChanged = (event) => {
        evaluateAllEmailInputs();
    };

    const textChanged = (event) => {
        evaluateAllEmailInputs();
    };

    const toBuyersChanged = (event) => {
        setToBuyers(!toBuyers);
    };

    const toSellersChanged = (event) => {
        setToSellers(!toSellers);
    };

    const toDriversChanged = (event) => {
        setToDrivers(!toDrivers);
    };

    useEffect(() => {
        evaluateAllEmailInputs();
    }, [toDrivers, toSellers, toBuyers, emails, titleRef.current.value , titleRef]);

    const sendEmails = (event) => {
        dispatch(postAdmSendEmails({
            title: titleRef.current.value,
            text: textRef.current.value,
            toBuyers: toBuyers,
            toSellers: toSellers,
            toDrivers: toDrivers,
            emails: emails
        }));
        titleRef.current.value = '';
        textRef.current.value = '';
        setEmails([]);
        setToBuyers(false);
        setToSellers(false);
        setToDrivers(false);
        dispatch(infoActions.setPurpose(''));
        dispatch(infoActions.setInformation({
            title : 'MASSE-UTSENDELSE' ,
            message : 'Du har bestilt en masse-utsendelse av e-poster. Bestillingen er registrert i systemet, e-postene ' +
                'vil bli sendt snarest'
        }));
    };

    const emailChanged = (event) => {
        setEmailIsValid(validateEmail(emailInputRef.current.value));
    };

    const addEmail = (event) => {
        if(!emails.includes(emailInputRef.current.value)) {
            const updatedList = [...emails, emailInputRef.current.value];
            setEmails(updatedList);
        }
        emailInputRef.current.value = '';
        evaluateAllEmailInputs();
    };

    const removeEmail = (index) => {
        const updatedList = emails.filter((item, i) => i !== index);
        setEmails(updatedList);
        evaluateAllEmailInputs();
    };

    const backClicked = (event) => {
        navigate('/adm');
    };

    return (
        <Card>
            <h1 className={classes.header3}>SEND EPOSTER</h1>
            <button className={classes.button_ok_small} onClick={backClicked}>TILBAKE</button>
            <div>
                <p className={classes.paragraph}>TITTEL</p>
                <input
                    className={classes.input}
                    onChange={titleChanged}
                    type='text' id='title'
                    required ref={titleRef}
                    defaultValue={''}
                />
            </div>
            <br/>

            <p className={classes.paragraph}>TEKST</p>
            <textarea
                cols='50'
                rows='10'
                onChange={textChanged}
                required ref={textRef}
                defaultValue={''}
            />

            <br />
            <div className={classes.gridcontainer}>

                <div>
                    <p className={classes.paragraph}>TIL KJØPERE</p>
                    <input
                        className={classes.checkbox}
                        type='checkbox'
                        checked={toBuyers}
                        onChange={toBuyersChanged}
                    />
                </div>

                <div>
                    <p className={classes.paragraph}>TIL SELGERE</p>
                    <input
                        className={classes.checkbox}
                        type='checkbox'
                        checked={toSellers}
                        onChange={toSellersChanged}
                    />
                </div>

                <div>
                    <p className={classes.paragraph}>TIL SJÅFØRER</p>
                    <input
                        className={classes.checkbox}
                        type='checkbox'
                        checked={toDrivers}
                        onChange={toDriversChanged}
                    />
                </div>

            </div>


            <div>
                <div>
                    <label className={classes.label}>EPOST</label>
                    <input
                        className={classes.input}
                        onChange={emailChanged}
                        type='email' id='email'
                        required ref={emailInputRef}
                        defaultValue={''}
                    />
                    {emailIsValid && <button className={classes.button_ok_small} onClick={addEmail}>LEGG TIL</button>}
                </div>

                <ul>
                    {emails.map((item, index) => (
                        <li key={index} onClick={() => removeEmail(index)}>
                            {item}
                        </li>
                    ))}
                </ul>

            </div>

            <div className={classes.buttons}>
                { sendButtonIsActive && <button className={classes.button_ok} onClick={sendEmails}>SEND</button> }
            </div>

        </Card>
    );
};

export default SendEmails;
