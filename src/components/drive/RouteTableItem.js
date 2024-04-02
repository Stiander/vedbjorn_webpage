
import classes from './RouteTableItem.module.css';

const RouteTableItem = (props) => {

    let cardClass;
    if (props.emphasize === true) {
        cardClass = classes.innercard_emphasize;
    } else {
        cardClass = classes.innercard;
    }

    const cardClicked = (event) => {
        props.cardClicked(props.visit.index);
    }

    return (
        <div className={cardClass} onClick={cardClicked}>
            <h1 className={classes.paragraph}>{props.visit.index} : {props.visit.type}</h1>
            <p className={classes.paragraph2}>LAST FØR BESØKET : {props.visit.loaded_before}</p>
            <p className={classes.paragraph2}>LAST ETTER BESØKET : {props.visit.loaded_after}</p>
            <p className={classes.paragraph2}>PERSON : {props.visit.person.name.toUpperCase()}</p>
            <p className={classes.paragraph2}>ADRESSE : {props.visit.address.toUpperCase()}</p>
        </div>
    );
};

export default RouteTableItem;
