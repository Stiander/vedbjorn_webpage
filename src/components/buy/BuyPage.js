
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import MakeBuyRequest from "./MakeBuyRequest";
import BuyRequestStatus from "./BuyRequestStatus";
import {getBuyRequest} from "../../store/buy-http";
import {do_print} from "../../routes";
import {isObjEmpty} from "../../miscFuncs";

const BuyPage = () => {
    const dispatch = useDispatch();

    const [showMakeNewBuyRequest, setShowMakeNewBuyRequest] = useState(false);
    const [showStatusBuyRequest, setShowStatusBuyRequest] = useState(false);




    /*
    *
    * Borrowing from BuyRequestStatus.js
    *
    * */
    const [orderProcessing   , setOrderProcessing ]  = useState(false);
    const vipps_currentOrder = useSelector((state) => state.vipps.current_order_id);
    const payment            = useSelector((state) => state.delivery.paymentInfo);
    useEffect(() => {
        if(vipps_currentOrder) {
            if (do_print) {
                console.log('vipps_currentOrder = ', vipps_currentOrder);
            }
            setOrderProcessing(true);
        }
    }, [vipps_currentOrder]);
    useEffect(() => {
        if (!isObjEmpty(payment)) {
            const vipps_order_id = payment['vipps_order_id'];
            if (vipps_order_id) {
                if (do_print) {
                    console.log('payment[\'vipps_order_id\'] = ', payment['vipps_order_id']);
                }
                setOrderProcessing(true);
            }
        }
    } , [payment]);
    /*
    *
    *
    * */




    const has_a_buyrequest = useSelector((state) => state.buy.has_a_buyrequest);
    useEffect(() => {
        if (has_a_buyrequest === true) {
            setShowStatusBuyRequest(true);
            setShowMakeNewBuyRequest(false);
        } else {
            setShowStatusBuyRequest(false);
            setShowMakeNewBuyRequest(true);
        }
    } , [has_a_buyrequest])

    const email = useSelector((state) => state.user.name.email);
    useEffect(() => {
        const has_email = email !== '' && email !== undefined;
        if (has_email) {
            dispatch(getBuyRequest(email));
        }
    } , [email, dispatch]);

    return (
        <div>
            { showMakeNewBuyRequest && <MakeBuyRequest />}
            { showStatusBuyRequest && <BuyRequestStatus />}
        </div>
    );
};

export default BuyPage;
