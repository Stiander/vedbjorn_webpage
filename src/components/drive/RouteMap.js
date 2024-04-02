import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import GOOGLE_MAPS_API_KEY from "../../env";
import GoogleMapReact from "google-map-react";
import React from "react";
import classes from "./RouteMap.module.css";

const MyPosition = (props) => {

    const posClicked = (event) => {
        props.posClicked(props.index);
    }

    let cssClass_pickup;
    let cssClass_deliver;
    if(props.currentIndex === props.index) {
        cssClass_pickup = classes.header_pickup_large;
        cssClass_deliver = classes.header_deliver_large;
    } else {
        cssClass_pickup = classes.header_pickup;
        cssClass_deliver = classes.header_deliver;
    }

    if (props.text === 'pickup') {
        return (
            <div className={classes.smaller_distance}>
                <h1 className={cssClass_pickup} onClick={posClicked}>{props.index} </h1>
                <p className={classes.paragraph2}  onClick={posClicked}>HENTE</p>
            </div>
        );
    } else {
        return (
            <div className={classes.smaller_distance}>
                <h1 className={cssClass_deliver}  onClick={posClicked}>{props.index} </h1>
                <p className={classes.paragraph2}  onClick={posClicked}>LEVERE</p>
            </div>
        );
    }
}

const RouteMap = (props) => {

    const [markers, setMarkers] = useState([]);
    const defaultZoom = 11;

    const route = useSelector((state) => state.route.route);
    useEffect(() => {
        if (route !== null && 'route' in route) {
            const positions = route['route'].map((travel, index) => {
                return {
                    'key': index,
                    'lat': travel['to']['lat'],
                    'lng': travel['to']['lng'],
                    'text': travel['type'],
                    'index': index + 1
                }
            });
            setMarkers(positions);
        }
    } , [route]);

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };


    const posClicked = (index) => {
        props.currentIndexFromMap(index);
    }


    return (
        <div style={{ height: '35vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                defaultCenter={{
                    lat: 59.397427,
                    lng: 10.399391
                }}
                center={markers[props.currentIndex - 1]}
                defaultZoom={defaultZoom}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}

            >
                {markers.map((mark, index) => (
                    <MyPosition
                        key={index}
                        lat={mark.lat}
                        lng={mark.lng}
                        text={mark.text}
                        index={mark.index}
                        posClicked={posClicked}
                        currentIndex={props.currentIndex}
                    />
                ))}

            </GoogleMapReact>
        </div>
    );
};

export default RouteMap;
