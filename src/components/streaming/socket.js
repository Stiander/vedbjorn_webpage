
import {STREAM_ENDPOINT} from "../../routes";

import io from "socket.io-client";

export const connectSocketIo = (token, query) => {
    return io(STREAM_ENDPOINT, {
        transports: ['websocket'],
        auth: {token: token} ,
        query: query
    });
};
