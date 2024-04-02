
import classes from './RouteTable.module.css';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Card from "../UI/Card";
import RouteTableItem from "./RouteTableItem";
import {AiOutlinePlusSquare , AiOutlineMinusSquare} from "react-icons/ai";

const RouteTable = (props) => {
    const [visits, setVisits] = useState([]);
    const [showFullList, setShowFullList] = useState(true);

    const route = useSelector((state) => state.route.route);
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
                if (travel['type'] === 'pickup') {
                    vst['type'] = 'HENTE';
                    vst['person'] = {
                        'name': travel['sellRequest']['name'],
                        'email': travel['sellRequest']['email']
                    }
                } else {
                    vst['type'] = 'LEVERE';
                    vst['person'] = {
                        'name': travel['buyRequest']['name'],
                        'email': travel['buyRequest']['email']
                    }
                }
                return vst
            });
            setVisits(vsts);
        }
    } , [route]);

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
        if (visits.length > 0) {
            tableShow = visits.map((visit, index) => (
                <RouteTableItem
                    key={index}
                    visit={visit}
                    emphasize={(index + 1) === props.currentIndex}
                    cardClicked={cardClicked}
                />
            ))
        } else {
            tableShow = <h1 className={classes.header2}>TOM LISTE</h1>
        }
    } else {
        if (visits.length > 0) {
            tableShow = <RouteTableItem
                visit={visits[props.currentIndex - 1]}
                emphasize={false}
                cardClicked={cardClicked}
            />
        } else {
            tableShow = <h1 className={classes.header2}>TOM LISTE</h1>
        }
    }



    return (
        <Card>
            <div className={classes.gridcontainer}>
                <h1 className={classes.gridmid}>RUTEBESKRIVELSE</h1>
                {showFullList && <AiOutlineMinusSquare className={classes.gridleft} onClick={minimizeClicked}></AiOutlineMinusSquare> }
                {!showFullList && <AiOutlinePlusSquare className={classes.gridleft} onClick={expandClicked}></AiOutlinePlusSquare> }
            </div>
            {tableShow}
        </Card>
    );
};

export default RouteTable;
