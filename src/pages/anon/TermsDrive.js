
import classes from './TermsAndConditions.module.css';
import {useNavigate} from "react-router-dom";

const TermsDrive = () => {
    const navigate = useNavigate();
    const one_text = String("Dette er et dokument som regulerer vilkår og betingelser mellom en innkjøper av logistikktjenester (heretter “Vedbjørn”) og en tilbyder av logistikktjenester (heretter “Selger”) relatert til utkjøring av fyringsved koordinert via nettsiden www.vedbjorn.no (heretter “Plattformen”).").toUpperCase();
    const two_text = String("Avtalen består av disse betingelsene, opplysninger gitt på Plattformen og eventuelt særskilt avtalte vilkår. Ved eventuell motstrid mellom opplysningene, går det som særskilt er avtalt mellom partene foran, så fremt det ikke strider mot ufravikelig lovgivning. Avtalen vil i tillegg bli utfylt av relevante lovbestemmelser som regulerer kjøp av tjenester mellom næringsdrivende fra kjøpsloven (se https://lovdata.no/dokument/NL/lov/1988-05-13-27)").toUpperCase();
    const three_text = String("Kjøper : \n" +
        "Vedbjørn AS (via ”Plattformen”), Org.nr 929.350.790\n" +
        "Forretningsadresse : Adalsveien 1B, 3185 Skoppum\n" +
        "E-post : stian@vedbjorn.no\n" +
        "Selger : \n" +
        "Den juridiske enheten, en person eller et selskap, som tilbyr sine logistikk-tjenester via “Plattformen”.\n" +
        "\n" +
        "Dette er å forstå som at kjøperen (Vedbjørn) har tilrettelagt Plattformen (www.vedbjorn.no) på en slik måte at selger (deg, sjåføren) enkelt kan selge dine produkter/tjenester til kjøperen.\n").toUpperCase();
    const four_text = String("Prisene som er oppgitt på nettsiden, inkluderer merverdiavgift. Opplysninger om de totale kostnadene kjøperen skal betale, inklusive alle avgifter (merverdiavgift, toll, og lignende). Prisene for hver enkelt kjøreoppdrag vil variere som funksjon av sesong, marked og lokasjon.").toUpperCase();
    const five_text = String("Avtalen er bindende for begge parter (se pkt 3) når kjøperens ønske om å tilby logistikk-tjenester har resultert i at “Plattformen” har definert et leveranseoppdrag som så har blitt godkjent av selgeren. Selgeren er kjent med at et leveranseoppdrag foreslått av Plattformen som ikke aksepteres av selgeren vil bli tilbudt en annen tjenestetilbyder, uten mulighet til å angre. Plattformens algoritme favoriserer de selgerne som oftes godkjenner foreslåtte oppdrag. Videre vil Plattformen kunne opprette tidsbegrensede, eller i enkelte tilfeller permanente  blokader for selgere som har avslått foreslåtte kjøreoppdrag for mange ganger. Hva som blir ansett som for mange, vil algoritmen selv avgjøre. Avtalen opphører når utbetaling fra kjøper til selger etter sluttføring av kjøreoppdraget.").toUpperCase();
    const six_text = String("Selgeren er selv ansvarlig for eget arbeidsforhold, helse, miljø og sikkerhet. Denne samarbeidsavtalen er ikke å anse som en arbeidskontrakt, men er å anse som vilkår for hvert enkelt kjøreoppdrag. Selgeren er kjent med at kjøperen er fritatt for alt ansvar i en eventuell situasjon med skade på person eller utstyr som måtte skje underveis i et leveranseoppdrag. Selgeren er ansvarlig for at kjøretøy og person er forsikret, samt at kjøretøy har nødvendig kapasitet for gjennomføring av oppdraget. Selgeren er ansvarlig for å ha eget sertifikat i forhold til kjøretøy brukt i leveranseoppdraget. Selgeren er selv ansvarlig for å sørge for riktig beskatning av sin inntekt til skattemyndighetene, samt arbeidsgiveravgift.").toUpperCase();
    const seven_text = String("Selgeren skal bruke “Plattformen” til gjennomføring av kjøreoppdraget. Selgeren vil få en e-post når et nytt kjøreoppdrag blir tilgjengelig, samt en melding i “Plattformen”, og må deretter enten godkjenne eller avslå kjøreoppdraget innenfor en gitt tid. Når et foreslått kjøreoppdrag aksepteres av selgeren, er denne avtalen i effekt helt frem til utbetaling. Selgeren har nå en begrenset, men rimelig, tid til å fullføre kjøreoppdraget. Fra Plattformen vil selgeren ha oversikt fra et kart hvor det skal plukkes opp produkt, hvor mye, fra hvilken person, hvor det skal leveres produkt, hvor mye og til hvilken person. Ved hvert besøk skal selgeren bruke Plattformen til å registrere besøket, utføre handlingen samt dokumentere handlingen ved å bruke bildetagningsfunksjonen i Plattformen. Dette er for å sikre bevis på henting og levering. Dette er meget enkelt å gjøre. Rekkefølgen på henting/levering i kjøreoppdraget er å anse som et forslag og selgeren velger selv rekkefølgen, så lenge alle besøkene gjennomføres.\n" +
        "\n" +
        "Merk at selgeren representerer kjøperen under et kjøreoppdrag. Det er derfor et krav til selgeren at selgeren opptrer på en hyggelig og samarbeidsvillig måte overfor alle personer som selgeren møter. Utbetaling vil skje så snart alle mottakere av produkt i kjøreoppdraget har betalt for sine leveranser, men ikke senere en 20 dager etter gjennomføringen. Kjøperen vil, innenfor rimelighetens grenser og i henhold til egen kapasitet, sørge for at selgeren får betalt for oppdraget uavhengig av eventuelle betalingsforsinkelser fra mottakerne.\n").toUpperCase();
    const eight_text = String("Vedbjørn baserer seg på 40-liters sekker med 15 kilo ved som har maksimalt 20% fuktighet ihht Norsk Standard for ved - NS 4414").toUpperCase();
    const nine_text = String("Selgeren skal besøke alle lokasjoner merket med “hente” i Plattformen for hvert leveranseoppdrag, og ta med seg produkter som angitt i henhold til pkt 7. Det er kjøperen (Vedbjørn) som kjøper disse produktene, og er eier av dem i perioden fra de har blitt plukket opp og til de har blitt levert til mottakerne. Det er selgeren (deg, sjåføren) som har ansvaret for å påse at riktig antall plukkes opp og bevisføres via bildetagningsfunksjonen i Plattformen, og at produktbeskrivelsen for hver enkelt produkt er i henhold til beskrivelsen i pkt 8. Dersom selgeren opplever at en ved-leverandør ikke greier å imøtekomme bestillingen i leveranseoppdraget ihht de krav som er stilt, så har selgeren rett til å nekte å hente her. Slik hente-nekt skal registreres i Plattformen, det som da vil skje er at denne spesifikke leveransen blir overført til en annen vedforhandler innad i det samme oppdraget. Dersom dette heller ikke lar seg løse, så kan oppdraget bli avbrutt. Et fullstendig avbrutt oppdrag kompenseres ikke av kjøperen. Et delvis gjennomført oppdrag, vil bli tilsvarende delvis kompensert.  Ved-forhandleren der produkt skal hentes har blitt informert om at du kommer og fått instruks om å forberede leveransen for deg slik at hentingen kan foregå mest mulig effektivt. Eventuelle forsinkelser som måtte oppstå ved at ved-forhandleren ikke har imøtekommet instruksen, tar ikke kjøper noe ansvar for.").toUpperCase();
    const ten_text = String("Selgeren skal besøke alle lokasjoner merket med “levere” i Plattformen for hvert leveranseoppdrag, og levere produktene som angitt i pkt 7. Det er selgeren (deg, sjåføren) som har ansvaret for at riktig antall produkter blir levert på hvert leveranse-besøk. Det er viktig at produktene leveres på en slik måte at de i minst mulig grad blir påvirket av vær og vind, gjerne under tak. Produktene skal leveres så nærme inngangspartiet på hver adresse, som mulig. Hver leveranse må bevisføres med levere-funksjonen i Plattformen, det er dette som utløser innbetalingsmekanismen på mottager siden. På det tidspunktet da leveranse er registrert i Plattformen, overføres ansvaret for produktet til mottageren. Det skal ikke foregå noen annen form for betaling mellom mottaker og selger (deg, sjåføren), det er Plattformen som tar seg av dette.").toUpperCase();
    const eleven_text = String("Med mindre selgeren samtykker til noe annet, kan kjøperen kun innhente og lagre de personopplysninger som er nødvendig for at kjøperen  skal kunne gjennomføre forpliktelsene etter avtalen. Selgerens personopplysninger skal kun utleveres til andre hvis det er nødvendig for at kjøperen skal få gjennomført avtalen med selgeren, eller i lovbestemte tilfelle. Kjøperen kan kun innhente selgerens personnummer dersom det er saklig behov for sikker identifisering og slik innhenting er nødvendig.\n" +
        "Hvis kjøperen vil benytte selgerens personopplysninger til andre formål, for eksempel til å sende selgeren reklame eller informasjon ut over det som er nødvendig for å få gjennomført avtalen, må kjøperen innhente selgerens samtykke ved avtaleinngåelsen. Kjøperen må gi selgeren informasjon om hva personopplysningene skal brukes til og om hvem som skal bruke personopplysningene. Selgerens samtykke må være frivillig og avgis ved en aktiv handling, for eksempel ved avkrysning.\n" +
        "Selgeren skal enkelt kunne kontakte kjøperen, for eksempel pr. e-post dersom hen har spørsmål om kjøperens bruk av personopplysninger eller hvis hen ønsker at kjøperen sletter eller endrer personopplysningene. Dette gjøres via e-post på support@vedbjorn.no.\n" +
        "Vi behandler dine personopplysninger i samsvar med Vedbjørns personvernerklæring.\n").toUpperCase();
    const twelve_text = String("Vedbjørn gir support gjennom dialog per epost til support@vedbjorn.no.\n").toUpperCase();
    const thirteen_text = String("Vedbjørn forbeholder seg retten til å si opp Tjenesten eller til å innstille bruken av Plattformen for kunder som bryter disse vilkårene. Slik oppsigelse skjer umiddelbart, og kunden varsles pr. e-post.").toUpperCase();
    const fourteen_text = String("● Vedbjørn kan overføre sine rettigheter og forpliktelser i henhold til Vilkårene til en tredjepart, forutsatt at overtakende tredjepart kan forventes å oppfylle sine forpliktelser i henhold til vilkårene på en, fra kundens perspektiv, tilfredsstillende måte.\n" +
        "\n" +
        "● Du er ansvarlig for å kompensere Vedbjørn for eventuell direkte og indirekte skade som Vedbjørn lider på grunn av ditt brudd av Vilkårene.\n" +
        "\n" +
        "I tillegg til det som for øvrig fremgår av Vilkårene, og med mindre annet er fastsatt ved ufravikelig lov, gjelder følgende om Vedbjørn ansvar overfor deg som kunde:\n" +
        "\n" +
        "● Med unntak av det som er angitt i Vilkårene, gir Vedbjørn ingen garantier vedrørende innhold, informasjon, råvarer, tjenester eller annet som er levert av eller gjennom Vedbjørn på Plattformen. Videre gir ikke Vedbjørn garantier om funksjonen, tilgjengeligheten, brukervennligheten eller sikkerheten til Plattformen eller Tjenesten.\n" +
        "\n" +
        "● Vedbjørn er ikke ansvarlig for uautorisert tilgang til, eller endring av, informasjon du sender til Vedbjørn, eller materiale eller informasjon som du mottar. Videre er Vedbjørn ikke ansvarlig for strafferettslige handlinger begått ved hjelp av Vedbjørn tjenester som trusler eller ærekrenkelse, eller for uanstendig, forstyrrende, støtende, upassende eller ulovlig innhold eller atferd fra en bruker.\n" +
        "\n" +
        "● Vedbjørn er ikke ansvarlig for direkte eller indirekte skade som skyldes din bruk av Plattformen, Tjenesten eller informasjon fra Vedbjørn. Dette gjelder imidlertid ikke dersom Vedbjørn forårsaket skade med forsett eller grov uaktsomhet.\n" +
        "\n" +
        "● Vedbjørn forbeholder seg retten til å kansellere levering av ett eller flere Produkter dersom kunden har oppgitt utilstrekkelig eller uriktig informasjon ved registrering av kontoen, dersom Vedbjørn Partner ikke er i stand til å fullføre bestillingen, eller ved force majeure hendelser som pandemier, herunder Corona, naturkatastrofer, krig, politisk uro, streik, lockout , blokade eller andre forhold utenfor Vedbjørn rimelige kontroll, eller andre forhold som i stor grad hemmer eller svekker mulighetene for oppfyllelse av en levering. Vedbjørn forplikter seg til å varsle kunden så snart som mulig dersom en levering kan bli forsinket, eller alternativt, dersom leveringen mislykkes i sin helhet.\n").toUpperCase();
    const fifteen_text = String("Tvist om tolkningen eller anvendelsen av disse Vilkårene skal tolkes i samsvar med norsk lovgivning.\n" +
        "\n" +
        "Ved tvist mellom Vedbjørn og kunden skal partene som første skritt bestrebe seg på å løse tvisten ved avtale.\n").toUpperCase();

    const goBack = (event) => {
        navigate('/terms');
    };

    return (
        <div>
            <h1 className={classes.header}>SAMARBEIDSAVTALE FOR SJÅFØRER</h1>
            <h3 className={classes.header2}>1. INNLEDNING</h3>
            <p className={classes.paragraph}>{one_text}</p>
            <h3 className={classes.header2}>2. AVTALEN</h3>
            <p className={classes.paragraph}>{two_text}</p>
            <h3 className={classes.header2}>3. PARTENE</h3>
            <p className={classes.paragraph}>{three_text}</p>
            <h3 className={classes.header2}>4. PRIS</h3>
            <p className={classes.paragraph}>{four_text}</p>
            <h3 className={classes.header2}>5. AVTALEINNGÅELSE</h3>
            <p className={classes.paragraph}>{five_text}</p>
            <h3 className={classes.header2}>6. ARBEIDSFORHOLD OG ANSVAR</h3>
            <p className={classes.paragraph}>{six_text}</p>
            <h3 className={classes.header2}>7. INSTRUKS</h3>
            <p className={classes.paragraph}>{seven_text}</p>
            <h3 className={classes.header2}>8. PRODUKTET</h3>
            <p className={classes.paragraph}>{eight_text}</p>
            <h3 className={classes.header2}>9. HENTE VEDSEKKER</h3>
            <p className={classes.paragraph}>{nine_text}</p>
            <h3 className={classes.header2}>10. LEVERE VEDSEKKER</h3>
            <p className={classes.paragraph}>{ten_text}</p>
            <h3 className={classes.header2}>11. PERSONOPPLYSNINGER</h3>
            <p className={classes.paragraph}>{eleven_text}</p>
            <h3 className={classes.header2}>12. KUNDESERVICE</h3>
            <p className={classes.paragraph}>{twelve_text}</p>
            <h3 className={classes.header2}>13. VEDBJØRNS RETT TIL Å SI OPP BRUK AV PLATTFORMEN OG TJENESTEN</h3>
            <p className={classes.paragraph}>{thirteen_text}</p>
            <h3 className={classes.header2}>14. DIVERSE</h3>
            <p className={classes.paragraph}>{fourteen_text}</p>
            <h3 className={classes.header2}>15. TVISTELØSNING</h3>
            <p className={classes.paragraph}>{fifteen_text}</p>

            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={goBack}>TILBAKE</button>
            </div>
        </div>
    )
};

export default TermsDrive;
