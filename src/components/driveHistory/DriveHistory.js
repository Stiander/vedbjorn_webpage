import classes from './DriveHistory.module.css';
import {useEffect} from "react";
import {getOldCompletedAssignments} from "../../store/drive-http";
import {useDispatch, useSelector} from "react-redux";
import DriveHistoryItem from "./DriveHistoryItem";
import Card from "../UI/Card";
import {useNavigate} from "react-router-dom";

const DriveHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const driverName = useSelector((state) => state.drive.name);

    useEffect(() => {
        if (driverName !== '') {
            dispatch(getOldCompletedAssignments(driverName));
        }
    }, [dispatch, driverName]);

    const old_routes = useSelector((state) => state.route.completed_routes);

    const cardClicked = (index) => {

    };

    const backClicked = (event) => {
        navigate('/drive');
    };

    return (
        <div>
            <h1 className={classes.header}>OPPDRAGS-HISTORIKK</h1>
            <Card>
                {
                    old_routes.map((assignment, index) => (
                        <DriveHistoryItem
                            key={index}
                            index={index}
                            assignment={assignment}
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

export default DriveHistory;
