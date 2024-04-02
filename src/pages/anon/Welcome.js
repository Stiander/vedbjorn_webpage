
import classes from './Welcome.module.css';
import YouTube from "react-youtube";
import {GiWoodPile} from "react-icons/gi";
import {useEffect, useState} from "react";

const WelcomePage = () => {

    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    })

    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimenion]);

    let youtWidth = windowDimenion.winWidth - 50;
    if (youtWidth >= 800) {
        youtWidth = 750;
    }
    const youtHeight = (youtWidth / 3) * 2;

    const opts = {
        height: youtHeight,
        width: youtWidth,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const onPlayerReady = (event) => {}

    return (
        <div>
            <YouTube
                videoId="wBcGiJsPXAY"
                opts={opts}
                onReady={onPlayerReady}
                className={classes.videoplayer}
            />
            <h1 className={classes.header}>VELKOMMEN TIL VEDBJØRN</h1>
            {/*<h1 className={classes.header_notify}>[_  UNDER UTVIKLING  _]</h1>*/}
            <h3 className={classes.header2}>ENKELT KJØP- , SALG- OG LEVERING AV VED PÅ NETT</h3>
            <div className={classes.woodpile}>
                <GiWoodPile />
            </div>
        </div>
    );
};

export default WelcomePage
