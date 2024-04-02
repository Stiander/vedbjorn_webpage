import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import GoogleMapReact from "google-map-react";
import GOOGLE_MAPS_API_KEY from "../../env";
import classes from './OngoingRouteMap.module.css'


export const VisitPos = (props) => {

    const posClicked = (event) => {
        props.posClicked(props.index);
    }

    let cssClass_pickup;
    let cssClass_deliver;
    let cssClass_completed;
    let cssClass_return;
    if(props.currentIndex === props.index) {
        cssClass_pickup = classes.header_pickup_large;
        cssClass_deliver = classes.header_deliver_large;
        cssClass_completed = classes.header_completed_large;
        cssClass_return = classes.header_return_large;
    } else {
        cssClass_pickup = classes.header_pickup;
        cssClass_deliver = classes.header_deliver;
        cssClass_completed = classes.header_completed;
        cssClass_return = classes.header_return;
    }

    if ('visited_status' in props && props.visited_status === 'completed') {
        return (
            <div className={classes.smaller_distance}>
                <h1 className={cssClass_completed} onClick={posClicked}>{props.index} </h1>
                <p className={classes.paragraph3}  onClick={posClicked}>FERDIG</p>
            </div>
        );
    }
    else if (props.text === 'pickup') {
        return (
            <div className={classes.smaller_distance}>
                <h1 className={cssClass_pickup} onClick={posClicked}>{props.index} </h1>
                <p className={classes.paragraph2}  onClick={posClicked}>HENTE</p>
            </div>
        );
    } else if (props.text === 'delivery') {
        if (props.status === 'withdrawn') {
            return (
                <div className={classes.smaller_distance}>
                    <h1 className={cssClass_return} onClick={posClicked}>{props.index} </h1>
                    <p className={classes.paragraph2} onClick={posClicked}>TRUKKET</p>
                </div>
            );
        } else {
            return (
                <div className={classes.smaller_distance}>
                    <h1 className={cssClass_deliver} onClick={posClicked}>{props.index} </h1>
                    <p className={classes.paragraph2} onClick={posClicked}>LEVERE</p>
                </div>
            );
        }
    } else if (props.text === 'return') {
        return (
            <div className={classes.smaller_distance}>
                <h1 className={cssClass_return}  onClick={posClicked}>{props.index} </h1>
                <p className={classes.paragraph2}  onClick={posClicked}>RETURNERE</p>
            </div>
        );
    } else {
        return (
            <div className={classes.smaller_distance}>
                <h1 className={cssClass_deliver}  onClick={posClicked}>{props.index} </h1>
                <p className={classes.paragraph2}  onClick={posClicked}>{props.text.toUpperCase()}</p>
            </div>
        );
    }
}

const OngoingRouteMap = (props) => {

    const [markers, setMarkers] = useState([]);
    const defaultZoom = 11;

    const route = useSelector((state) => state.route.ongoingRoute);
    useEffect(() => {
        if (route !== null && 'route' in route) {
            const positions = route['route'].map((travel, index) => {
                let vst = {
                    'key': index,
                    'lat': travel['to']['lat'],
                    'lng': travel['to']['lng'],
                    'text': travel['type'],
                    'index': index + 1 ,
                    'status' : ''
                };
                if ('status' in travel) {
                    vst['status'] = travel['status'];
                }
                if ('visited_status' in travel) {
                    vst['visited_status'] = travel['visited_status'];
                }
                return vst
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
                    <VisitPos
                        key={index}
                        lat={mark.lat}
                        lng={mark.lng}
                        text={mark.text}
                        index={mark.index}
                        visited_status={mark.visited_status}
                        posClicked={posClicked}
                        currentIndex={props.currentIndex}
                        status={mark.status}
                    />
                ))}

            </GoogleMapReact>
        </div>
    );
};

export default OngoingRouteMap;
