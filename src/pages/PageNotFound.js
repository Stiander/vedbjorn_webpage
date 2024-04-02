
import classes from './PageNotFound.module.css';
import {useEffect, useState} from "react";
import {ImConfused} from "react-icons/im";
import {useNavigate} from "react-router-dom";

const PageNotFound = () => {

    const navigate = useNavigate();
    const [remainingSeconds, setRemainingSeconds] = useState(30);

    useEffect( () => {
        const interval = setInterval(() => {
            setRemainingSeconds(remainingSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingSeconds]);

    useEffect(() => {
        if(remainingSeconds < 0) {
            navigate('/');
        }
    } , [remainingSeconds, navigate]);

    return (
      <div>
          <h1 className={classes.header}>OOPSSANN !</h1>
          <div className={classes.oopsie}>
              <ImConfused />
          </div>
          <p className={classes.paragraph}>DU HAR KOMMET TIL EN SIDE SOM IKKE FINNES, MERKELIG NOK.</p>
          <p className={classes.paragraph}>DU BLIR SENDT TILBAKE TIL FORSIDEN OM {remainingSeconds} SEKUNDER</p>
      </div>
    );
};

export default PageNotFound;
