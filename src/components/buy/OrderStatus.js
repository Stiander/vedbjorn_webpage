
import {do_print} from "../../routes";

import classes from './BuyRequestStatus.module.css';
import {useDispatch, useSelector} from "react-redux";
import Card from "../UI/Card";
import {useEffect, useState} from "react";
import {connectSocketIo} from "../streaming/socket";
import sign from "jwt-encode";
import store from "../../store";
import {cancel_initiated_vipps_sequence} from "../../store/vipps-http";
import {vippsActions} from "../../store/vipps-slice";
import {isObjEmpty} from "../../miscFuncs";

const OrderStatus = (props) => {

    const dispatch = useDispatch();

    const vipps_currentOrder = useSelector((state) => state.vipps.current_order_id);
    const payment            = useSelector((state) => state.delivery.paymentInfo);
    const vipps_paylink      = useSelector((state) => state.vipps.paylink);

    const [status      , setStatus     ] = useState('IKKE BETALT');
    const [amount      , setAmount     ] = useState(0);
    const [msg         , setMsg        ] = useState('');
    const [orderNr     , setOrderNr    ] = useState('');
    const [isCancelled , setIsCancelled] = useState(false);
    const [isPaid      , setIsPaid     ] = useState(false);
    const [statusStyle , setStatusStyle] = useState(classes.header3);

    useEffect( () => {
        if (vipps_paylink) {
            window.open(vipps_paylink);
            dispatch(vippsActions.setPayLink(""));
        }
    }, [vipps_paylink, dispatch]);

    useEffect(() => {
        if (!isObjEmpty(payment)) {
            if (payment['status'] === 'vipps_failed') {
                setStatus('VIPPS FEILET');
                setStatusStyle(classes.header3_err);
            }
            setAmount(payment['amount_NOK']);
            setMsg(String(payment['message_to_payer']).toUpperCase());
            if (!vipps_currentOrder) {
                setOrderNr(payment['vipps_order_id']);
            }

            //console.log('PAYMENT : ' , payment);

        }
        if (vipps_currentOrder) {
            setOrderNr(vipps_currentOrder);
        }
    } , [payment , vipps_currentOrder]);

    // useEffect(() => {
    //     if (!payment) {
    //         return
    //     }
    //     let socket;
    //     if(socket) {
    //         socket.disconnect();
    //     }
    //
    //     socket = connectSocketIo(sign({
    //             phone : store.getState().vipps.user.phone_number ,
    //             email : store.getState().user.name['email'] ,
    //             access_token : store.getState().vipps.access_token
    //         } , process.env.REACT_APP_JWT_SECRET , {
    //             alg: "HS256",
    //             typ: "JWT"
    //         }), {
    //         email : payment['paying_user_email'] ,
    //         payment_id : payment['mongodb_id']
    //     });
    //     if (do_print) {
    //         console.log('SOCKET.IO -> Messages :: current_payment_changes');
    //     }
    //     socket.emit('current_payment_changes');
    //     socket.on('current_payment_changes', (msg) => {
    //         if (do_print) {
    //             console.log('current_payment_changes = ', msg);
    //         }
    //         if (msg === 'cancelled') {
    //             setIsCancelled(true);
    //             setStatus('VIPPS AVBRUTT');
    //             setStatusStyle(classes.header3_err);
    //         } else if (msg === 'paid') {
    //             setIsPaid(true);
    //             setStatus('VIPPS BETALING GJENNOMFØRT');
    //             setStatusStyle(classes.header3);
    //         }
    //     });
    //     socket.on('connect' , () => {
    //         if (do_print) {
    //             console.log('Messages :: Connected to socket.io');
    //         }
    //     });
    //     socket.on('disconnect' , () => {
    //         if (do_print) {
    //             console.log('Messages :: Disconnected from socket.io');
    //         }
    //     });
    //     return () => socket.disconnect();
    // } , [payment]);

    const restartClicked = () => {
        dispatch(cancel_initiated_vipps_sequence(orderNr, true));
    };

    const cancelClicked = () => {
        dispatch(cancel_initiated_vipps_sequence(orderNr));
    };

    const finishedClicked = () => {
        props.paymentCompleted();
    };

    return (
        <Card>
            <div className={classes.centralize}>
                <h1 className={classes.header}>BETALINGS-STATUS</h1>
                <p className={classes.paragraph}>ORDRE NR. : {orderNr}</p>
                <p className={classes.paragraph}>BESKJED : {msg}</p>
                <h1 className={classes.header3}>BELØP : {amount} KR.</h1>
                <h1 className={statusStyle}>{status}</h1>


                <div className={classes.centralize}>
                    <div className={classes.buttons}>

                        {!isPaid &&
                            <button className={classes.button_cancel} onClick={restartClicked}>START BETALING PÅ NYTT</button>
                        }

                        {!isPaid && !isCancelled &&
                            <button className={classes.button_cancel} onClick={cancelClicked}>AVBRYT BETALINGEN</button>
                        }

                        {isPaid &&
                            <button className={classes.button_ok} onClick={finishedClicked}>FERDIG</button>
                        }

                    </div>
                </div>
            </div>
        </Card>
    )
};

export default OrderStatus;
