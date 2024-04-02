import React, {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import classes from './MainNavigation.module.css'
import { ImMenu } from 'react-icons/im';
import {useSelector} from "react-redux";


const MainNavigation = () => {

    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isSmallScreen , setIsSmallScreen] = useState(false);

    const [is_logged_in , setIsLoggedIn] = useState(false);
    const email = useSelector((state) => state.user.name.email);

    const has_a_buyrequest = useSelector((state) => state.buy.has_a_buyrequest);
    const has_a_sellrequest = useSelector((state) => state.sell.has_a_sellrequest);

    const is_admin = useSelector((state) => state.adm.is_admin);

    useEffect(() => {
        const has_email = email !== '' && email !== undefined;
        setIsLoggedIn(has_email);
    } , [email]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1400px)");
        //mediaQuery.addEventListener('resize' , handleMediaQueryChange, false); // TODO : Figure out why this doesnt work
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            //mediaQuery.removeEventListener('resize' , handleMediaQueryChange, false); // TODO : Figure out why this doesnt work
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
        setIsNavVisible(false);
    };

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    const closeMenyIfMobile = () => {
        const mediaQuery = window.matchMedia("(max-width: 1400px)");
        if (mediaQuery.matches) {
            setIsNavVisible(false);
        }
    };

    const buyinfoClicked = (event) => {
        closeMenyIfMobile();
    };

    const sellinfoClicked = (event) => {
        closeMenyIfMobile();
    };

    const driveinfoClicked = (event) => {
        closeMenyIfMobile();
    };

    const authClicked = (event) => {
        closeMenyIfMobile();
    };

    const aboutClicked = (event) => {
        closeMenyIfMobile();
    };

    const messagesClicked = (event) => {
        closeMenyIfMobile();
    };

    const termsClicked = (event) => {
        closeMenyIfMobile();
    };

    const admClicked = (event) => {
        closeMenyIfMobile();
    };

    const [showExistingProfile , setShowExistingProfile] = useState();

    const existing_email = useSelector((state) => state.user.name.email);
    useEffect(() => {
        if (existing_email !== '') {
            setShowExistingProfile(true);
        } else {
            setShowExistingProfile(false);
        }
    } , [existing_email]);

    return (
        <header className={classes.header}>
            <NavLink to='/'>
                <img src={require("../../assets/bear_less_padded.png")} className={classes.logo} />
            </NavLink >

            { (isNavVisible || !isSmallScreen) && (
            <nav>

                {!is_logged_in && <NavLink onClick={buyinfoClicked} className={classes.header_av_item} to='/buyinfo'>KJØPE</NavLink> }
                {!is_logged_in && <NavLink onClick={sellinfoClicked}  className={classes.header_av_item} to='/sellinfo'>SELGE</NavLink > }
                {!is_logged_in && <NavLink onClick={driveinfoClicked}  className={classes.header_av_item} to='/driveinfo'>LEVERE</NavLink > }

                {(is_logged_in && !has_a_sellrequest) && <NavLink onClick={buyinfoClicked} className={classes.header_av_item} to='/buy'>KJØPE</NavLink> }
                {(is_logged_in && !has_a_buyrequest) && <NavLink onClick={sellinfoClicked}  className={classes.header_av_item} to='/sell'>SELGE</NavLink > }
                {is_logged_in && <NavLink onClick={driveinfoClicked}  className={classes.header_av_item} to='/drive'>LEVERE</NavLink > }
                <NavLink onClick={termsClicked}  className={classes.header_av_item} to='/terms'>BETINGELSER</NavLink >
                {is_logged_in && <NavLink onClick={messagesClicked}  className={classes.header_av_item} to='/messages'>MELDINGER</NavLink > }
                {is_admin && <NavLink onClick={admClicked}  className={classes.header_av_item} to='/adm'>ADMIN</NavLink >}

                <NavLink onClick={aboutClicked}  className={classes.header_av_item} to='/about'>OM</NavLink >
                <button>
                    {!showExistingProfile && <NavLink onClick={authClicked}  className={classes.header_av_item} to='/auth'>LOGG INN</NavLink >}
                    {showExistingProfile && <NavLink onClick={authClicked}  className={classes.header_av_item} to='/me'>MIN PROFIL</NavLink >}
                    {/*<NavLink onClick={authClicked}  className={classes.header_av_item} to='/vippslogin'>MIN PROFIL</NavLink >*/}
                </button>

            </nav>
            )}

            <ImMenu onClick={toggleNav} className={classes.burger} />

        </header>
    );
};

export default MainNavigation;
