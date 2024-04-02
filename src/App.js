import React, {useEffect, useState, Suspense} from "react";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from 'react-router-dom';

import NewUserForm from "./pages/auth/NewUserForm";
import {useDispatch, useSelector} from "react-redux";
import BuyPage from "./components/buy/BuyPage";
import SellPageHotelMode from "./components/sell/SellPageHotelMode";
import DrivePage from "./components/drive/DrivePage";
import DriveAssignment from "./components/drive/DriveAssignment";
import DriveHistory from "./components/driveHistory/DriveHistory";
import Messages from "./components/messages/Messages";
import BuyHistory from "./components/buyHistory/BuyHistory";
import NewDeals from "./components/sell/NewDeals";
import OngoingDeals from "./components/sell/OngoingDeals";
import SellHistory from "./components/sellHistory/SellHistory";
import {BounceLoader} from "react-spinners";
import classes from "./components/sell/SellStatus.module.css";
import TermsMenu from "./pages/anon/TermsMenu";
import TermsBuy from "./pages/anon/TermsBuy";
import TermsSell from "./pages/anon/TermsSell";
import TermsDrive from "./pages/anon/TermsDrive";
import SellMainPage from "./components/sell/SellMainPage";
import MyBusiness from "./components/sell/MyBusiness";
import SellLargeAmounts from "./components/sell/SellLargeAmounts";
import PageNotFound from "./pages/PageNotFound";
import SendEmails from "./components/adm/SendEmails";
import Prices from "./components/adm/Prices";
import Season from "./components/adm/Season";
import Attachments from "./components/adm/Attachments";
import LoginForm from "./pages/auth/LoginForm";

const WelcomePage        = React.lazy(() => import('./pages/anon/Welcome'));
const BuyInfo            = React.lazy(() => import('./pages/anon/BuyInfo'));
const SellInfo           = React.lazy(() => import('./pages/anon/SellInfo'));
const DriveInfo          = React.lazy(() => import('./pages/anon/DriveInfo'));
const About              = React.lazy(() => import('./pages/anon/About'));
const AuthPage           = React.lazy(() => import('./pages/auth/AuthPage'));
// const TermsAndConditions = React.lazy(() => import('./pages/anon/TermsBuy'));
//const VippsLogin         = React.lazy(() => import('./pages/vipps/VippsLogin'));
const UserProfile        = React.lazy(() => import('./pages/auth/UserProfile'));
const AdminPanel         = React.lazy(() => import('./components/adm/AdminPanel'));

