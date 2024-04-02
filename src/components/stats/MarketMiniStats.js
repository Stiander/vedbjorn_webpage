
import {do_print} from "../../routes";

import classes from "../drive/DriveStatus.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useEffect , useState} from "react";
import {connectSocketIo} from "../streaming/socket";
import sign from "jwt-encode";
import store from "../../store";

const MarketMiniStats = () => {
    const loc = useSelector((state) => state.user.location);
    const email = useSelector((state) => state.user.name.email);

    const [marketInfo , setMarketInfo] = useState({
        municipality : {
            num_sellers : 0,
            num_drivers : 0,
            num_buyers : 0
        } ,
        county : {
            num_sellers : 0,
            num_drivers : 0,
            num_buyers : 0
        }
    });

    let socket;
    useEffect(() => {
        if(socket) {
            socket.disconnect();
        }
        socket = connectSocketIo(sign({
            phone : store.getState().user.name['phone'] ,
            email : store.getState().user.name['email'] ,
            access_token : store.getState().vipps.access_token
        } , process.env.REACT_APP_JWT_SECRET , {
            alg: "HS256",
            typ: "JWT"
        }), {
            county : loc.county ,
            municipality : loc.municipality ,
            email : email
        });

        if (do_print) {
            console.log('SOCKET.IO -> MarketMiniStats :: getstats');
        }

        socket.emit('getstats');
        socket.on('getstats', (data) => {

            // if (do_print) {
            //     console.log(data);
            // }

            setMarketInfo(data);
        });

        socket.on('connect' , () => {
            if (do_print) {
                console.log('Connected to socket.io');
            }
        });

        socket.on('disconnect' , () => {
            if (do_print) {
                console.log('Disconnected from socket.io');
            }
        });

        if(socket && socket.connected) {
            return () => socket.disconnect();
        }
    }, [loc , email]);

    return (
        <div className={classes.centralize}>
            <p className={classes.paragraph}>HER ER LITT INFORMASJON OM MARKEDET</p>
            <div className={classes.centralize}>
                <p className={classes.header2}>{loc.municipality}</p>
                <p className={classes.paragraph2}>SELGERE : {marketInfo.municipality.num_sellers}</p>
                <p className={classes.paragraph2}>KJØPERE : {marketInfo.municipality.num_buyers}</p>
                <p className={classes.paragraph2}>SJÅFØRER : {marketInfo.municipality.num_drivers}</p>
            </div>
            <div className={classes.centralize}>
                <p className={classes.header2}>{loc.county}</p>
                <p className={classes.paragraph2}>SELGERE : {marketInfo.county.num_sellers}</p>
                <p className={classes.paragraph2}>KJØPERE : {marketInfo.county.num_buyers}</p>
                <p className={classes.paragraph2}>SJÅFØRER : {marketInfo.county.num_drivers}</p>
            </div>
        </div>
    );
};

export default MarketMiniStats;
