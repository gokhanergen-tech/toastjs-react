import React, { useContext, useLayoutEffect, useRef } from 'react'
import Container from './container/Container'
import Message from './message/Message'
import ReactDOM from 'react-dom'

import MessageContext from '../../context/context'
import { Params } from '../../interfaces/interfaces'
const MessagesContainer = () => {
  const {messages}:any=useContext(MessageContext);
  const objectRef:{current:any}=useRef(document.createElement("div"));
  useLayoutEffect(()=>{
    objectRef.current.style.zIndex=999;
    document.body.appendChild(objectRef.current);
  },[])
  return (
    ReactDOM.createPortal(<Container>
        {
            messages.map((message:Params)=>{
                return <Message base={message} key={message.key} message={message.message} type={message.type} timeout={message.timeout} userControl={message.userControl} ></Message>
            })
        }
    </Container>,objectRef.current)
  )
}

export default React.memo(MessagesContainer)