const App = () => {

    const dispatch = useDispatch();

    const [is_logged_in , setIsLoggedIn] = useState(false);
    // const [has_vipps_login , setHasVippsLogin] = useState(false);

    const email = useSelector((state) => state.user.name.email);
    // const vipps_access_token = useSelector((state) => state.vipps.access_token);

    const has_a_buyrequest = useSelector((state) => state.buy.has_a_buyrequest);
    const has_a_sellrequest = useSelector((state) => state.sell.has_a_sellrequest);

    const is_admin = useSelector((state) => state.adm.is_admin);

    // useEffect(() => {
    //     const has_vipps = vipps_access_token !== '' && vipps_access_token !== undefined;
    //     setHasVippsLogin(has_vipps);
    // } , [vipps_access_token]);

    useEffect(() => {
        const has_email = email !== '' && email !== undefined;
        setIsLoggedIn(has_email);
    } , [email]);

    const old_routes = useSelector((state) => state.route.completed_routes);
    const [showPrev , setShowPrec] = useState(false);
    useEffect(() => {
        if(old_routes.length > 0) {
            setShowPrec(true);
        } else {
            setShowPrec(false);
        }
    } , [old_routes]);

    const earlier_deliveries = useSelector((state) => state.delivery.delivery_history);
    const [showBuyHistory , setShowBuyHistory] = useState(false);
    useEffect( () => {
        if(earlier_deliveries.length > 0) {
            setShowBuyHistory(true);
        } else {
            setShowBuyHistory(false);
        }
    } , [earlier_deliveries]);

    const new_deals = useSelector((state) => state.sell.new_deals);
    const [hasNewDeals, setHasNewDeals] = useState(false);
    useEffect(() => {
        if (new_deals.length > 0) {
            setHasNewDeals(true);
        } else {
            setHasNewDeals(false);
        }
    }, [new_deals]);

    const [hasOngoingDeals, setHasOngoingDeals] = useState(false);
    const ongoing_deals = useSelector((state) => state.sell.ongoing_deals);
    useEffect(() => {
        if(ongoing_deals.length > 0) {
            setHasOngoingDeals(true);
        } else {
            setHasOngoingDeals(false);
        }
    } , [ongoing_deals]);

    const [hasOldSells, setHasOldSells] = useState(false);
    const old_sales = useSelector((state) => state.sell.completed_sells);
    useEffect(() => {
        if(old_sales.length > 0) {
            setHasOldSells(true);
        } else {
            setHasOldSells(false);
        }
    } , [old_sales])

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

                        <Route exact path='/auth' element={<AuthPage />} />
                        { (!is_logged_in) && <Route exact path='/auth/newuser' element={<NewUserForm />} /> }
                        { (!is_logged_in) && <Route exact path='/auth/login' element={<LoginForm />} /> }
                        {/*<Route exact path='/vippslogin' element={<VippsLogin />} />*/}
                        {/*{ (has_vipps_login && !is_logged_in) && <Route exact path='/auth/newuser' element={<NewUserForm />} /> }*/}
                        {/*{ has_vipps_login && <Route exact path='/auth/login' element={<LoginForm />} /> }*/}
                        { showExistingProfile && <Route exact path='/me' element={<UserProfile />} /> }

                        <Route exact path='/terms' element={<TermsMenu />} />
                        <Route exact path='/terms/buy' element={<TermsBuy />} />
                        <Route exact path='/terms/sell' element={<TermsSell />} />
                        <Route exact path='/terms/drive' element={<TermsDrive />} />
                        <Route exact path='/about' element={<About />} />

                        { (is_logged_in && !has_a_sellrequest) && <Route exact path='/buy' element={<BuyPage />} /> }

                        { (is_logged_in && !has_a_buyrequest) && <Route exact path='/sell' element={<SellMainPage />} /> }
                        { (is_logged_in && !has_a_buyrequest) && <Route exact path='/mybusiness' element={<MyBusiness />} /> }
                        { (is_logged_in && !has_a_buyrequest) && <Route exact path='/sellhotelmode' element={<SellPageHotelMode />} /> }
                        { (is_logged_in && !has_a_buyrequest) && <Route exact path='/selllargeamounts' element={<SellLargeAmounts />} /> }

                        { is_logged_in && <Route exact path='/drive' element={<DrivePage />} /> }
                        { is_logged_in && <Route exact path='/messages' element={<Messages />} /> }
                        { is_logged_in && <Route exact path='/driveassignment' element={<DriveAssignment />} /> }
                        { is_logged_in && showPrev        && <Route exact path='/driveassignment/old' element={<DriveHistory />} />}
                        { is_logged_in && showBuyHistory  && <Route exact path='/buy/history' element={<BuyHistory />} />}
                        { is_logged_in && hasOldSells     && <Route exact path='/sell/deals/old' element={<SellHistory />} />}
                        { is_logged_in && hasNewDeals     && <Route exact path='/sell/deals/new' element={<NewDeals />} />}
                        { is_logged_in && hasOngoingDeals && <Route exact path='/sell/deals/ongoing' element={<OngoingDeals />} />}
                        { is_admin && <Route exact path='/adm' element={<AdminPanel />} />}
                        { is_admin && <Route exact path='/adm/sendemails' element={<SendEmails />} />}
                        { is_admin && <Route exact path='/adm/prices' element={<Prices />} />}
                        { is_admin && <Route exact path='/adm/season' element={<Season />} />}
                        { is_admin && <Route exact path='/adm/attachments' element={<Attachments />} />}
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </Suspense>
            </Layout>
        </React.Fragment>
    );
}

export default App;
