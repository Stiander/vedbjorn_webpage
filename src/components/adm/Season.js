
import classes from "./AdminPanel.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import React from "react";
import {postSetIsInSeason} from "../../store/adm-http";
import Card from "../UI/Card";
import {useNavigate} from "react-router-dom";

const Season = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const is_in_season = useSelector((state) => state.adm.is_in_season);
    const [updatedState, setUpdatedState] = useState(is_in_season);
    const [showUpdateButton, setShowUpdateButton] = useState(false);

    const updateSeason = (event) => {
        dispatch(postSetIsInSeason(updatedState));
    };

    const seasonStateChanged = (event) => {
        setUpdatedState(!updatedState);
    };

    useEffect(() => {
        setShowUpdateButton(is_in_season !== updatedState);
    }, [is_in_season, updatedState]);

    const backClicked = (event) => {
        navigate('/adm');
    };

    return (
        <Card>
            <h1 className={classes.header}>SESONG</h1>
            <button className={classes.button_ok_small} onClick={backClicked}>TILBAKE</button>
            <div>
                <input
                    className={classes.checkbox}
                    type='checkbox'
                    checked={updatedState}
                    onChange={seasonStateChanged}
                />
            </div>
            {showUpdateButton &&
                <div className={classes.buttons}>
                    <button className={classes.button_ok} onClick={updateSeason}>OPPDATER</button>
                </div>
            }
        </Card>
    );
};

export default Season;
