
import classes from './LoginForm.module.css';
import Card from "../../components/UI/Card";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAndLoadUser} from "../../store/users-http";
import {useEffect , useState} from "react";
import {validateEmail} from "./NameForm";
import store from "../../store";

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const [emailIsValid, setEmailIsValid] = useState(false);
    const existing_email = useSelector((state) => state.user.name.email);

    useEffect(() => {
        if (existing_email !== '') {
            navigate('/me');
        }
    } , [existing_email , navigate]);

    const loginOK = (event) => {
        dispatch(loginAndLoadUser(emailInputRef.current.value, passwordInputRef.current.value));
    };

    const cancel = (event) => {
        navigate('/');
    };

    const emailChanged = (event) => {
        setEmailIsValid(validateEmail(emailInputRef.current.value));
    };

    return (
         <Card>
             <h1 className={classes.header}>LOGG INN</h1>

             <div className={classes.cards}>

                 <label className={classes.label} htmlFor='email'>E-POST ADRESSE</label>
                 <input
                     className={classes.input}
                     type='email' id='email'
                     required ref={emailInputRef}
                     onChange={emailChanged}
                 />

                 <label className={classes.label} htmlFor='password'>PASSORD</label>
                 <input
                     className={classes.input}
                     type='password' id='password'
                     required ref={passwordInputRef}
                 />

                 <div className={classes.tool_line_login}>
                     <button className={classes.tool_button_login_ok} onClick={loginOK} disabled={!emailIsValid}>OK</button>
                     <button className={classes.tool_button_login_cancel} onClick={cancel}>AVBRYT</button>
                 </div>

             </div>
         </Card>
    );
};

export default LoginForm;
