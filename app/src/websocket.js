import {createContext, useRef} from "react";
import {useDispatch} from "react-redux";

import {setCurrentTask} from "./store/slices/rootSlice";


export const WebSocketContext = createContext(null);

export default function WebSocketProvider({userId, children}) {
    const dispatch = useDispatch();
    const ws = useRef(null);

    if(!ws.current) {
        console.log("trying to connect, userId: " + userId)

        ws.current = new WebSocket('ws://192.168.148.9:8000/user/' + userId)
        ws.current.onopen = () => {
            console.log('WS connection opened, user: ' + userId);
        };
        ws.current.onerror = (e) => {
            console.log("err " + e.message);
        };
        ws.current.onmessage = (msg) => {
            try {
                const data = JSON.parse(JSON.parse(msg.data));
                console.log("Msg received", data)
                console.log(data.content.record.products)
                if(data.type === 'new_task') {
                    dispatch(setCurrentTask(data.content));
                }
            } catch(err) {
                console.log(err);
            }
        };
        ws.current.onclose = (e) => {
            console.log("WS Connection closed")
            console.log(e.code, e.reason);
        };
    }


    return (
        <WebSocketContext.Provider value={ws.current}>
            {children}
        </WebSocketContext.Provider>
    )
}