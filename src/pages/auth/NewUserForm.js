
import {do_print, vipps_is_debug} from "../../routes";

import Card from "../../components/UI/Card";
import classes from './NewUserForm.module.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import store from "../../store";
import NameForm from "./NameForm";
import LocationForm from "./LocationForm";
import LocationAddressForm from './LocationAddressForm';
import EmailVerifyWithCode from "./EmailVerifyWithCode";
import EvaluateInput from './EvaluateInput';
import FinalConfirm from "./FinalConfirm";
import {useDispatch, useSelector} from "react-redux";
import {newUserActions} from "../../store/new-user-slice";
import {getExistingUser, verifyNewUser} from "../../store/users-http";
import {brregActions} from "../../store/brreg-slice";
import {buyActions} from "../../store/buy-slice";
import {deliveryActions} from "../../store/delivery-slice";
import {driveActions} from "../../store/drive-slice";
import {errorActions} from "../../store/error-slice";
import {infoActions} from "../../store/info-slice";
import {messagesActions} from "../../store/messages-slice";
import {routeActions} from "../../store/route-slice";
import {sellActions} from "../../store/sell-slice";
import {userActions} from "../../store/user-slice";
import {vippsActions} from "../../store/vipps-slice";
import {visitActions} from "../../store/visit-slice";

const NewUserForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showNameForm     , setShowNameForm]     = useState(true);
    const [showVerifyEmail  , setShowVerifyEmail]  = useState(false);
    const [showLocationForm , setShowLocationForm] = useState(false);
    const [showAddressForm  , setShowAddressForm]  = useState(false);
    const [showEvaluate     , setShowEvaluate]     = useState(false);
    const [showFinalConfirm , setShowFinalConfirm] = useState(false);

    const readyToSubmit     = useSelector((state) => state.newUser.readyToSubmit);
    //const newUserReady      = useSelector((state) => state.newUser.newUserIsReady);
    //const created_confirmed = useSelector((state) => state.info.confirmed);

    // useEffect(() => {
    //     if (newUserReady === true) {
    //         dispatch(infoActions.setPurpose('NEW USER CREATED'));
    //         dispatch(infoActions.setInformation({
    //             title : 'DU HAR LAGET EN NY BRUKER' ,
    //             message: 'Du har samtidig også blitt logget inn. Du kan lukke dette vinduet, og vil da bli sendt til forsiden. Du kan ' +
    //                 ' se på profilen din ved å klikke "MIN PROFIL" fra hovedmenyen.'
    //         }));
    //
    //         if (do_print) {
    //             console.log('NewUserForm :: newUserReady = ', newUserReady);
    //         }
    //     }
    // } , [newUserReady , navigate , dispatch]);
    //
    // useEffect(() => {
    //     const purpose = store.getState().info.purpose;
    //     if(purpose === 'NEW USER CREATED') {
    //
    //         if (do_print) {
    //             console.log('EXISTING USER WAS CREATED; FORWARDING TO FRONT PAGE');
    //         }
    //
    //         dispatch(infoActions.setPurpose(''));
    //         dispatch(infoActions.setConfirmed(false));
    //         navigate('/');
    //         const email = store.getState().newUser.name.email;
    //         dispatch(getExistingUser(email));
    //     }
    // } , [created_confirmed, dispatch, navigate]);

    useEffect(() => {
        if (readyToSubmit === true) {
            goto_finalConfirm();
        }
    } , [readyToSubmit]);

    const receiveName = (data) => {
        goto_verifyEmail();
    };

    const receivePos = () => {
        goto_address();
    };

    const emailVerified = () => {
        // let user_fake_user = vipps_is_debug;
        // // user_fake_user = false; // TODO : REMOVE THIS LINE
        // if(user_fake_user) {
        //     console.log("USING FAKE USER");
        //     const street_address = store.getState().vipps.user.address.street_address;
        //     if(street_address === 'BOKS 6300, ETTERSTAD') {
        //         dispatch(newUserActions.setName_road('Biskop Jens Nilssøns gate 28'));
        //         dispatch(newUserActions.setName_zip('0659'));
        //     }
        // } else {
        //     console.log("USING NORMAL USER");
        //     dispatch(newUserActions.setName_road(store.getState().vipps.user.address.street_address));
        //     dispatch(newUserActions.setName_zip(store.getState().vipps.user.address.postal_code));
        // }
        // dispatch(newUserActions.setName_country(store.getState().vipps.user.address.country));
        // dispatch(newUserActions.setName_county(store.getState().vipps.user.address.region));
        // dispatch(newUserActions.set_evaluating(true));
        // receiveAddress();
        goto_address();
    };

    const goto_name = () => {
        setShowNameForm(true);
        setShowVerifyEmail(false);
        setShowLocationForm(false);
        setShowAddressForm(false);
        setShowEvaluate(false);
        setShowFinalConfirm(false);
    };

    const goto_verifyEmail = () => {
        setShowNameForm(false);
        setShowVerifyEmail(true);
        setShowLocationForm(false);
        setShowAddressForm(false);
        setShowEvaluate(false);
        setShowFinalConfirm(false);
    }

    const goto_location = () => {
        setShowNameForm(false);
        setShowVerifyEmail(false);
        setShowLocationForm(true);
        setShowAddressForm(false);
        setShowEvaluate(false);
        setShowFinalConfirm(false);
    };

    const goto_address = () => {
        setShowNameForm(false);
        setShowVerifyEmail(false);
        setShowLocationForm(false);
        setShowAddressForm(true);
        setShowEvaluate(false);
        setShowFinalConfirm(false);
    };

    const goto_finalConfirm = () => {
        setShowNameForm(false);
        setShowVerifyEmail(false);
        setShowLocationForm(false);
        setShowAddressForm(false);
        setShowEvaluate(false);
        setShowFinalConfirm(true);
    };

    const receiveAddress = () => {
        setShowNameForm(false);
        setShowVerifyEmail(false);
        setShowLocationForm(false);
        setShowAddressForm(false);
        setShowEvaluate(true);
        setShowFinalConfirm(false);

        const verifyThis = {
            email : store.getState().newUser.name.email,
            // phone : store.getState().vipps.user.phone_number,
            phone : store.getState().newUser.name.phone,
            firstname : store.getState().newUser.name.firstname,
            lastname : store.getState().newUser.name.lastname,
            // lat : store.getState().newUser.tempLocation.lat ,
            // lng : store.getState().newUser.tempLocation.lng ,
            lat : store.getState().newUser.location.lat ,
            lng : store.getState().newUser.location.lng ,
            zip : store.getState().newUser.location.zip ,
            county : store.getState().newUser.location.county ,
            country : store.getState().newUser.location.country ,
            municipality : store.getState().newUser.location.municipality ,
            road : store.getState().newUser.location.road ,
        };
        dispatch(verifyNewUser(verifyThis));
    };

    const cancel = () => {
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

    return(
      <Card>
          <h1 className={classes.newuserform_header}>NY BRUKER</h1>

          {showNameForm &&
          <NameForm
              nameProceedClicked={receiveName}
          />
          }

          {showVerifyEmail &&
          <EmailVerifyWithCode
              emailVerified={emailVerified}
          />
          }

          { showLocationForm &&
          <LocationForm
              locationProceedClicked={receivePos}
              goBackFromLocation={goto_name}
          />
          }

          { showAddressForm &&
              <LocationAddressForm
                  goBackFromAddress={goto_name}
                  receiveAddress={receiveAddress}
              />
          }

          { showEvaluate &&
              <EvaluateInput

              />
          }

          { showFinalConfirm &&
              <FinalConfirm

              />
          }

          <div className={classes.buttons}>
              <button className={classes.button_cancel} onClick={cancel}>AVBRYT</button>
          </div>
      </Card>
    );
};

export default NewUserForm;
