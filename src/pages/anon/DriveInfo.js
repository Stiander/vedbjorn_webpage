import classes from "./DriveInfo.module.css";
import {useNavigate} from "react-router-dom";
import Card from "../../components/UI/Card";
import {GiReceiveMoney} from "react-icons/gi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const DriveInfo = () => {

    const navigate = useNavigate();

    const [is_logged_in , setIsLoggedIn] = useState(false);
    const email = useSelector((state) => state.user.name.email);

    useEffect(() => {
        const has_email = email !== '' && email !== undefined;
        setIsLoggedIn(has_email);
    } , [email]);

    const navigateToLogin = (event) => {
        navigate('/auth');
    }

    const goToStatus = (event) => {
        navigate('/drive');
    }

    return(
        <div>
            <h1 className={classes.header}>LEVERE VED MED VEDBJØRN</h1>
            <p className={classes.paragraph}>HAR DU EN VAREBIL ELLER EN BIL MED HENGER? LYST TIL Å TJENE PENGER? VEDBJØRN
                TRENGER SJÅFØRER OG VIL GJERNE HA DEG MED PÅ LAGET. DET ER LETT OG DET ER LØNNSOMT. HER SER DU HVORDAN.</p>

            <div className={classes.receivemoney}>
                <GiReceiveMoney />
            </div>

            <div className={classes.cards}>
                <Card className={classes.card} >
                    <h2 className={classes.header2}>HVA MÅ JEG GJØRE ?</h2>
                    <ul className={classes.ul}>
                        <li onClick={navigateToLogin}>OPPRETTE EN PROFIL.</li>
                        <li>REGISTRERE DEG SOM SJÅFØR.</li>
                        <li>THAT'S IT! DU VIL FÅ BESKJED NÅR ET OPPDRAG ER KLART FOR DEG</li>
                    </ul>
                </Card>

                <Card className={classes.card}>
                    <h2 className={classes.header2}>HVORDAN GJØR JEG JOBBEN ?</h2>
                    <ul className={classes.ul}>
                        <li>DU VIL HA FULL OVERSIKT OVER ET PÅGÅENDE LEVERANSEOPPDRAG FRA DIN PROFIL. OVERSIKTEN INNEHOLDER FØLGENDE :
                            <ol>
                                <li>HVOR DU SKAL PLUKKE OPP VEDSEKKER OG HVOR MANGE</li>
                                <li>HVOR DU SKAL LEVERE VEDSEKKENE OG HVOR MANGE</li>
                                <li>EVENTUELLE TIDSFRISTER FOR NÅR OPPDRAGET MÅ VÆRE GJENNOMFØRT</li>
                            </ol>
                        </li>
                        <li>NÅR DU HAR LEVERT FRA DEG RIKTIG ANTALL SEKKER HOS EN KUNDE, SÅ TAR DU ET BILDE AV DET MED
                            APPEN OG TRYKKER PÅ EN KNAPP. SÅ KAN DU KJØRE VIDERE.</li>
                        <li>NÅR DU HAR LEVERT FRA DEG ALL VEDEN TIL ALLE KUNDENE I OPPDRAGET SÅ KAN DU GI DEG SELV EN KLAPP
                            PÅ SKULDEREN. VEDBJØRN TAR SEG AV RESTEN.</li>
                        <li>DU FÅR BETALT FOR JOBBEN DU HAR GJORT SÅ SNART ALLE KUNDENE I OPPDRAGET HAR BETALT FOR VEDEN.
                            VEDBJØRN TAR SEG AV DETTE OG GARANTERER FOR AT DU FÅR BETALT.
                        </li>
                    </ul>
                </Card>

            </div>

            <p className={classes.paragraph}>BLI MED PÅ VEDBJØRN-LAGET OG LAG EN PROFIL I DAG. ENKELT OG LØNNSOMT</p>

            {is_logged_in &&
                <p className={classes.paragraph_link} onClick={goToStatus}>
                    KLIKK ELLER TRYKK HER FOR Å GÅ TIL DIN KJØPS-SIDE
                </p>
            }

        </div>
    );
};

export default DriveInfo
