import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classes from "./AdminPanel.module.css";
import {getPrices, setPrices} from "../../store/adm-http";
import React from "react";
import {infoActions} from "../../store/info-slice";
import Card from "../UI/Card";

const Prices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const prices = useSelector((state) => state.adm.prices);
    const [updatedPrices, setUpdatedPrices] = useState([]);

    useEffect(() => {
        dispatch(getPrices());
    }, []);

    useEffect(() => {
        if(prices.length > 0) {
            setUpdatedPrices(prices);
        }
    }, [prices]);

    const priceChanged = (event) => {
        const updatedPrice = event.target.value;
        const id = String(event.target.id);
        const county = id.split('_').at(0);
        const product = id.split('_').at(1);
        const updatedList = updatedPrices.map(item => {
            if(item.county === county && item.product === product) {
                return {
                    county : county ,
                    price : Number(updatedPrice) ,
                    product : product
                }
            } else {
                return item;
            }
        });
        // console.log('updatedList : ' , updatedList);
        setUpdatedPrices(updatedList);
    };

    const updatePrices = () => {
        dispatch(setPrices(updatedPrices));
        dispatch(infoActions.setPurpose(''));
        dispatch(infoActions.setInformation({
            title : 'PRIS-OPPDATERING' ,
            message : 'Du har oppdatert prisene for ved. Merk at dette ikke tar effekt før ved neste oppdrag '
        }));
    };

    const backClicked = (event) => {
        navigate('/adm');
    };

    return (
        <Card>
            <h1 className={classes.header3}>PRISER</h1>
            <button className={classes.button_ok_small} onClick={backClicked}>TILBAKE</button>
            <ul className={classes.centeredlist}>
                {updatedPrices.map((item, index) => (
                    <li key={index}>

                        <div>
                            <p>{item['county']}</p>
                            <input
                                className={classes.input}
                                type='number' id={item['county'] + '_' + item['product']}
                                defaultValue={item['price']}
                                onChange={priceChanged}
                            />
                            <label className={classes.label}> KR. A {item['product']}</label>
                        </div>
                    </li>
                ))}
            </ul>

            <div className={classes.buttons}>
                <button className={classes.button_ok} onClick={updatePrices}>OPPDATER PRISER</button>
            </div>
        </Card>
    );
};

export default  Prices;
