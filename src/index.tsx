import * as React from 'react'
import { withKey } from './interfaces/interfaces'
import global from './hooks/useGlobalMessage'
import MessagesContainer from './components/messages_container/MessagesContainer'
import MessageContext from './context/context'
import { v4 as uuidv4 } from "uuid";
import Wrapper from './wrapper'

interface ContainerProps {
    children: any,
    maxMessageCount?: number,
    position?:position
}

export type position="left"|"right"|"center"

export const ToastContainer = ({ children, maxMessageCount = 10,position="right" }: ContainerProps) => {

    const [messages, setMessage] = React.useState([]);

    const queue: { current: any } = React.useRef([]);
    const messageCountRef: { current: any } = React.useRef(0);

    const add: Function = React.useCallback((message: withKey): void => {
        messageCountRef.current+=1;
        setMessage((prev: any): any => {
            return [message, ...prev]
        })
    }, [])

    const remove: Function = React.useCallback((message: withKey): void => {
        let inc=-1;
        if (queue.current.length > 0) {
            const messageQueue = queue.current.shift();
            messageQueue.key = uuidv4();
            add(messageQueue);
        }
        messageCountRef.current+=inc;
        setMessage(prev => prev.filter((messageGet:withKey) => messageGet.key !== message.key));
    }, [])

    const addQueue: Function = React.useCallback((message: withKey): void => {
        queue.current.push(message);
    }, [])

    const isMaxValid: any = React.useCallback(() => {
        console.log(messageCountRef.current,maxMessageCount)
        return messageCountRef.current<maxMessageCount;
    }, [])

    const memo: object = React.useMemo((): { add: Function, remove: Function, messages: withKey[], isMaxValid: Function, addQueue: Function } => {
        return ({
            add, remove, messages, isMaxValid, addQueue
        })
    }, [messages])



    return <MessageContext.Provider value={memo}>
        <MessagesContainer position={position}></MessagesContainer>
        <Wrapper>
            {
                children
            }
        </Wrapper>
    </MessageContext.Provider>
}

export const useGlobalMessage = global;
