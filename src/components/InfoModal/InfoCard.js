import React from 'react';

import classes from './InfoCard.module.css';

const InfoCard = (props) => {
    return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default InfoCard;
