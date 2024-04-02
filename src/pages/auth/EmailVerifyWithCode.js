
import classes from './EmailVerifyWithCode.module.css';
import ReactInputVerificationCode from "react-input-verification-code";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {verifyUser, verifyUserStart} from "../../store/users-http";
import store from "../../store";
import {errorActions} from "../../store/error-slice";

const EmailVerifyWithCode = (props) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const verified_state = useSelector((state) => state.vipps.email_verification_state);

    const sendNewCode = () => {
        setValue("");
        dispatch(verifyUserStart(store.getState().newUser.name.email));
    };

    const verifyCode = () => {
        dispatch(verifyUser(store.getState().newUser.name.email, value));
        setValue("");
    };

    useEffect(() => {
        dispatch(verifyUserStart(store.getState().newUser.name.email));
    } , []);

    useEffect(() => {
        if (verified_state === 'Expired') {
            dispatch(errorActions.setError({
                errorTitle: 'Koden er utdatert',
                errorMessage: 'Koden blir utdatert etter 1 time. Vennligs lag en ny kode ved å trykke på knappen nedenfor.'
            }));
            setValue("");
        } else if (verified_state === 'Mismatch') {
            dispatch(errorActions.setError({
                errorTitle: 'Feil kode',
                errorMessage: 'Prøv igjen'
            }));
            setValue("");
        } else if (verified_state === 'Already verified') {
            props.emailVerified();
        } else if (verified_state === 'Match') {
            props.emailVerified();
        }
    } , [verified_state, props, dispatch]);

    return (
      <div>
          <div className={classes.centralize}>
              <h2 className={classes.header2}>VERIFISERE EPOST</h2>
              <p  className={classes.paragraph}>VI HAR SENDT DEG EN KODE TIL DIN EPOST. VENNLIGST SKRIV DEN KODEN INN HER.</p>
              <div className={classes.centeredcontainer}>
                  <div className={classes.centeredcontent}>
                    <ReactInputVerificationCode onChange={setValue} value={value} />
                  </div>
              </div>
          </div>
          <div className={classes.buttons}>
              <button className={classes.button_tool} onClick={verifyCode}>BEKREFT</button>
              <button className={classes.button_tool} onClick={sendNewCode}>SEND NY KODE</button>
          </div>
      </div>
    );
};

export default EmailVerifyWithCode;
