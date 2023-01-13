import * as React from 'react'
import { Params } from './interfaces/interfaces'
import global from './hooks/useGlobalMessage'
import MessagesContainer from './components/messages_container/MessagesContainer'
import MessageContext from './context/context'

interface ContainerProps {
  children: any
}

export const ToastContainer = ({ children }: ContainerProps) => {

  const [messages, setMessage] = React.useState([]);

  const add: Function = React.useCallback((message: Params): void => {
    setMessage((prev: any): any => {
      return [message, ...prev]
    })
  }, [])

  const remove: Function = React.useCallback((message: object): void => {
    setMessage(prev => prev.filter(messageGet => messageGet !== message));
  }, [])


  const memo: object = React.useMemo((): { add: Function, remove: Function, messages: Params[] } => {
    return ({
      add, remove, messages
    })
  }, [messages])


  return <MessageContext.Provider value={memo}>
    <MessagesContainer></MessagesContainer>
    {
      children
    }
  </MessageContext.Provider>
}

export const useGlobalMessage = global;
