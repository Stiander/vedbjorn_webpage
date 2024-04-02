import React, {Suspense} from "react";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from 'react-router-dom';
import {BounceLoader} from "react-spinners";
import classes from "./components/sell/SellStatus.module.css";

const WelcomePage        = React.lazy(() => import('./pages/anon/Welcome'));
const BuyInfo            = React.lazy(() => import('./pages/anon/BuyInfo'));
const SellInfo           = React.lazy(() => import('./pages/anon/SellInfo'));
const DriveInfo          = React.lazy(() => import('./pages/anon/DriveInfo'));
const About              = React.lazy(() => import('./pages/anon/About'));
const TermsAndConditions = React.lazy(() => import('./pages/anon/TermsBuy'));

const InfoApp = () => {

    return (
        <React.Fragment>
            <Layout>
                <Suspense fallback={<BounceLoader
                    className={classes.spinwrap}
                    size={200}
                    color={"#732A20"}
                />}>
                    <Routes>
                        <Route exact path='/' element={<WelcomePage />} />
                        <Route exact path='/buyinfo' element={<BuyInfo />} />
                        <Route exact path='/sellinfo' element={<SellInfo />} />
                        <Route exact path='/driveinfo' element={<DriveInfo />} />
                        <Route exact path='/terms' element={<TermsAndConditions />} />
                        <Route exact path='/about' element={<About />} />
                    </Routes>
                </Suspense>
            </Layout>
        </React.Fragment>
    );
}

export default InfoApp;
