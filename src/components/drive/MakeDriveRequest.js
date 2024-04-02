
import classes from './MakeDriveRequest.module.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {putDriveRequest} from "../../store/drive-http";
import {useEffect} from "react";
import Card from "../UI/Card";
import {brregActions} from "../../store/brreg-slice";

const MakeDriveRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email       = useSelector((state) => state.user.name.email);
    const has_company = useSelector((state) => state.brreg.ok_loaded);

    const [yesDriveChecked , setYesDriveChecked] = useState(false);
    const [agreeDeal       , setAgreeDeal      ] = useState(false);

    const yesdriveChanged = (event) => {
        setYesDriveChecked(!yesDriveChecked);
    };

    const yesagreeChanged = (event) => {
        setAgreeDeal(!agreeDeal);
    };

    const viewAgreement = (event) => {

        //
        // Open in new tab.
        // Note : need to add base-URL aswell, unlike the useNavigate hook
        //
        // window.open('/terms/drive','_blank');

        navigate('/terms/drive');
    };

    const startClicked = (event) => {
        dispatch(putDriveRequest(email, {
            available : true
        }));
    };

    const goToInfo = (event) => {
        navigate('/driveinfo');
    };

    const seeOldAssignments = (event) => {
        navigate('/driveassignment/old');
    };

    const old_routes = useSelector((state) => state.route.completed_routes);
    const [showPrev , setShowPrec] = useState(false);
    useEffect(() => {
        if(old_routes.length > 0) {
            setShowPrec(true);
        } else {
            setShowPrec(false);
        }
    } , [old_routes]);

    const businessClicked = () => {
        dispatch(brregActions.set_business_back_page('/drive'));
        navigate('/mybusiness');
    };

    return (
      <div>

          <h1 className={classes.header}>LEVERE VED</h1>
          <p className={classes.paragraph}>
              ØNSKER DU Å TJENE PENGER PÅ Å LEVERE VED? HAR DU EGEN BIL MED HENGER ELLER KANSKJE EN VAREBIL?
              VEDBJØRN GJØR DET VELDIG ENKELT FOR DEG. Å REGISTRERE DEG SOM SJÅFØR GJØR DU HER
          </p>

          <Card>
              {has_company &&
                  <p className={classes.paragraph}>
                      DU HAR ALLEREDE OPPGITT OPPLYSNINGER OM VIRKSOMHETEN DIN MEN DU KAN FREMDELES GÅ INN
                      FOR Å SE OG GJØRE ENDRINGER
                  </p>
              }
              {!has_company &&
                  <p className={classes.paragraph}>
                      DU MÅ OPPGI NOEN OPPLYSNINGER OM VIRKSOMHETEN DIN FØR DU KAN BEGYNNE Å SELGE.
                      DET GJØR DU VED Å TRYKKE PÅ KNAPPEN NEDENFOR
                  </p>
              }
              <div className={classes.ctrl_buttons}>
                  <button className={classes.button_ok} onClick={businessClicked}>VIRKSOMHETEN MIN</button>
              </div>
          </Card>

          { has_company &&
              <div className={classes.checkboxaligner}>
                  <h3 className={classes.header2}>JA, JEG ØNSKER Å VÆRE VEDBJØRN-SJÅFØR</h3>
                  <p className={classes.paragraph2}>
                      (KLIKK / TRYKK I BOKSEN NEDENFOR)
                  </p>
                  <input
                      className={classes.checkbox}
                      onChange={yesdriveChanged}
                      type='checkbox' id='yesbuy'
                      checked={yesDriveChecked}
                  />
              </div>
          }

          { yesDriveChecked &&
              <div className={classes.checkboxaligner}>
                  <h3 className={classes.header2}>JA, JEG GODTAR VEDBJØRS VILKÅR OG INNGÅR AVTALE.</h3>
                  <div className={classes.buttons}>
                      <button className={classes.button_ok} onClick={viewAgreement}>SE AVTALEN</button>
                  </div>
                  <p className={classes.paragraph2}>
                      (KLIKK / TRYKK I BOKSEN NEDENFOR FOR Å INNGÅ AVTALEN)
                  </p>
                  <input
                      className={classes.checkbox}
                      onChange={yesagreeChanged}
                      type='checkbox' id='yesagree'
                      checked={agreeDeal}
                  />
              </div>
          }

          { yesDriveChecked && agreeDeal &&
              <div className={classes.buttons}>
                  <button className={classes.button_ok} onClick={startClicked}>START</button>
              </div>
          }


          <p className={classes.paragraph_link} onClick={goToInfo}>
              KLIKK ELLER TRYKK HER FOR MER INFORMASJON
          </p>

          {showPrev &&
              <Card>
                  <div className={classes.centralize}>
                      <h1 className={classes.header3}>DU HAR {old_routes.length} TIDLIGERE UTFØRTE OPPDRAG</h1>
                      <div className={classes.buttons}>
                          <button className={classes.button_ok} onClick={seeOldAssignments}>KLIKK FOR Å SE</button>
                      </div>
                  </div>
              </Card>
          }
      </div>
    );
};

export default MakeDriveRequest;
