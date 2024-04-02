
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useState} from "react";
import UserProfile from "./UserProfile";
//import VippsLogin from "../vipps/VippsLogin";
import store from "../../store";
import {do_print} from "../../routes";
import {infoActions} from "../../store/info-slice";
import {useNavigate} from "react-router-dom";
import classes from './AuthPage.module.css';

const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login_confirmed   = useSelector((state) => state.info.confirmed);

    // const navigate = useNavigate();
    const [showExistingProfile , setShowExistingProfile] = useState();

    const existing_email = useSelector((state) => state.user.name.email);
    useEffect(() => {
        if (existing_email !== '') {
            setShowExistingProfile(true);
        } else {
            setShowExistingProfile(false);
        }
    } , [existing_email]);

    const newUserClicked = () => {
        navigate('/auth/newuser');
    };

    const logInWithExistingClicked = () => {
        navigate('/auth/login');
    };

    useEffect(() => {
        const purpose = store.getState().info.purpose;
        console.log('INFO STATE : ' , purpose);
        if(purpose === 'LOGGED IN') {
            if (do_print) {
                console.log('EXISTING USER WAS FOUND; FORWARDING TO FRONT PAGE');
            }

            dispatch(infoActions.setPurpose(''));
            dispatch(infoActions.setConfirmed(false));
            navigate('/');
        }
    } , [login_confirmed, dispatch, navigate]);

    return(
      <div>

          {!showExistingProfile &&
              //<VippsLogin />
              <div className={classes.buttons}>
                  <button className={classes.button_auth} onClick={newUserClicked}>OPPRETTE NY BRUKER</button>
                  <button className={classes.button_auth} onClick={logInWithExistingClicked}>LOGG INN MED EKSISTERENDE BRUKER</button>
              </div>
          }

          {showExistingProfile &&
              <UserProfile />
          }

      </div>
    );
};

export default AuthPage;
