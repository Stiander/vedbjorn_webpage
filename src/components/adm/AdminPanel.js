import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Prices from "./Prices";
import SendEmails from "./SendEmails";
import Season from "./Season";
import Card from "../UI/Card";
import classes from "./AdminPanel.module.css";

const AdminPanel = () => {

    const is_admin = useSelector((state) => state.adm.is_admin);
    const navigate = useNavigate();

    useEffect(() => {
        if(!is_admin) {
            navigate('/');
        }
    } , [is_admin]);

    const sendEmailsClicked = (event) => {
        navigate('/adm/sendemails');
    };

    const pricesClicked = (event) => {
        navigate('/adm/prices');
    };

    const seasonClicked = (event) => {
        navigate('/adm/season');
    };

    const attachmentsClicked = (event) => {
        navigate('/adm/attachments');
    };

    return (
        <div>
            <h1 className={classes.header}>ADMIN PANEL</h1>

            <Card>
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={sendEmailsClicked}>SEND EPOSTER</button>
                    <button className={classes.button_ok} onClick={pricesClicked}>PRISER</button>
                    <button className={classes.button_ok} onClick={seasonClicked}>SESONG</button>
                    <button className={classes.button_ok} onClick={attachmentsClicked}>BILAG</button>
                </div>
            </Card>

        </div>
    );
};

export default  AdminPanel;
