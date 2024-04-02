import classes from "./MakeSellRequest.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Card from "../UI/Card";
import {useEffect} from "react";
import {load_company} from "../../store/brreg-http";
import {brregActions} from "../../store/brreg-slice";

const SellMainPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const has_company = useSelector((state) => state.brreg.ok_loaded);

    useEffect(() => {
        dispatch(load_company());
    } , [dispatch]);

    const businessClicked = () => {
        dispatch(brregActions.set_business_back_page('/sell'));
        navigate('/mybusiness');
    };

    const sellHotelModeClicked = () => {
        navigate('/sellhotelmode');
    };

    const sellLargeAmountClicked = () => {
        navigate('/selllargeamounts');
    };

    return (
        <div>
            <h1 className={classes.header}>SELGE VED</h1>

            <p className={classes.paragraph}>DET ER ENKELT Å SELGE VED MED VEDBJØRN ENTEN DU ØNSKER Å SELGE
                ET STØRRE KVANTUM ELLER DU HAR FERDIGE SEKKER MED VED SOM KAN HENTES OG LEVERES DIREKTE TIL
                SLUTTBRUKER
            </p>

            <p className={classes.paragraph}>
                ETTER AT DU HAR LAGT INN VIRKSOMHETEN DIN SÅ KAN DU VELGE HVORDAN DU VIL SELGE. DET ER VEDBJØRN SOM
                KJØPER VEDEN DIN. NÅR DU HAR GJORT ET SALG SÅ VIL VEDBJØRN LAGE EN REGNING PÅ VEGNE AV DEG OG SENDE TIL
                SEG SELV SAMT EN KOPI TIL DEG. DENNE REGNINGEN BETALER VI MED EN GANG OG SÅ HAR DU PENGENE PÅ KONTOEN DIN.
                REGNINGEN KAN BOKFØRES SOM ET BILAG PÅ DIREKTEN.
            </p>

            <p className={classes.paragraph}>
                ENKLERE BLIR DET IKKE.
            </p>

            <Card>
                {!has_company &&
                    <p className={classes.paragraph}>
                        DU MÅ OPPGI NOEN OPPLYSNINGER OM VIRKSOMHETEN DIN FØR DU KAN BEGYNNE Å SELGE.
                        DET GJØR DU VED Å TRYKKE PÅ KNAPPEN NEDENFOR
                    </p>
                }
                <div className={classes.ctrl_buttons}>
                    <button className={classes.button_ok} onClick={businessClicked}>VIRKSOMHETEN MIN</button>

                    {has_company &&
                        <div>
                            <button className={classes.button_ok} onClick={sellHotelModeClicked}>SELGE VED-SEKKER</button>
                            <br/>
                            <button className={classes.button_ok} onClick={sellLargeAmountClicked}>SELGE VED-LASS</button>
                        </div>
                    }
                </div>
            </Card>
        </div>
    );
};

export default SellMainPage;
