import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import GOOGLE_MAPS_API_KEY from "../../env";
import { ImLocation } from 'react-icons/im';
import classes from './MyPosition.module.css';
import {useSelector} from "react-redux";

const MyPosition = ({ text }) => {
    return (
        <ImLocation className={classes.marker}>
            {text}
        </ImLocation>
    );
}

const SimpleMap = (props) => {

    const location = useSelector((state) => state.user.location);
    const [my_lat, setMyLat] = useState(location.lat);
    const [my_lng, setMyLng] = useState(location.lng);
    const [myDefaultProps, setMyDefaultProps] = useState({
        center: {
            lat: location.lat,
            lng: location.lng
        },
        zoom: 11
    });

    useEffect( () => {
        setMyLat(location.lat);
        setMyLng(location.lng);
        setMyDefaultProps({
            center: {
                lat: location.lat,
                lng: location.lng
            },
            zoom: 11
        });
    }, [location]);

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };

    return (
        <div style={{ height: '35vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                center ={myDefaultProps.center}
                zoom={myDefaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

            >
                <MyPosition
                    lat={my_lat}
                    lng={my_lng}
                    text="Din Posisjon"
                />
            </GoogleMapReact>
        </div>
    );
}

export default SimpleMap;
