import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import MessageContext from '../../../context/context';
import { withKey } from '../../../interfaces/interfaces';
import { position } from '../../../index'
import Button from '../../button/button';

import styles from './message.module.css'

const types = {
  "info": {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>,
    text: "Info",
    style: styles.info
  },
  "error": {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
    </svg>,
    text: "Error",
    style: styles.error
  },
  "success": {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z" />
    </svg>,
    text: "Success",
    style: styles.success
  },
  "warning": {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-question-octagon-fill" viewBox="0 0 16 16">
      <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
    </svg>,
    text: "Warning",
    style: styles.warning
  }
}

const positionAnimations = {
  left: {
    up: styles.up_left,
    down: styles.down_left
  },
  right: {
    up: styles.up_right,
    down: styles.down_right
  },
  center: {
    up: styles.up_center,
    down: styles.down_center
  }
}



const Message = ({ message, fetchingOptions, button, type, className, title, timeout, autoCloseWithTimeout, header, body, base, animation, Component, position }: withKey & { base: withKey, position: position }) => {

  const { remove }: any = useContext(MessageContext);

  const timeoutRef: { current: any } = useRef(null);

  const messageRef: { current: any } = useRef(null);

  const [removing, setRemoving] = useState(false);

  //fetching
  const [hasError, setHasError]:React.SetStateAction<any> = useState(null);
  const {successComponent:Success,errorComponent:Error}=fetchingOptions?fetchingOptions:{successComponent:null,errorComponent:null};

  const thePositionOfContainer = positionAnimations[position ? position : "right"]

  const removeMessage = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (messageRef.current && animation.slideAnimation) {
      messageRef.current.classList.remove(thePositionOfContainer.up);
      messageRef.current.classList.add(thePositionOfContainer.down);
      setRemoving(true);
      setTimeout(() => {
        remove(base);
      }, animation.animationDuration)
    } else {
      remove(base);
    }

  }

  useEffect(() => {
    if (autoCloseWithTimeout) {
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        removeMessage();
      }, timeout + ((animation.slideAnimation) ? animation.animationDuration : 0))
    }

    if (fetchingOptions) {
      (async () => {
        const { promise, response } = fetchingOptions;
        let data=null;
        let error:boolean=false;
        try{
          data=await promise;
          setHasError(false);
          error=true;
        }catch(err){
          data=err;
          setHasError(true);
        }
        response(data,error);
      })();
    }
  }, [])

  const selectedType = types[(hasError===null?type:(hasError===true?"error":"success"))];

  return (
    <div ref={(instance) => {
      if (instance && animation.slideAnimation) {
        instance.style.setProperty("--duration", animation.animationDuration + "ms")
        instance.classList.add(thePositionOfContainer.up);
      }
      messageRef.current = instance;
    }} className={selectedType.style + " " + (className ? className : styles.message_wrapper)}>

      {
        Component || fetchingOptions ?
          hasError === null ? (<Component></Component>) : (hasError ?(Error&&<Error></Error>): (Success&&<Success></Success>))
          :
          <Fragment>
            {
              header ? header : <div className={styles.message_header}>
                <h5>{title ? title : selectedType.text}</h5>
                <span>{selectedType.icon}</span>
              </div>
            }


            <div>
              {
                body ? body : <p className={styles.message_text}>{message}</p>
              }
            </div>
          </Fragment>
      }
      <div className={styles.message_button}>
        <Button customClassName={(button && button.className) ? button.className : ""} disabled={removing} onClick={removeMessage} value={(button && button.title) ? button.title : "OK"}></Button>
      </div>

      <div ref={(instance) => {
        if (instance && autoCloseWithTimeout) {
          instance.style.setProperty("--total_time", timeout + ((animation.slideAnimation) ? animation.animationDuration : 0) + "ms")
        }
      }} className={styles.divider}></div>
    </div>
  )
}


export default React.memo(Message);