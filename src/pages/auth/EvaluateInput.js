
import {BounceLoader} from "react-spinners";
import classes from './EvaluateInput.module.css';
import {useSelector} from "react-redux";

const EvaluateInput = () => {

    const newUser = useSelector((state) => state.newUser);
    const evaluating = useSelector((state) => state.newUser.evaluating);

    return (

        <div>
            {evaluating &&
                <div>
                    <h1 className={classes.header}>
                        VENT LITT MENS VI SJEKKER INFOEN DIN
                    </h1>
                    <p className={classes.paragraph}>
                        NAVN : {newUser.name.firstname} {newUser.name.lastname} , E-post : {newUser.name.email}
                    </p>
                    <p className={classes.paragraph}>
                        ADRESSE : {newUser.location.road} , {newUser.location.zip} {newUser.location.municipality}
                    </p>
                    <BounceLoader
                        className={classes.spinwrap}
                        size={200}
                        color={"#732A20"}
                    />
                </div>
            }
        </div>
    );
};

export default  EvaluateInput;
