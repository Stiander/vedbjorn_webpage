
import classes from './NewDeals.module.css';
import Card from "../UI/Card";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import OngoingDealsItem from "./OngoingDealsItem";

const OngoingDeals = () => {
    const navigate = useNavigate();

    const backClicked = (event) => {
        navigate('/sell');
    };

    const ongoing_deals = useSelector((state) => state.sell.ongoing_deals);
    useEffect(() => {
        if (ongoing_deals.length <= 0) {
            navigate('/sell');
        }
    } , [ongoing_deals, navigate]);

    return (
        <div>
            <h1 className={classes.header}>PÅGÅENDE SALGSPROSESSER</h1>
            <Card>
                { ongoing_deals.map((deal, index) => (
                    <OngoingDealsItem
                        key={index}
                        deal={deal}
                    />
                ))}
            </Card>
            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={backClicked}>TILBAKE</button>
            </div>
        </div>
    );
};

export default OngoingDeals;
