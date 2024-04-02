import React from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import classes from './InfoModal.module.css';
import InfoCard from "./InfoCard";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
    return (
        <InfoCard className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <p>{props.message}</p>
            </div>
            <footer className={classes.actions}>
                <Button onClick={props.onConfirm}>OK</Button>
            </footer>
        </InfoCard>
    );
};

const InfoModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onClickedOutside} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    );
};

export default InfoModal;
