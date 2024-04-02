
import {do_print} from "../../routes";

import classes from "./SellInfo.module.css";
import Card from "../../components/UI/Card";
import {useNavigate} from "react-router-dom";
import {GiReceiveMoney} from "react-icons/gi";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const SellInfo = () => {

    const navigate = useNavigate();

    const navigateToLogin = (event) => {
        navigate('/auth');
    }

    const navigateToDriveInfo = (event) => {
        navigate('/driveinfo');
    }

    const [is_logged_in , setIsLoggedIn] = useState(false);
    const email = useSelector((state) => state.user.name.email);
    useEffect(() => {
        const has_email = email !== '' && email !== undefined;

        if (do_print) {
            console.log('MainNavigation::has_email = ', has_email, ' : ', email);
        }

        setIsLoggedIn(has_email);
    } , [email]);
    const goToStatus = (event) => {
        navigate('/sell');
    }

    return(
        <div>
            <h1 className={classes.header}>SELGE VED MED VEDBJØRN</h1>
            <p className={classes.paragraph}>HVEM SOM HELST KAN SELGE VED MED VEDBJØRN. LETT SOM EN PLETT. OGSÅ LØNNER DET SEG.
                NÅR DU SELGER VED VIA VEDBJØRN SÅ TJENER DU MER FORDI DU TILBYR KUNDEN 2 TING :
            </p>

            <div className={classes.receivemoney}>
                <GiReceiveMoney />
            </div>

            <div className={classes.cards}>
                <Card className={classes.card} >
                    <h2 className={classes.header2}>1. MIDLERTIDIG OPPBEVARING</h2>
                    <ul className={classes.ul}>
                        <li>KUNDEN ABONNERER PÅ VEDEN DIN. DEN BLIR LEVERT LITT OG LITT AV GANGEN. HVER KUNDE FÅR TYPISK LEVERT VED 1 GANG PER UKE</li>
                        <li>EN SJÅFØR KOMMER FOR Å HENTE VED HOS DEG, FOR Å LEVERE DEN TIL KUNDENE.</li>
                        <li>DITT VED-LAGER FUNGERER DERMED SOM ET "VED-HOTELL" FOR KUNDEN. </li>
                        <li>VEDBJØRN HJELPER DEG MED Å HA KONTROLL OVER LAGERBEHOLDNINGEN DIN SLIK AT DU HAR BEST MULIGE FORUTSETNINGER FOR Å VÆRE FORBEREDT PÅ SALG. </li>
                    </ul>
                </Card>

                <Card className={classes.card}>
                    <h2 className={classes.header2}>2. VED</h2>
                    <ul className={classes.ul}>
                        <li>SJÅFØREN SOM LEVERER VED FOR DEG, LEVERER DIREKTE TIL SLUTTBUKER.</li>
                        <li>DU UNNGÅR ET FORDYRENDE MELLOMLEDD, OG KAN TA EN STØRRE DEL AV FORTJENESTEN SELV.</li>
                        <li>KUNDEN KAN SOM ET TILVALG VELGE Å RESERVERE VED HOS DEG.</li>
                    </ul>
                </Card>

            </div>

            <p className={classes.paragraph}>VED Å SELGE VEDEN DIN MED VEDBJØRN, SÅ GJØR DU DET VELDIG ENKELT FOR KUNDEN.
                DE SLIPPER SLITASJE PÅ EGEN BIL, RYGG OG KNÆR. SAMTIDIG SÅ FRIGJØR DU GARASJEN DERES SIDEN DE IKKE LENGER TRENGER Å
                OPPBEVARE STORE MENGDER VED AV GANGEN.
            </p>

            <div className={classes.cards}>
                <Card className={classes.card} >
                    <h2 className={classes.header2}>HVORDAN KOMMER JEG I GANG ?</h2>
                    <ul className={classes.ul}>
                        <li onClick={navigateToLogin}>OPPRETTE EN PROFIL.</li>
                        <li>VELGE ANTALL VED-SEKKER SOM DU HAR PÅ LAGER.</li>
                        <li>DET ER DET. DU VIL FÅ BESKJED NÅR EN SJÅFØR KOMMER FOR Å HENTE.</li>
                    </ul>
                </Card>

                <Card className={classes.card}>
                    <h2 className={classes.header2}>HVA MED BETALING ?</h2>
                    <ul className={classes.ul}>
                        <li>KUNDEN BETALER MED VIPPS NÅR DE MOTTAR VEDEN.</li>
                        <li>NÅR SJÅFØREN HAR UTLEVERT TIL ALLE KUNDENE PÅ RUNDEN SIN OG DE HAR BETALT, SÅ FÅR DU UTBETALT PENGENE DINE MED VIPPS</li>
                        <li onClick={navigateToDriveInfo}>ØNSKER DU Å TILBY LEVERING SELV? DET KAN DU!</li>
                    </ul>
                </Card>

                <Card className={classes.card}>
                    <h2 className={classes.header2}>HVA KOSTER DET ?</h2>
                    <ul className={classes.ul}>
                        <li>DET ER MARKEDET SOM BESTEMMER PRISEN I DITT OMRÅDE. MEN KORT FORKLART SÅ VIL DU TJENE OMTRENT DET DU ER VANT TIL PER SEKK MED VED.</li>
                        <li>KUNDEN BETALER FOR 3 ELLER 4 PRODUKTER :
                            <ol>
                                <li>VED</li>
                                <li>VED-HOTELL</li>
                                <li>LEVERANSEN</li>
                                <li>RESERVASJON (VALGFRITT TILLEGG)</li>
                            </ol>
                            MEN ALT PAKKES INN I EN PRIS PER SEKK. VED-HOTELL TJENESTEN VIL VÆRE EN EKSTRA INNTEKT FOR DEG SOM VED-SELGER.
                            FORRETNINGSKONSEPTET TIL VEDBJØRN HANDLER OM Å TA EN LITEN ANDEL AV INNTEKTEN FRA PRODUKTSALGET. DETTE VIL SKJE HELT
                            AUTOMATISK OG ER INGENTING DU TRENGER Å TENKE PÅ.
                        </li>
                    </ul>
                </Card>

            </div>

            {is_logged_in &&
                <p className={classes.paragraph_link} onClick={goToStatus}>
                    KLIKK ELLER TRYKK HER FOR Å GÅ TIL DIN SALGS-SIDE
                </p>
            }

        </div>
    );
};

export default SellInfo
