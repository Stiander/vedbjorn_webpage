
import classes from  './MakeSellRequest.module.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {putSellRequest} from "../../store/sell-http";

const MakeSellRequest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [yesSellChecked , setYesSellChecked] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const numbagsRef = useRef(0);
    const email = useSelector((state) => state.user.name.email);
    const [agreeDeal, setAgreeDeal] = useState(false);

    const goToInfo = (event) => {
        navigate('/sellinfo');
    };

    const yesagreeChanged = (event) => {
        setAgreeDeal(!agreeDeal);
    };

    const viewAgreement = (event) => {
        navigate('/terms/sell');
    };

    const backClicked = (event) => {
        navigate('/sell');
    };

    const yessellChanged = (event) => {
        setYesSellChecked(!yesSellChecked);
        setShowStartButton(false);
    };

    const numbagsChanged = (event) => {
        setShowStartButton(numbagsRef.current.value > 0);
    };

    const startClicked = (event) => {
        dispatch(putSellRequest(email , {
            current_capacity : numbagsRef.current.value
        }))
    };

    return (
        <div>
            <h1 className={classes.header}>SELGE VEDSEKKER (15L)</h1>
            <p className={classes.paragraph}>
                HAR DU FERDIG SEKKET VED SOM DU ØNSKER Å SELGE? DETTE ER SALGS-ALTERNATIVET FOR DEG SOM ØNSKER EN HØYEST MULIG
                FORTJENESTE OG SOM IKKE HAR NOE IMOT Å SELGE I LITT MINDRE KVANTUM AV GANGEN.
            </p>
            <p className={classes.paragraph}>
                DET FUNGERER SLIK AT DU OPPGIR HVOR MANGE SEKKER MED VED DU HAR PÅ LAGER.
                SÅ VIL VEDBJØRN AUTOMAGISK PRØVE Å FINNE KJØPERE I NÆRHETEN AV DEG, SAMT SJÅFØRER FOR Å FÅ DEN LEVERT FOR DEG.
            </p>
            <p className={classes.paragraph}>
                KUNDENE ØNSKER Å FÅ SITT UKESFORBRUK LEVERT EN GANG I UKEN. DET ER FORDI DE IKKE ØNSKER, ELLER IKKE HAR
                ANLEDNING TIL Å OPPBEVARE STORE MENGDER VED SELV. DET ER OGSÅ DERFOR VI KALLER DENNE SALGS-FORMEN FOR
                VED-HOTELL. GANSKE SMART, IKKE SANT?
            </p>

            <div className={classes.checkboxaligner}>
                <h3 className={classes.header2}>JA, JEG ØNSKER Å SELGE VEDSEKKER</h3>
                <p className={classes.paragraph2}>
                    (KLIKK / TRYKK I BOKSEN NEDENFOR)
                </p>
                <input
                    className={classes.checkbox}
                    onChange={yessellChanged}
                    type='checkbox' id='yessell'
                    checked={yesSellChecked}
                />
            </div>

            { yesSellChecked &&
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

            {yesSellChecked && agreeDeal &&
                <div className={classes.checkboxaligner}>
                    <h3 className={classes.header2}>ANTALL SEKKER MED VED DU HAR PÅ LAGER</h3>
                    <input
                        className={classes.input}
                        onChange={numbagsChanged}
                        type='number' id='numbags'
                        required ref={numbagsRef}
                        defaultValue={0}
                        min={0}
                        max={9999}
                    />
                </div>
            }

            { (showStartButton && yesSellChecked && agreeDeal) &&
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={startClicked}>START</button>
                </div>
            }

            <p className={classes.paragraph_link} onClick={goToInfo}>
                KLIKK ELLER TRYKK HER FOR MER INFORMASJON
            </p>

            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={backClicked}>TILBAKE</button>
            </div>
        </div>
    );
};

export default MakeSellRequest;
