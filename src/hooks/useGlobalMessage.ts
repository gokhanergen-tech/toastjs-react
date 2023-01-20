import { useContext, useMemo } from 'react'
import MessageContext from '../context/context';
import { Params } from '../interfaces/interfaces'
import { v4 as uuidv4 } from "uuid";

export default () => {

  const { add, isMaxValid, addQueue }: any = useContext(MessageContext);


  const toastMessage = useMemo(() => {
    return ({
      /**
        @property animationDuration min 0 max 10000
        @property timeout min 0 max 10000
      **/
      show: ({ message, type, button, title = "", className = "", header, body, timeout = 1000, autoCloseWithTimeout = false, animation = { animationDuration: 1000, slideAnimation: true }, Component }: Pick<Params, 'type' | 'message'> & Partial<Params>) => {

        if (animation.animationDuration < 0 || animation.animationDuration > 10000) {
          throw new Error("Wrong animation duration! please, use it as min 0 and max 10000")
        }

        if (timeout < 0 || timeout > 10000) {
          throw new Error("Wrong timeout! please, use it as min 0 and max 10000")
        }

        const isValid = isMaxValid();
        const messageObject = { message, button, type, className, title, timeout, autoCloseWithTimeout, animation, header, body, Component, key: uuidv4() };

        if (!isValid) {
          addQueue(messageObject)
        } else {
          add(messageObject);
        }

      }
    })
  }, [])

  return (
    toastMessage
  )
}