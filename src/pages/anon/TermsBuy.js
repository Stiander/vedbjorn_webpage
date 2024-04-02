
import classes from './TermsAndConditions.module.css';
import {useNavigate} from "react-router-dom";

const TermsBuy = () => {

    const navigate = useNavigate();

    const goBack = (event) => {
        navigate('/terms');
    };

    const introHeader = String("Generelle betingelser for bruk av produktene og tjenestene\
    levert av Vedbjørn AS.").toUpperCase()

    const introText = String("Vennligst les de generelle vilkårene nedenfor før du registrerer deg eller bestiller varer og\n" +
        "tjenester fra Vedbjørn. Ved å registrerer deg eller bestille varer og tjenester fra Vedbjørn, godtar\n" +
        "du vilkårene og betingelsene. Disse generelle vilkårene (\"Vilkårene\") gjelder for deg som kunde\n" +
        "(\"kunden\", \"deg\") og Vedbjørn AS, organisasjonsnummer 929 350 790, adresse Adalsveien 1B,\n" +
        "3185 Skoppum (\"Vedbjørn\"), ved bestilling av fyringsved og andre produkter (samlet kalt\n" +
        "\"Produkter\") tilgjengelig på www.vedbjorn.no (kalt \"Plattformen\"). Ved å registrere en brukerkonto\n" +
        "hos Vedbjørn, eller ved å bruke Plattformen og/eller Tjenesten (som definert nedenfor), bekrefter\n" +
        "du at du har lest og samtykker i Vilkårene. Ved å bruke Plattformen kan du bestille produkter og\n" +
        "tjenester som er tilgjengelige på plattformen fra tid til annen (\"Vedbjørn-Partnere\", \"Partnere\").\n" +
        "Ved å bestille et Produkt på Plattformen, inngår du en avtale direkte med den aktuelle\n" +
        "Vedbjørn-Partneren og, når det er aktuelt, samtykker i Partnerens salgsvilkår.\n" +
        "Vilkårene utgjør hele avtalen mellom partene om alle forhold relatert til tjenestene levert av\n" +
        "Vedbjørn.\n" +
        "Dersom du har spørsmål angående Vilkårene, kan du alltid kontakte vår kundeservice på\n" +
        "support@vedbjorn.no.").toUpperCase();

    const one_text = String("Dette kjøpet er regulert av de nedenstående standard salgsbetingelser for forbrukerkjøp av varer over Internett. Forbrukerkjøp over internett reguleres hovedsakelig av avtaleloven, forbrukerkjøpsloven, markedsføringsloven, angrerettloven og ehandelsloven, og disse lovene gir forbrukeren ufravikelige rettigheter. Lovene er tilgjengelig på www.lovdata.no. Vilkårene i denne avtalen skal ikke forstås som noen begrensning i de lovbestemte rettighetene, men oppstiller partenes viktigste rettigheter og plikter for handelen.\n").toUpperCase();

    const two_text = String("Avtalen består av disse salgsbetingelsene, opplysninger gitt på Plattformen og eventuelt særskilt avtalte vilkår. Ved eventuell motstrid mellom opplysningene, går det som særskilt er avtalt mellom partene foran, så fremt det ikke strider mot ufravikelig lovgivning. Avtalen vil i tillegg bli utfylt av relevante lovbestemmelser som regulerer kjøp av varer mellom næringsdrivende og forbrukere.").toUpperCase();

    const three_text = String("Selger : \n" +
        "Vedbjørn AS (via nettsiden vedbjorn.no), Org.nr 929.350.790\n" +
        "Forretningsadresse : Adalsveien 1B, 3185 Skoppum\n" +
        "E-post : stian@vedbjorn.no\n" +
        "Kjøper : \n" +
        "Den personen som abonnerer på tjeneste / kjøper produkter/tjenester fra nettsiden vedbjorn.no\n").toUpperCase();

    const four_text = String("Prisene, som er oppgitt på nettsiden, inkluderer merverdiavgift. Opplysninger om de totale kostnadene kjøperen skal betale, inklusive alle avgifter (merverdiavgift, toll, og lignende) og leveringskostnader (frakt, porto, fakturagebyr, emballasje med videre) samt spesifisering av de enkelte elementene i totalprisen, gis i Plattformen før bestilling er foretatt. (Vareleveranser til Svalbard eller Jan Mayen skal selges uten tillegg av merverdiavgift.").toUpperCase();

    const five_text = String("Avtalen er bindende for begge parter (der den ene part er Selger/Vedbjørn og den andre part er forbrukeren/kunden/brukeren av tjenesten) når kundens kjøps-ønske har resultert i at “Plattformen” har definert et leveranseoppdrag. “Plattformen” er satt opp slik at den vil forsøke å etablere leveranseoppdrag på en slik måte at kundene får 1 leveranse per uke, men Vedbjørn er ikke forpliktet til å opprettholde dette intervallet. Det er en knapp i Plattformen som kunden kan huke av eller på som definerer hvorvidt kundens kjøpsønske skal tas med i “Plattformens” beregninger. Man kan enkelt gå inn på nettsiden for å huke av denne knappen, og så lenge det ikke er et pågående leveranseoppdrag allerede så vil brukeren da ikke lenger ha noen kjøps-forpliktelser. En part er uansett ikke bundet av avtalen hvis det har forekommet skrive- eller tastefeil i tilbudet fra selgeren i bestillingsløsningen på nettsiden eller i kjøperens bestilling, og den annen part innså eller burde ha innsett at det forelå en slik feil.\n").toUpperCase();

    const six_text = String("Selgeren kan kreve betaling for varen fra det tidspunkt den har blitt levert til kundens adresse. En epost med bilde-bevis vil bli sendt til kundens e-post, som viser at leveransen er på plass. Kunden har 1 time på seg til å godkjenne leveransen fra Plattformen, etter dette anses leveransen som godkjent av kunden automatisk. Kunden til motta en betalingsanmodning fra Vipps. Dersom kunden velger å ikke godkjenne leveransen, er kunden pliktig å oppgi en plausibel begrunnelse for å komme bort fra betalingsforpliktelsen. Hva som anses som plausible grunner, oppgis på Plattformen. Kunden vil da ikke være pliktig å betale for varen, men er ansvarlig for at varen kan hentes fra selger der den ble levert, og i samme tilstand som da den ble levert. Kjøpere må være over 18 år eller ha tillatelse fra foresatte til å handle på Plattformen. Det er kjøpers eget ansvar å følge aldersgrensen praktisert av Plattformen og som er i tråd med lovverket ved forbrukerkjøp over internett.").toUpperCase();
    const seven_text = String("Når du som privatkunde handler og/eller abonnerer på ved-leveranse som en tjeneste, så skjer levering av enten Vedbjørn selv eller av ekstern tredjepart som har en leveranseavtale med Vedbjørn. Det er uansett Vedbjørn som tar ansvaret for at leveransen finner sted og som kunde skal du kun forholde deg til Vedbjørn. Vedbjørn leverer kun til adresser i Norge, og kun til brukere som har Vipps. Dette er av sikkerhetsmessige-, samt praktiske årsaker. Bestillinger leveres til den oppgitte leveringsadresse, forutsatt at adressen er tilgjengelig med lastet transportbil. Der snø eller vegstatus gjør fremkommelighet umulig, kan leveringen bli utsatt eller kansellert.\n" +
        "\n" +
        "Leveringstid vil variere som funksjon av hvor mange ved-forhandlere, transportører og kunder som befinner seg i nærheten av hverandre (samme kommune). Når leveranseoppdragene først kommer i gang, så kan man forvente en fortsettende leveransefrekvens på omtrent 1 uke, selv om Vedbjørn ikke er forpliktet å opprettholde dette intervallet. Leveringstidspunkt skal normalt skje mellom klokken 08:00 og 21:00. Hvilken dag i uken leveransene forekommer på, vil også kunne variere.\n").toUpperCase();
    const eight_text = String("Risikoen for varen går over på kjøper når hen, eller hens representant, har fått varene levert i tråd med punkt 6.").toUpperCase();
    const nine_text = String("Vi behandler dine personopplysninger i samsvar med Vedbjørns personvernerklæring.").toUpperCase();
    const ten_text = String("Vi ønsker at du skal være fornøyd! Dersom Produkter som leveres til deg og/eller Tjenester levert til deg ikke er tilfredsstillende, ber vi deg kontakte oss umiddelbart ved å sende en epost til support@vedbjorn.no. Når vi har mottatt klagen din, vil vi så snart som mulig undersøke saken og forsøke å finne en løsning i samsvar med gjeldende forbrukerlovgivning. Vedbjørn forbeholder seg retten til å bestemme hva som anses som en hensiktsmessig løsning i hver situasjon.").toUpperCase();
    const eleven_text = String("Du kan når som helst ombestemme deg uansett grunn og få tilbakebetaling for beløp betalt for fysiske varer innen 14 dager fra den dagen du mottok Produktet (\"Angrefrist\"). Din rett til å trekke deg fra kjøpet og motta tilbakebetaling forutsetter at produktet er i uendret stand, med originalinnpakning, og at forseglingen ikke er brutt. Kjøperen må gi selger melding om bruk av angreretten innen 14 dager etter at varen, de foreskrevne opplysninger om angreretten og angrerettsskjema er mottatt. Ved klage på fuktighet skal høyere fuktighet en 20% dokumenteres av kjøper, denne dokumentasjonen vedlegges returen av varen.\n" +
        "Siden kjøpstidspunktet sammenfaller med den fysiske leveransen og den fysiske leveransen er en del av bestillingen, så vil det naturligvis ikke være mulig å få refundert betalingen for leveranse-tjenesten. Kunden skal returnere varen for egen regning innen rimelig tid.\n" +
        "\n" +
        "Du kan returnere varer til oss når du :\n" +
        "Angrer kjøpet (innen angrefristen på 14 dager)\n" +
        "Om du har mottatt feil vare/antall i forhold til dine innstillinger for abonnementet\n" +
        "\n" +
        "Du kan ikke returnere varen til oss når :\n" +
        "Varen er tatt i bruk (kun ved evt reklamasjon). De vedsekker der forsegling/åpning på sekk er brutt. Varen er skadet (også fukt) av deg selv som kjøpende kunde.\n" +
        "\n" +
        "Kjøper er som tidligere nevnt selv ansvarlig for transportkostnader ved retur av varer. Tilbakebetaling av kjøpesummen vil finne sted innen fjorten dager etter at leverandør mottar returen og varen er godkjent mottatt i samme stand som da den ble sendt til kunden, på samme konto som ordren opprinnelig ble belastet fra via Vipps.\n" +
        "\n" +
        "Kjøper skal bruke følgende angrerettskjema : https://www.iko.no/file/angrerettsskjemabokmal.pdf\n" +
        "\n" +
        "Du kan lese mer om din angrerett, og hvilke produkter og tjenester som er unntatt fra nevnte rett på Forbrukerrådets nettsider.\n").toUpperCase();
    const twelve_text = String("Når kjøperen mottar varen, anbefales det at hen i rimelig utstrekning undersøker om den er i samsvar med bestillingen, om den har blitt skadet under transporten eller om den ellers har mangler, i tillegg til å se på bildet fra leveransen som har blitt sendt per e-post. Hvis varen ikke samsvarer med bestillingen eller har mangler, må kjøperen melde fra til selgeren ved reklamasjon jf. kontraktens punkt 11., og kan fra nettsiden velge å ikke godkjenne leveransen, samt unnlate å betale Vipps betalingsanmodningen. Føringene fra kapittel 11 gjelder, i så fall.").toUpperCase();
    const thirteen_text = String("Vedbjørn baserer seg på 40-liters sekker med 15 kilo ved som har maksimalt 20% fuktighet ihht Norsk Standard for ved - NS 4414").toUpperCase();
    const fourteen_text = String("Dersom det foreligger en mangel ved varen, må kjøperen innen rimelig tid etter at hen oppdaget den, gi selgeren melding om at hen vil påberope seg mangelen. Siden dette er snakk om ved levert i sekker, så skal kjøper dokumentere med bilder hva som er mangel. Merk: Dette er ikke det samme som angreretten. Siden det er snakk om ved, så må fristen være innen 7 dager etter mottak fra kjøper oppdaget mangelen.\n" +
        "Ved forsinkelse må krav rettes selger innen rimelig tid etter at leveringstiden er kommet og varen ikke er levert. Siden dette er snakk om ved som leveres der det er tilgjengelig tilkomme med bil/henger/varetransport, så må selger raskt – og innen 48 timer – dokumentere mangler. Dersom det har skjedd tyveri langs vei der varen er levert, så skal dette anmeldes til politiet før mangel ved leveringsantall blir krevet. Merk at tidspunkt for salg løper fra det tidspunkt e-post om neste fremtidige levering har blitt sendt til kjøper.\n").toUpperCase();
    const fifteen_text = String("Dersom selgeren ikke leverer varen eller leverer den for sent i henhold til avtalen mellom partene, og dette ikke skyldes kjøperen eller forhold på kjøperens side, kan kjøperen i henhold til reglene i forbrukerkjøpslovens kapittel 5 etter omstendighetene holde kjøpesummen tilbake, kreve oppfyllelse, heve avtalen og kreve erstatning fra selgeren. Dette gjelder ikke så lenge årsaken til forsinkelsen er dårlig vær (sterkt regn) eller snøfall, som gjør transport uegnet.\n" +
        "Oppfyllelse: Dersom selgeren ikke leverer varen på leveringstidspunktet, kan kjøperen fastholde kjøpet og sette en rimelig tilleggsfrist for oppfyllelse fra selgeren. Kjøperen kan likevel ikke kreve oppfyllelse dersom det foreligger en hindring som selgeren ikke kan overvinne eller dersom oppfyllelse vil medføre en så stor ulempe eller kostnad for selgeren at det står i vesentlig misforhold til kjøperens interesse i at selgeren oppfyller. Faller vanskene bort innen rimelig tid, kan forbrukeren kreve oppfyllelse.\n" +
        "Heving: Kjøperen kan heve avtalen med selgeren dersom forsinkelsen er vesentlig eller hvis selgeren ikke leverer varen innen den tilleggsfristen for oppfyllelse som kjøperen har fastsatt. Kjøperen kan likevel ikke heve avtalen mens tilleggsfristen løper, med mindre selgeren har sagt at hen ikke vil oppfylle innen fristen.\n" +
        "Erstatning: Kjøperen kan videre kreve erstatning for tap hen lider som følge av forsinkelsen fra selgerens side jf. forbrukerkjøpslovens § 24. Kjøperen må melde krav til selgeren ved reklamasjon jf. denne kontraktens punkt 11.\n").toUpperCase();
    const sixteen_text = String("Dersom varen har en mangel og dette ikke skyldes kjøperen eller forhold på kjøperens side, kan kjøperen i henhold til reglene i forbrukerkjøpsloven kapittel 6 etter omstendighetene holde kjøpesummen tilbake, velge mellom retting og omlevering, kreve prisavslag, kreve avtalen hevet og erstatning fra selgeren.\n" +
        "Retting eller omlevering: Dersom varen har en mangel, kan kjøperen kreve at selgeren retter mangelen eller omleverer tilsvarende vare. Selgeren kan motsette seg kjøperens krav dersom gjennomføringen av kravet er umulig eller volder selgeren urimelige kostnader. Selgeren skal foreta rettingen eller omleveringen innen rimelig tid. Retting eller omlevering skal foretas uten kostnad for kjøperen, uten risiko for at kjøperen ikke får dekket sine utlegg og uten vesentlig ulempe for kjøperen.\n" +
        "Selgeren kan ikke foreta mer enn to forsøk på retting eller omlevering for samme mangel, med mindre det foreligger særlige grunner som gjør at ytterligere forsøk er rimelig. Selv om kjøperen verken krever retting eller omlevering, kan selgeren tilby retting eller omlevering dersom dette skjer uten opphold. Dersom selgeren sørger for slik retting eller omlevering, kan kjøperen ikke kreve prisavslag eller heving.\n" +
        "Prisavslag: Dersom mangelen ikke rettes eller omleveres, kan kjøperen kreve forholdsmessig prisavslag.\n" +
        "Heving: I stedet for prisavslag kan kjøperen heve avtalen, unntatt når mangelen er uvesentlig.\n" +
        "Erstatning: Kjøperen kan også kreve erstatning for økonomisk tap hen lider som følge av at varen har en mangel jf. forbrukerkjøpslovens § 33. Kjøperen må melde krav til selgeren ved reklamasjon jf denne kontraktens punkt 11. Reglene om reklamasjon gjelder i tillegg til, og uavhengig av, reglene om angrerett og eventuelle garantier stilt av selger.\n").toUpperCase();
    const seventeen_text = String("Dersom kjøperen ikke betaler eller oppfyller de øvrige pliktene etter avtalen, og dette ikke skyldes selgeren eller forhold på selgerens side, kan selgeren i henhold til reglene i forbrukerkjøpsloven kapittel 9 etter omstendighetene holde varen tilbake, kreve oppfyllelse av avtalen, kreve avtalen hevet samt erstatning fra kjøperen. Selgeren kan også etter omstendighetene kunne kreve renter ved forsinket betaling, inkassogebyr og gebyr ved ikke-forskuddsbetalte uavhentede varer.\n" +
        "Oppfyllelse: Dersom kjøperen ikke betaler, kan selgeren fastholde kjøpet og kreve at kjøperen betaler kjøpesummen (oppfyllelse). Er varen ikke levert, taper selgeren sin rett dersom hen venter urimelig lenge med å fremme kravet.\n" +
        "Dersom kjøperen ikke betaler eller oppfyller de øvrige pliktene etter avtalen, og dette ikke skyldes selgeren eller forhold på selgerens side, kan selgeren i henhold til reglene i forbrukerkjøpsloven kapittel 9 etter omstendighetene holde varen tilbake, kreve oppfyllelse av avtalen, kreve avtalen hevet samt erstatning fra kjøperen. Selgeren kan også etter omstendighetene kunne kreve renter ved forsinket betaling, inkassogebyr og gebyr ved ikke-forskuddsbetalte uavhentede varer.\n" +
        "Erstatning: Selgeren kan kreve erstatning fra kjøperen for økonomisk tap hen lider som følge av kontraktsbrudd fra kjøperens side jf. forbrukerkjøpslovens § 46. Renter ved forsinket betaling/inkassogebyr: Dersom kjøperen ikke betaler kjøpesummen i henhold til avtalen, kan selgeren kreve renter av kjøpesummen etter lov om renter ved forsinket betaling. Ved manglende betaling kan kravet, etter forutgående varsel, bli sendt til inkasso, og kjøperen kan da bli holdt ansvarlig for gebyrer etter lov om inkassovirksomhet og annen inndrivning av forfalte pengekrav. Gebyr ved uavhentede ikke-forskuddsbetalte varer: Dersom kjøperen unnlater å hente ubetalte varer, kan selgeren belaste kjøper med et gebyr tilsvarende frakt tur/retur. Gebyret skal maksimalt dekke selgerens faktiske utlegg for å levere varen til kjøperen.\n").toUpperCase();
    const eighteen_text = String("Garanti som gis av selgeren eller produsenten, gir kjøperen rettigheter i tillegg til de rettighetene kjøperen allerede har etter ufravikelig lovgivning. En garanti innebærer dermed ingen begrensninger i kjøperens rett til reklamasjon og krav ved forsinkelse eller mangler etter punkt 15 og 16.").toUpperCase();
    const nineteen_text = String("Med mindre kjøperen samtykker til noe annet, kan selgeren kun innhente og lagre de personopplysninger som er nødvendig for at selgeren skal kunne gjennomføre forpliktelsene etter avtalen. Personopplysningene til kjøper under 15 år kan ikke innhentes med mindre selgeren har samtykke fra foreldre eller foresatte. Kjøperens personopplysninger skal kun utleveres til andre hvis det er nødvendig for at selgeren skal få gjennomført avtalen med kjøperen, eller i lovbestemte tilfelle. Selgeren kan kun innhente kjøperens personnummer dersom det er saklig behov for sikker identifisering og slik innhenting er nødvendig.\n" +
        "Hvis selgeren vil benytte kjøperens personopplysninger til andre formål, for eksempel til å sende kjøperen reklame eller informasjon ut over det som er nødvendig for å få gjennomført avtalen, må selgeren innhente kjøperens samtykke ved avtaleinngåelsen. Selgeren må gi kjøperen informasjon om hva personopplysningene skal brukes til og om hvem som skal bruke personopplysningene. Kjøperens samtykke må være frivillig og avgis ved en aktiv handling, for eksempel ved avkrysning.\n" +
        "Kjøperen skal enkelt kunne kontakte selgeren, for eksempel pr. e-post dersom hen har spørsmål om selgerens bruk av personopplysninger eller hvis hen ønsker at selgeren sletter eller endrer personopplysningene. Dette gjøres via e-post på support@vedbjorn.no.\n").toUpperCase();
    const twenty_text = String("Vedbjørn gir support gjennom dialog per epost til support@vedbjorn.no.\n").toUpperCase();
    const twentyone_text = String("Vedbjørn forbeholder seg retten til å si opp Tjenesten eller til å innstille bruken av Plattformen for kunder som bryter disse vilkårene. Slik oppsigelse skjer umiddelbart, og kunden varsles pr. e-post.").toUpperCase();
    const twentytwo_text = String("● Vedbjørn kan overføre sine rettigheter og forpliktelser i henhold til Vilkårene til en tredjepart, forutsatt at overtakende tredjepart kan forventes å oppfylle sine forpliktelser i henhold til vilkårene på en, fra kundens perspektiv, tilfredsstillende måte.\n" +
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
    const twentythree_text = String("Tvist om tolkningen eller anvendelsen av disse Vilkårene skal tolkes i samsvar med norsk lovgivning.\n" +
        "\n" +
        "Ved tvist mellom Vedbjørn og kunden skal partene som første skritt bestrebe seg på å løse tvisten ved avtale.\n").toUpperCase();

    return (
        <div>
            <h1 className={classes.header}>BETINGELSER OG VILKÅR</h1>
            <h3 className={classes.header2}>{introHeader}</h3>
            <p className={classes.paragraph}>{introText}</p>
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
            <h3 className={classes.header2}>6. BETALING</h3>
            <p className={classes.paragraph}>{six_text}</p>
            <h3 className={classes.header2}>7. LEVERING</h3>
            <p className={classes.paragraph}>{six_text}</p>
            <h3 className={classes.header2}>8. RISIKOEN FOR VAREN</h3>
            <p className={classes.paragraph}>{eight_text}</p>
            <h3 className={classes.header2}>9. BEHANDLING AV PERSONOPPLYSNINGER OG PERSONVERN</h3>
            <p className={classes.paragraph}>{nine_text}</p>
            <h3 className={classes.header2}>10. KLAGER OG TILBAKEMELDINGER</h3>
            <p className={classes.paragraph}>{ten_text}</p>
            <h3 className={classes.header2}>11. ANGRERETT</h3>
            <p className={classes.paragraph}>{eleven_text}</p>
            <h3 className={classes.header2}>12. UNDERSØKELSE AV VAREN</h3>
            <p className={classes.paragraph}>{twelve_text}</p>
            <h3 className={classes.header2}>13. VARENS INNHOLD</h3>
            <p className={classes.paragraph}>{thirteen_text}</p>
            <h3 className={classes.header2}>14. REKLAMASJON VED MANGEL OG FRIST FOR Å MELDE KRAV VED FORSINKELSE</h3>
            <p className={classes.paragraph}>{fourteen_text}</p>
            <h3 className={classes.header2}>15. KJØPERENS RETTIGHETER VED FORSINKELSE</h3>
            <p className={classes.paragraph}>{fifteen_text}</p>
            <h3 className={classes.header2}>16. KJØPERENS RETTIGHETER VED MANGEL</h3>
            <p className={classes.paragraph}>{sixteen_text}</p>
            <h3 className={classes.header2}>17. SELGERENS RETTIGHETER VED KJØPERENS MISLIGHOLD</h3>
            <p className={classes.paragraph}>{seventeen_text}</p>
            <h3 className={classes.header2}>18. GARANTI</h3>
            <p className={classes.paragraph}>{eighteen_text}</p>
            <h3 className={classes.header2}>19. PERSONOPPLYSNINGER</h3>
            <p className={classes.paragraph}>{nineteen_text}</p>
            <h3 className={classes.header2}>20. KUNDESERVICE</h3>
            <p className={classes.paragraph}>{twenty_text}</p>
            <h3 className={classes.header2}>21. VEDBJØRNS RETT TIL Å SI OPP BRUK AV PLATTFORMEN OG TJENESTEN</h3>
            <p className={classes.paragraph}>{twentyone_text}</p>
            <h3 className={classes.header2}>22. DIVERSE</h3>
            <p className={classes.paragraph}>{twentytwo_text}</p>
            <h3 className={classes.header2}>23. TVISTELØSNING</h3>
            <p className={classes.paragraph}>{twentythree_text}</p>

            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={goBack}>TILBAKE</button>
            </div>
        </div>
    );
};

export default TermsBuy;
