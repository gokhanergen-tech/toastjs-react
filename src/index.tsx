import * as React from 'react'
import { withKey } from './interfaces/interfaces'
import global from './hooks/useGlobalMessage'
import MessagesContainer from './components/messages_container/MessagesContainer'
import MessageContext from './context/context'
import { v4 as uuidv4 } from "uuid";
import Wrapper from './wrapper'

interface ContainerProps {
    children: any,
    maxMessageCount?: number
}

export const ToastContainer = ({ children, maxMessageCount = 10 }: ContainerProps) => {

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
        setMessage(prev => prev.filter(messageGet => messageGet !== message));
        let inc=-1;
        if (queue.current.length > 0) {
            const messageQueue = queue.current.shift();
            messageQueue.key = uuidv4();
            add(messageQueue);
            inc=+1;
        }
        messageCountRef.current+=inc;
    }, [])

    const addQueue: Function = React.useCallback((message: withKey): void => {
        queue.current.push(message);
    }, [])

    const isMaxValid: any = React.useCallback(() => {
        return messageCountRef.current<maxMessageCount;
    }, [])

    const memo: object = React.useMemo((): { add: Function, remove: Function, messages: withKey[], isMaxValid: Function, addQueue: Function } => {
        return ({
            add, remove, messages, isMaxValid, addQueue
        })
    }, [messages])



    return <MessageContext.Provider value={memo}>
        <MessagesContainer></MessagesContainer>
        <Wrapper>
            {
                children
            }
        </Wrapper>
    </MessageContext.Provider>
}

export const useGlobalMessage = global;
