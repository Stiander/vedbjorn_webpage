
import classes from './TermsAndConditions.module.css';
import Card from "../../components/UI/Card";
import {useNavigate} from "react-router-dom";

const TermsMenu = () => {

    const navigate = useNavigate();

    const viewBuyerTerms = (event) => {
        navigate('/terms/buy');
    };

    const viewSellTerms = (event) => {
        navigate('/terms/sell');
    };

    const viewDriverTerms = (event) => {
        navigate('/terms/drive');
    };

    return (
        <div>
            <h1 className={classes.header}>BETINGELSER OG VILKÅR</h1>
            <Card>
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={viewBuyerTerms}>KJØP</button>
                    <button className={classes.button_ok} onClick={viewSellTerms}>SALG</button>
                    <button className={classes.button_ok} onClick={viewDriverTerms}>LEVERANSE</button>
                </div>
            </Card>
        </div>
    );
};

export default TermsMenu;
