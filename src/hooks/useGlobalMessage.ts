import { useContext, useMemo } from 'react'
import MessageContext from '../context/context';
import { Params } from '../interfaces/interfaces'


export default () => {
  
  const {add}:any=useContext(MessageContext);
  

  const toastMessage = useMemo(() => {
    return ({
      show: ({ message, type, timeout, userControl,key }:Params) => {
          add({ message, type, timeout, userControl,key:key?key:Date.now() });
      }
    })
  }, [])

  return (
    toastMessage
  )
}