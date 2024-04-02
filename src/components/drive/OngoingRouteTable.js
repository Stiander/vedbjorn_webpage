
import classes from './OngoingRouteTable.module.css';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Card from "../UI/Card";
import OngoingRouteTableItem from "./OngoingRouteTableItem";
import {AiOutlinePlusSquare , AiOutlineMinusSquare} from "react-icons/ai";

const OngoingRouteTable = (props) => {
    const [visits, setVisits] = useState([]);
    const [showFullList, setShowFullList] = useState(true);

    const route = useSelector((state) => state.route.ongoingRoute);
    useEffect(() => {
        if (route !== null && 'route' in route) {
            const vsts = route['route'].map((travel, index) => {
                let vst = {
                    'key': index,
                    'loaded_before': travel['loaded_before'],
                    'loaded_after': travel['loaded_after'],
                    'index': index + 1,
                    'address': travel['to']['display_name']
                }
                if ('visited_status' in travel) {
                    vst['visited_status'] = travel['visited_status'];
                }
                if ('status' in travel) {
                    vst['status'] = travel['status'];
                }
                if (travel['type'] === 'pickup') {
                    const bagStr = String(travel['loaded_after'] - travel['loaded_before']) + " SEKKER (" +
                        String(travel['loaded_after']) + ' - ' + String(travel['loaded_before']) + ")";
                    vst['bagStr'] = bagStr;
                    if (vst['visited_status'] === 'completed') {
                        vst['type'] = 'HENTE (FERDIG)';
                    } else if('status' in travel && travel['status'] === 'withdrawn') {
                        vst['type'] = 'KANSELLERT HENTING';
                        vst['bagStr'] = '';
                    } else {
                        vst['type'] = 'HENTE';
                    }
                    vst['person'] = {
                        'name': travel['sellRequest']['name'],
                        'email': travel['sellRequest']['email']
                    }
                } else if ((travel['type'] === 'delivery')) {
                    const bagStr = String(travel['loaded_before'] - travel['loaded_after']) + " SEKKER (" +
                        String(travel['loaded_before']) + ' - ' + String(travel['loaded_after']) + ")";
                    vst['bagStr'] = bagStr;
                    if ('visited_status' in vst && vst['visited_status'] === 'completed') {
                        vst['type'] = 'LEVERE (FERDIG)';
                    }
                    else if('status' in travel && travel['status'] === 'withdrawn') {
                        vst['type'] = 'KANSELLERT LEVERANSE';
                        vst['bagStr'] = '';
                    }
                    else {
                        vst['type'] = 'LEVERE';
                    }
                    vst['person'] = {
                        'name': travel['buyRequest']['name'],
                        'email': travel['buyRequest']['email']
                    }
                } else if(travel['type'] === 'return') {
                    vst['bagStr'] = String(travel['return_amount']) + " SEKKER";
                    if (vst['visited_status'] === 'completed') {
                        vst['type'] = 'RETURNERE (FERDIG)';
                    } else if('status' in travel && travel['status'] === 'withdrawn') {
                        vst['type'] = 'KANSELLERT RETURNERING';
                        vst['bagStr'] = '';
                    } else {
                        vst['type'] = 'RETURNERE';
                    }
                    vst['person'] = {
                        'name': travel['sellRequest']['name'],
                        'email': travel['sellRequest']['email']
                    }
                }
                return vst
            });
            setVisits(vsts);
        }
    } , [route]);


    const [buttonText, setButtonText] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [buttonClass, setButtonClass] = useState(classes.button_ok);
    useEffect(() => {
        if(!visits[props.currentIndex - 1]) {
            return;
        }
        if (visits[props.currentIndex - 1]['type'] === 'LEVERE' || visits[props.currentIndex - 1]['type'] === 'LEVERE (FERDIG)'
        ) {
            setButtonEnabled(true);
            setButtonClass(classes.button_ok);
            if ('visited_status' in visits[props.currentIndex - 1] && visits[props.currentIndex - 1]['visited_status'] === 'completed') {
                setButtonText(props.currentIndex.toString() + ' : FERDIG LEVERT! KLIKK FOR Å SE');
            } else {
                setButtonText(props.currentIndex.toString() + ' : LEVER VED HER');
            }
        } else if (visits[props.currentIndex - 1]['status'] === 'withdrawn') {
            setButtonText(props.currentIndex.toString() + ' : KANSELLERT');
            setButtonEnabled(false);
            setButtonClass(classes.button_disabled);
        } else if (visits[props.currentIndex - 1]['type'] === 'RETURNERE' || visits[props.currentIndex - 1]['type'] === 'RETURNERE (FERDIG)' ||
            visits[props.currentIndex - 1]['type'] === 'KANSELLERT RETURNERING'
        ) {
            setButtonEnabled(true);
            setButtonClass(classes.button_ok);
            if ('visited_status' in visits[props.currentIndex - 1] && visits[props.currentIndex - 1]['visited_status'] === 'completed') {
                setButtonText(props.currentIndex.toString() + ' : FERDIG LEVERT! KLIKK FOR Å SE');
            } else {
                setButtonText(props.currentIndex.toString() + ' : RETURNER VED HER');
            }
        } else {
            setButtonEnabled(true);
            setButtonClass(classes.button_ok);
            if ('visited_status' in visits[props.currentIndex - 1] && visits[props.currentIndex - 1]['visited_status'] === 'completed') {
                setButtonText(props.currentIndex.toString() + ' : FERDIG HENTET! KLIKK FOR Å SE');
            } else {
                setButtonText(props.currentIndex.toString() + ' : HENT VED HER');
            }
        }
    } , [props.currentIndex, visits]);

    const cardClicked = (index) => {
        props.currentIndexFromTable(index);
    };

    const minimizeClicked = (event) => {
        setShowFullList(false);
    };
    const expandClicked = (event) => {
        setShowFullList(true);
    };
    let tableShow;
    if(showFullList) {
        tableShow = visits.map((visit , index) => (
            <OngoingRouteTableItem
                key={index}
                visit={visit}
                emphasize={(index + 1) === props.currentIndex}
                cardClicked={cardClicked}
            />
        ))
    } else {
        tableShow = <OngoingRouteTableItem
            visit={visits[props.currentIndex - 1]}
            emphasize={false}
            cardClicked={cardClicked}
        />
    }

    const visitClicked = (event) => {
        props.visitClicked();
    };

    return (
        <Card>
            <div className={classes.gridcontainer}>
                <div className={classes.gridmid}>
                    <button className={buttonClass} onClick={visitClicked} disabled={!buttonEnabled}>{buttonText}</button>
                </div>
                {showFullList && <AiOutlineMinusSquare className={classes.gridleft} onClick={minimizeClicked}></AiOutlineMinusSquare> }
                {!showFullList && <AiOutlinePlusSquare className={classes.gridleft} onClick={expandClicked}></AiOutlinePlusSquare> }
            </div>
            {tableShow}
        </Card>
    );
};

export default OngoingRouteTable;
