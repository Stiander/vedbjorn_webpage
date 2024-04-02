
import classes from  './SellHistory.module.css';
import Card from "../UI/Card";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPrevSales} from "../../store/sell-http";
import SellHistoryItem from "./SellHistoryItem";

const SellHistory = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const old_sales    = useSelector((state) => state.sell.completed_sells);
    const seller_email = useSelector((state) => state.sell.email);

    useEffect(() => {
        if(seller_email !== '') {
            dispatch(getPrevSales(seller_email));
        }
    } , [dispatch, seller_email]);

    const backClicked = (event) => {
        navigate('/sell');
    };

    return (
        <div>
            <h1 className={classes.header}>SALGS-HISTORIKK</h1>
            <Card>
                {
                    old_sales.map((sell, index) => (
                        <SellHistoryItem
                            key={index}
                            sell={sell}
                        />
                    ))
                }
            </Card>
            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={backClicked}>TILBAKE</button>
            </div>
        </div>
    );
};

export default SellHistory;
