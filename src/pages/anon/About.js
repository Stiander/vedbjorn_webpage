
import classes from './About.module.css';
import Card from "../../components/UI/Card";
import {HiOutlineLightBulb} from "react-icons/hi";
import {GiTechnoHeart} from "react-icons/gi";

import ImageOfMe from "../../assets/me1.jpg";

const About = () => {

    return (
        <div>
            <h1 className={classes.header}>INFORMASJON OM VEDBJØRN</h1>
            <div className={classes.cards}>
                <Card className={classes.card} >
                    <h2 className={classes.header2}>SELSKAP</h2>
                    <ul className={classes.ul}>
                        <li>VEDBJØRN AS , ORG.NR : 929 350 790</li>
                        <li>DAGLIG LEDER : STIAN BROEN</li>
                        <li>KONTAKT : STIAN@VEDBJORN.NO</li>
                        <li>ADRESSE : ADALSVEIEN 1B, 3185 SKOPPUM</li>
                    </ul>
                </Card>
            </div>

            <h3 className={classes.header2}>IDEEN</h3>
            <div className={classes.lightbulb}>
                <HiOutlineLightBulb />
            </div>


            <p className={classes.paragraph}>VEDBJØRN AS ER ET SELSKAP OPPRETTET OG DRIFTET AV STIAN BROEN (MEG). DET
                ER OGSÅ JEG SOM HAR UTVIKLET ALL TEKNOLOGIEN.
                IDEEN TIL VEDBJØRN KOM TIL MEG DA JEG STO I GARASJEN MIN HJEMME PÅ SKOPPUM OG STABLET VED. JEG HADDE
                AKKURAT FÅTT LEVERT ET STORT LASS AV EN LOKAL VED-SELGER. MENS JEG STOD DER SÅ KOM DET FLERE NABOER BORT
                TIL MEG Å SPURTE HVOR JEG HADDE FÅTT TAK I VEDEN FRA. DET VAR NEMLIG IKKE MER VED IGJEN PÅ HVERKEN KIWI
                PÅ SKOPPUM ELLER MAXBO I HORTEN DER DE VANLIGVIS DRO FOR Å KJØPE. MED ETT SÅ KOM DET OVER MEG AT JEG SYNES
                HELE SITUASJONEN VAR SÅ TEIT. IKKE HADDE JEG SPESIELT LYST TIL Å STÅ DER I GARASJEN Å STABLE VED. JEG HADDE
                HELLER IKKE EGENTLIG LYST TIL Å BRUKE GARASJEN MIN TIL DETTE, FOR DA MÅTTE JO BILEN MIN STÅ UTE I KULDA, JEG
                MÅ SKRAPE DEN OM MORGENEN OSV. MEN JEG VAR JO FAKTISK DEN HELDIGE, DE STAKKARS NABOENE MINE VISSTE IKKE
                HVOR DE KUNNE FÅ KJØPT ENGANG. STRØMMEN ER JO OGSÅ SÅPASS DYR NÅ AT VEDFYRING ER ET MUST FOR DE FLESTE.
            </p>
            <p className={classes.paragraph}>
                KUNNE DETTE VÆRT GJORT PÅ NOEN SMARTERE MÅTE MON TRO? JEG BEGYNTE Å GRUBLE PÅ DETTE OG DA BEGYNTE IDEENE
                Å KOMME.
            </p>

            <h3 className={classes.header2}>TEKNOLOGIEN</h3>
            <div className={classes.techheart}>
                <GiTechnoHeart />
            </div>

            <p className={classes.paragraph}>
                VEDBJØRN ER ET GANSKE ENKELT KONSEPT MEN I PRAKSIS GANSKE VANSKELIG Å FÅ TIL. LØSNINGEN ER BASERT PÅ EN
                MATCH-MAKING ALGORITME, SOM JEG HAR BESKREVET I ET PAPER (TA KONTAKT). PROBLEMET SOM MÅ LØSES KAN BESKRIVES
                SOM FØLGER :
            </p>

            <p className={classes.paragraph}>
                "GITT ET SETT MED GEOGRAFISK SPREDTE BRUKERE SOM ØNSKER Å ENTEN KJØPE, SELGE ELLER TRANSPORTERE PRODUKTET,
                FINN EN FORNUFTIG SAMLING MED ASSOSIASJONER MELLOM BRUKERNE SOM ER DISTRIBUERT PÅ EN RETTFERDIG MÅTE OG SOM
                SAMTIDIG ER OPTIMAL MED TANKE PÅ HVILKEN RUTE MELLOM KJØPERE OG SELGERE EN SJÅFØR BURDE TA FOR Å KOMME
                FORTEST I MÅL, OG SOM SAMTIDIG ER SLIK AT DE TIL EN HVER TID ALDRI HAR MER LAST MED SEG EN STRENGT NØDVENDIG"
            </p>

            <p className={classes.paragraph}>
                DE MED INFORMATIKK-BAKGRUNN VIL KANSKJE KJENNE IGJEN PROBLEMSTILLINGEN SOM EN VARIANT AV "THE TRAVELLING
                SALESMAN". JA DET LIGNER ENDEL PÅ DET MEN DET ER OGSÅ NOEN FORSKJELLER FORDI SELGEREN ER NØDT TIL Å PLUKKE
                OPP SAMT LEVERE PRODUKTER LANGS MED RUTEN. PROBLEMSTILLINGEN INTERESSERER MEG VELDIG OG JEG ER OPPTATT
                AV ALGORITMER OG INFORMATIKK. JEG GREIDE TILSLUTT Å LAGE EN LØSNING SOM FUNGERTE SÅPASS GODT AT JEG NESTEN
                BLE LITT OVERRASKET SELV. OG DET VAR DA JEG BESTEMTE JEG FOR Å TA SKRITTET VIDERE MED Å LAGE EN FULLSTENDIG
                APPLIKASJON.
            </p>

            <p className={classes.paragraph}>
                FOR DE SPESIELT INTERESSERTE HER ER TECH-STACKEN :
            </p>

            <div className={classes.cards}>
                <Card className={classes.card} >
                    <h2 className={classes.header2}>TECH STACK</h2>
                    <ul className={classes.ul}>
                        <li>GRAPH-DATABASE : NEO4J</li>
                        <li>NOSQL-DATABASE : MONGODB</li>
                        <li>BACKEND LANGUAGE : PYTHON</li>
                        <li>SERVICE-MESH PROTOCOL : GRPC</li>
                        <li>WEB INTERFACE : REST</li>
                        <li>FRONTEND : REACT</li>
                        <li>HOSTING : GOOGLE FIREBASE + CLOUDRUN</li>
                    </ul>
                </Card>
            </div>

            <p className={classes.paragraph}>
                HER ER ET BILDE AV MEG AKKURAT NÅ NÅR JEG SITTER OG SKRIVER DENNE KODEN (LEGG MERKE TIL VEDBJØRN-SKJORTA
                😄 ):
            </p>

            <div className={classes.selfimg_container}>
                <img className={classes.selfimg} src={ImageOfMe}></img>
            </div>

            <p className={classes.paragraph}>
                HAR DU LYST TIL Å SLÅ AV EN PRAT FOR Å DISKUTERE VEDBJØRN? REACH-OUT! KONTAKT INFO OVENFOR.
            </p>

        </div>
    );
};

export default About
