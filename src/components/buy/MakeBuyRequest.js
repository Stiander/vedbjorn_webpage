
import classes from './MakeBuyRequest.module.css';
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {putBuyRequest} from "../../store/buy-http";

const MakeBuyRequest = () => {
    const dispatch = useDispatch();
    const [yesBuyChecked , setYesBuyChecked] = useState(false);
    const [showStartButton, setShowStartButton] = useState(false);
    const email = useSelector((state) => state.user.name.email);
    const numbagsRef = useRef(3);

    const navigate = useNavigate();

    const goToInfo = (event) => {
        navigate('/buyinfo');
    };

    const yesbuyChanged = (event) => {
        setYesBuyChecked(!yesBuyChecked);
        setShowStartButton(false);
    };

    const numbagsChanged = (event) => {
        setShowStartButton(numbagsRef.current.value > 0);
    };

    const startClicked = (event) => {
        dispatch(putBuyRequest(email , {
            current_requirement : numbagsRef.current.value ,
            reserved_weeks : -1
        }));
    };

    return (
        <div>
            <h1 className={classes.header}>KJØPE VED</h1>
            <p className={classes.paragraph}>
                ØNSKER DU Å KJØPE VED? DET FUNGERER SLIK AT DU OPPGIR HVOR MANGE SEKKER MED VED DU ØNSKER Å FÅ LEVERT HVER UKE.
                SÅ VIL VEDBJØRN AUTOMAGISK PRØVE Å FINNE SELGERE I NÆRHETEN AV DEG, SAMT SJÅFØRER FOR Å FÅ DEN LEVERT TIL DEG.
            </p>

            <p className={classes.paragraph}>
                DET ER INGEN FORPLIKTELSER OG DU KAN NÅR SOM HELST SKRU AV SØKET
            </p>

            <div className={classes.checkboxaligner}>
                <h3 className={classes.header2}>JA, JEG ØNSKER Å KJØPE VED</h3>
                <p className={classes.paragraph2}>
                    (KLIKK / TRYKK I BOKSEN NEDENFOR)
                </p>
                <input
                    className={classes.checkbox}
                    onChange={yesbuyChanged}
                    type='checkbox' id='yesbuy'
                    checked={yesBuyChecked}
                />
                
            </div>

            {yesBuyChecked &&
                <div className={classes.checkboxaligner}>
                    <h3 className={classes.header2}>ANTALL SEKKER MED VED PER UKE</h3>
                    <input
                        className={classes.input}
                        onChange={numbagsChanged}
                        type='number' id='numbags'
                        required ref={numbagsRef}
                        defaultValue={0}
                        min={0}
                        max={10}
                    />
                </div>
            }

            { (showStartButton && yesBuyChecked) &&
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={startClicked}>START</button>
                </div>
            }


            <p className={classes.paragraph_link} onClick={goToInfo}>
                KLIKK ELLER TRYKK HER FOR MER INFORMASJON
            </p>

        </div>
    );
};

export default MakeBuyRequest;
