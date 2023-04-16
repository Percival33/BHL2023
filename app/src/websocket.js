import {createContext, useRef} from "react";


export const WebSocketContext = createContext(null);

export default function WebSocketProvider({children}) {
    const ws = useRef(null);

    if(!ws.current) {
        ws.current = new WebSocket('ws://192.168.148.9:8080/1')
        ws.current.onopen = () => {
            console.log('WS connection opened');
        };
        ws.current.onerror = (e) => {
            console.log("err " + e.message);
        };
        ws.current.onmessage = (msg) => {
            console.log("Rcv: " + msg);
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