
import {do_print} from "../../routes";

import classes from './Visit.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState, useRef, useCallback} from "react";
import {VisitPos} from "../drive/OngoingRouteMap";
import GoogleMapReact from "google-map-react";
import GOOGLE_MAPS_API_KEY from "../../env";
import React from "react";
import Webcam from "react-webcam";
import {getVisitedImage, postVisitedImage} from "../../store/drive-http";
import {MdFlipCameraIos} from "react-icons/md";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

const Visit = (props) => {

    const dispatch = useDispatch();
    const [visit, setVisit] = useState(null);
    const [facingMode, setFacingMode] = useState('user');
    const [taskText, setTaskText] = useState('');
    const [numbags, setNumbBags] = useState(0);
    const [address, setAddress] = useState('');
    const [pos, setPos] = useState(null);
    const [hasAlreadyVisited , setHasAlreadyVisited] = useState(false);
    const [alreadyImage, setAlreadyImage] = useState(null);

    const driverName = useSelector((state) => state.drive.name);
    const route = useSelector((state) => state.route.ongoingRoute);
    useEffect(() => {
        if (route !== null && 'route' in route) {

            if (do_print) {
                console.log('ROUTE : ', route);
                console.log('CURRENT_INDEX : ', props.currentIndex);
            }

            const actual_index = props.currentIndex - 1;
            if (actual_index >= 0 && actual_index < route['route'].length) {
                const visiting = route['route'][actual_index];

                if (do_print) {
                    console.log('VISITING : ', visiting);
                }

                setVisit(visiting);
                const has_visited = ('visited_status' in visiting && visiting['visited_status'] === 'completed');
                let targetName = '';
                if ('buyRequest' in visiting) {
                    targetName = String(visiting['buyRequest']['name'] + '(' + visiting['buyRequest']['email'] + ')').toUpperCase()
                } else {
                    targetName = String(visiting['sellRequest']['name'] + '(' + visiting['sellRequest']['email'] + ')').toUpperCase()
                }
                setHasAlreadyVisited(has_visited);
                if (visiting['type'] === 'delivery') {
                    const _numbags = visiting['loaded_before'] - visiting['loaded_after'];
                    setNumbBags(_numbags);
                    if (has_visited) {
                        setTaskText('DU HAR LEVERT ' + _numbags.toString() + ' SEKKER TIL ' + targetName + ' HER : ');
                    } else {
                        setTaskText('DU SKAL LEVERE ' + _numbags.toString() + ' SEKKER TIL ' + targetName + ' HER : ');
                    }
                } else if (visiting['type'] === 'pickup') {
                    const _numbags = visiting['loaded_after'] - visiting['loaded_before'];
                    setNumbBags(_numbags);
                    if (has_visited) {
                        setTaskText('DU HAR HENTET ' + _numbags.toString() + ' SEKKER FRA ' + targetName + ' HER : ');
                    } else {
                        setTaskText('DU SKAL HENTE ' + _numbags.toString() + ' SEKKER FRA ' + targetName + ' HER : ');
                    }
                }
                setAddress(visiting['to']['display_name'].toUpperCase());
                setPos({
                    lat : visiting['to']['lat'] ,
                    lng : visiting['to']['lng']
                });

                if (do_print) {
                    console.log('VISIT (', actual_index, ') - ', visiting);
                }

            } else {

                if (do_print) {
                    console.log('props.currentIndex = ', props.currentIndex, ' , route[\'route\'].length = ', route['route'].length);
                }

                setVisit(null);
            }
        }
    } , [route , props.currentIndex, visit]);


    useEffect(() => {
        if(hasAlreadyVisited === true) {
            dispatch(getVisitedImage(driverName, props.currentIndex - 1));
        }
    } , [hasAlreadyVisited, dispatch, driverName, props.currentIndex]);

    const alreadyImg = useSelector((state) => state.visit.img);
    useEffect(() => {
        if (alreadyImg) {
            setAlreadyImage(alreadyImg);
        }
    } , [alreadyImg]);

    const backClicked = (event) => {
        props.backFromVisit();
    };

    const posClicked = (index) => {

    };

    const [imgSrc, setImgSrc] = useState(null);
    const webcamRef = useRef(null);
    const capture = useCallback( () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    } , [webcamRef]);

    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {
            width : innerWidth,
            height: innerHeight
        };
    };

    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const finished = (event) => {
        dispatch(postVisitedImage(driverName, imgSrc, 'tmp.jpeg', props.currentIndex - 1));
        props.backFromVisit();
    };

    const turnCamlicked = (event) => {
        setFacingMode(prevState => (prevState === 'user' ? 'environment' : 'user'));
    };

    const removeImage = (event) => {
        setImgSrc(null);
    };

    return (
        <div>
            <div className={classes.centralize}>
                <p className={classes.paragraph}>{taskText}</p>
                <p className={classes.paragraph}>{address}</p>
                {pos &&
                    <div style={{height: '15vh', width: '100%'}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: GOOGLE_MAPS_API_KEY}}
                            defaultCenter={{
                                lat: 59.397427,
                                lng: 10.399391
                            }}
                            center={pos}
                            defaultZoom={11}
                            yesIWantToUseGoogleMapApiInternals={true}

                        >
                            <VisitPos
                                lat={pos.lat}
                                lng={pos.lng}
                                text={'SEKKER'}
                                index={numbags}
                                posClicked={posClicked}
                                currentIndex={props.currentIndex}
                            />
                        </GoogleMapReact>
                    </div>
                }
                { !imgSrc && !hasAlreadyVisited &&
                    <div>
                        <Webcam
                            audio={false}
                            height={windowSize.width / 1.78}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={windowSize.width}
                            videoConstraints={{
                                width: 1280,
                                height: 720,
                                facingMode: {facingMode}
                            }}
                        />
                        <div>
                            <button className={classes.button_cam} onClick={capture}>TA BILDE AV VEDEN</button>
                            <div className={classes.gridright} onClick={turnCamlicked}>
                                <MdFlipCameraIos className={classes.downloadicon} />
                            </div>
                        </div>

                    </div>
                }
                { imgSrc && !hasAlreadyVisited &&
                    <div>
                        <img src={imgSrc} alt="Waiting.." onClick={removeImage} />

                        <div className={classes.buttons}>
                            <button className={classes.button_ok} onClick={finished}>FERDIG! TILBAKE TIL LISTEN</button>
                        </div>
                    </div>
                }
                { hasAlreadyVisited && alreadyImage &&
                    <div>
                        <img src={alreadyImage}  alt="Waiting.." />
                    </div>
                }

            </div>
            <div className={classes.gridcontainer}>
                <div className={classes.gridmid}>

                </div>
            </div>

            {hasAlreadyVisited &&
                <div className={classes.buttons}>
                    <button className={classes.button_cancel} onClick={backClicked}>TILBAKE TIL LISTEN</button>
                </div>
            }
            {!hasAlreadyVisited &&
                <div className={classes.buttons}>
                    <button className={classes.button_cancel} onClick={backClicked}>AVBRYT! TILBAKE TIL LISTEN</button>
                </div>
            }
        </div>
    );
};

export default Visit;
