
import classes from './BuyHistory.module.css';
import {useSelector} from "react-redux";
import Card from "../UI/Card";
import BuyHistoryItem from "./BuyHistoryItem";
import {useNavigate} from "react-router-dom";

const BuyHistory = () => {
    const navigate = useNavigate();
    const earlier_deliveries = useSelector((state) => state.delivery.delivery_history);

    const backClicked = (event) => {
        navigate('/buy');
    };

    return (
      <div>
          <h1 className={classes.header}>KJØPS-HISTORIKK</h1>
          <Card>
              {
                  earlier_deliveries.map((delivery, index) => (
                      <BuyHistoryItem
                        key={index}
                        delivery={delivery}
                      />
                  ))
              }
          </Card>
          <div className={classes.buttons}>
              <button className={classes.button_ok} onClick={backClicked}>TILBAKE</button>
          </div>
      </div>
    );
};

export default BuyHistory;
