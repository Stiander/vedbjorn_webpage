
import classes from './SellPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from 'react';
import SellStatus from "./SellStatus";
import MakeSellRequest from "./MakeSellRequest";
import {getSellRequest} from "../../store/sell-http";

const SellPageHotelMode = () => {
    const dispatch = useDispatch();
    const has_a_sell_request = useSelector((state) => state.sell.has_a_sellrequest);
    const [showMakeNewSellRequest, setShowMakeNewSellRequest] = useState(false);
    const [showStatusSellRequest, setShowStatusSellRequest] = useState(false);

    useEffect(() => {
        if (has_a_sell_request === true) {
            setShowStatusSellRequest(true);
            setShowMakeNewSellRequest(false);
        } else {
            setShowStatusSellRequest(false);
            setShowMakeNewSellRequest(true);
        }
    } , [has_a_sell_request]);

    const email = useSelector((state) => state.user.name.email);
    useEffect(() => {
        const has_email = email !== '' && email !== undefined;
        if (has_email) {
            dispatch(getSellRequest(email));
        }
    } , [email, dispatch]);

    return (
        <div>
            <div>
                { showMakeNewSellRequest && <MakeSellRequest />}
                { showStatusSellRequest && <SellStatus />}
            </div>
        </div>
    );
};

export default SellPageHotelMode;
