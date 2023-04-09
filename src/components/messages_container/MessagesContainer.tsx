import React, { useContext, useLayoutEffect, useRef } from 'react'
import Container from './container/Container'
import Message from './message/Message'
import ReactDOM from 'react-dom'

import MessageContext from '../../context/context'
import { withKey } from '../../interfaces/interfaces'
import { position } from '../..'

const MessagesContainer = ({ position }: { position: position }) => {
  const { messages }: any = useContext(MessageContext)
  const objectRef: { current: any } = useRef(document.createElement('div'))
  useLayoutEffect(() => {
    objectRef.current.style.zIndex = 999
    document.body.appendChild(objectRef.current)
  }, [])
  return ReactDOM.createPortal(
    <Container position={position}>
      <div>
        {messages.map((message: withKey) => {
          return <Message position={position} base={message} {...message} />
        })}
      </div>
    </Container>,
    objectRef.current
  )
}

export default React.memo(MessagesContainer)
