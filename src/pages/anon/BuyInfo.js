import classes from "./BuyInfo.module.css";
import Card from "../../components/UI/Card";
import {useNavigate} from "react-router-dom";
import {GiWoodPile} from "react-icons/gi";
import {useEffect, useState} from "react";

import {useSelector} from "react-redux";

const BuyInfo = () => {

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
        navigate('/buy');
    }

    return(
        <div>
            <h1 className={classes.header}>KJØPE VED MED VEDBJØRN</h1>
            <p className={classes.paragraph}>DET ER LETT Å KJØPE VED MED VEDBJØRN. HER KOMMER DET EN NÆRMERE FORKLARING PÅ HVORDAN MAN GJØR DET OG HVORDAN DET FUNGERER.</p>

            <div className={classes.woodpile}>
                <GiWoodPile />
            </div>

            <div className={classes.cards}>
                <Card className={classes.card} >
                    <h2 className={classes.header2}>HVA MÅ JEG GJØRE ?</h2>
                    <ul className={classes.ul}>
                        <li onClick={navigateToLogin}>OPPRETTE EN PROFIL.</li>
                        <li>VELGE ANTALL VED-SEKKER DU ØNSKER Å FÅ LEVERT HVER UKE.</li>
                        <li>EVENTUELT VELGE OM DU VIL RESERVERE. </li>
                    </ul>
                </Card>

                <Card className={classes.card}>
                    <h2 className={classes.header2}>HVA MED BETALING ?</h2>
                    <ul className={classes.ul}>
                        <li>DU BETALER INGENTING FØR VEDEN ER LEVERT HOS DEG.</li>
                        <li>BETALING SKJER MED VIPPS, SOM DU VIL FÅ EN MELDING FRA.</li>
                    </ul>
                </Card>

                <Card className={classes.card}>
                    <h2 className={classes.header2}>HVA KOSTER DET ?</h2>
                    <ul className={classes.ul}>
                        <li>DET KOMMER AN PÅ HVOR DU BOR.</li>
                        <li>NÅR DU HAR LAGET EN PROFIL OG ANGITT BOSTED, SÅ KAN VI FINNE UT PRISENE FOR DEG. (DET ER IKKE DYRT!)</li>
                    </ul>
                </Card>

            </div>

            {is_logged_in &&
                <p className={classes.paragraph_link} onClick={goToStatus}>
                    KLIKK ELLER TRYKK HER FOR Å GÅ TIL DIN KJØPS-SIDE
                </p>
            }
        </div>
    );
};

export default BuyInfo
