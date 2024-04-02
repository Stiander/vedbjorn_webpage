import React from "react";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import ErrorModal from "../ErrorModal/ErrorModal";
import InfoModal from "../InfoModal/InfoModal";
import {errorActions} from "../../store/error-slice";
import {useDispatch, useSelector} from "react-redux";
import {infoActions} from "../../store/info-slice";
import store from "../../store";

const Wrapper = props => {
    return props.children;
};

const Layout = (props) => {
    const dispatch = useDispatch();
    const errorObj = useSelector((state) => state.error.error);
    const errorTitle = errorObj.title;
    const errorMessage = errorObj.message;

    const errorConfirmHandler = () => {
        dispatch(errorActions.clearError());
    };


    const infoObj = useSelector((state) => state.info.information);
    const infoTitle = infoObj.title;
    const infoMessage = infoObj.message;

    const infoConfirmHandler = () => {
        dispatch(infoActions.clearInformation());
        const purpose = store.getState().info.purpose
        if (purpose !== '') {
            dispatch(infoActions.setConfirmed(true));
        }
    };

    const onClickedOutside = () => {
        dispatch(infoActions.clearInformation());
        const purpose = store.getState().info.purpose
        if (purpose !== '') {
            dispatch(infoActions.setConfirmed(false));
        }
    };

    return (
        <Wrapper>
            { (errorObj && errorTitle && errorMessage) && <ErrorModal
                title={errorObj.title}
                message={errorObj.message}
                onConfirm={errorConfirmHandler}
            />}

            { (infoObj && infoTitle && infoMessage) && <InfoModal
                title={infoObj.title}
                message={infoObj.message}
                onConfirm={infoConfirmHandler}
                onClickedOutside={onClickedOutside}
            />}

            <MainNavigation />
            <main>{props.children}</main>
            {/*<Footer/>*/}
        </Wrapper>
    );
};

export default Layout;
