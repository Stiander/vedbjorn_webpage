
import {do_print} from "../../routes";

import classes from './NewDeals.module.css';
import Card from "../UI/Card";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import NewDealItem from "./NewDealItem";
import {useEffect, useState} from "react";
import {getSellRequestNewDeals} from "../../store/sell-http";
import {connectSocketIo} from "../streaming/socket";
import sign from "jwt-encode";
import store from "../../store";

const NewDeals = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const new_deals = useSelector((state) => state.sell.new_deals);

    const backClicked = (event) => {
        navigate('/sell');
    };

    const cardClicked = (index) => {
        if (do_print) {
            console.log(index);
        }
    };

    useEffect(() => {
        if (new_deals.length <= 0) {
            navigate('/sell');
        }
    } , [new_deals, navigate]);

    const [hasNewDeals, setHasNewDeals] = useState(false);
    const seller_email = useSelector((state) => state.sell.email);
    useEffect(() => {
        if(!seller_email) {
            return;
        }
        dispatch(getSellRequestNewDeals(seller_email));
        let socket;
        socket = connectSocketIo(sign({
            phone : store.getState().user.name['phone'] ,
            email : store.getState().user.name['email'] ,
            access_token : store.getState().vipps.access_token
        } , process.env.REACT_APP_JWT_SECRET , {
            alg: "HS256",
            typ: "JWT"
        }), {
            email : seller_email
        });

        if (do_print) {
            console.log('SOCKET.IO -> NewDeals :: getnewdeals');
        }

        socket.emit('getnewdeals');
        socket.on('getnewdeals', (num) => {
            if( (!hasNewDeals && num > 0) || (hasNewDeals && num <= 0) ) {
                dispatch(getSellRequestNewDeals(seller_email));
            }
        });
        socket.on('connect' , () => {
            if (do_print) {
                console.log('Connected to socket.io');
            }
        });

        socket.on('disconnect' , () => {
            if (do_print) {
                console.log('Disconnected from socket.io');
            }
        });

        return () => socket.disconnect();
    } , [seller_email, dispatch, hasNewDeals]);

    useEffect(() => {
        if(new_deals.length > 0) {
            setHasNewDeals(true);
        } else {
            setHasNewDeals(false);
        }
    } , [new_deals]);

    return (
        <div>
            <h1 className={classes.header}>NYE OPPDRAG</h1>
            <Card>
                { new_deals.map((deal, index) => (
                    <NewDealItem
                        key={index}
                        index={index}
                        deal={deal}
                        cardClicked={cardClicked}
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

export default NewDeals;
