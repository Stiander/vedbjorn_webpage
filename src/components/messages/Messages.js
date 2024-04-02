
import {do_print} from "../../routes";

import classes from './Messages.module.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMessages} from "../../store/mesages-http";
import {connectSocketIo} from "../streaming/socket";
import {messagesActions} from "../../store/messages-slice";
import Card from "../UI/Card";
import sign from "jwt-encode";
import store from "../../store";

const Messages = () => {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.user.name.email);
    const driverName = useSelector((state) => state.drive.name);
    useEffect(() => {
        dispatch(getMessages(email));
        let socket;
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
            driverName : driverName ,
            email : email
        });

        if(do_print) {
            console.log('SOCKET.IO -> Messages :: getmessages');
        }
        socket.emit('getmessages');
        socket.on('getmessages', (msg) => {
            dispatch(messagesActions.addMessage(msg));
        });
        socket.on('connect' , () => {
            if(do_print) {
                console.log('Messages :: Connected to socket.io');
            }
        });
        socket.on('disconnect' , () => {
            if(do_print) {
                console.log('Messages :: Disconnected from socket.io');
            }
        });
        return () => socket.disconnect();
    } , [email, driverName, dispatch]);

    const messages = useSelector((state) => state.messages.messages);

    return (
      <div>
          <h1 className={classes.header}>MELDINGER</h1>
          {messages.map( (msg, index) => (
              <Card
                key={index}
              >
                  <h1 className={classes.paragraph}>MELDING MOTTATT {String(Date(msg['timestamp'])).toUpperCase()}</h1>
                  <p className={classes.paragraph2}>INNHOLD :</p>
                  <p className={classes.paragraph2}>{String(msg['text']).toUpperCase()}</p>
              </Card>
              ))
          }
      </div>
    );
};

export default Messages;
