import React from 'react'

import styles from './container.module.css'
const Container = ({children}:{children:any}) => {
  return (
    <div className={styles.container_wrapper}>
       {
        children
       }
    </div>
  )
}

export default Container;