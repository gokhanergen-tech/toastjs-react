import React from 'react'


import styles from './container.module.css'
import { position } from '../../..'

const positionStyles: object = {
  left: {
    alignItems: 'flex-start'
  },
  right: {
    alignItems: 'flex-end'
  },
  center: {
    alignItems: 'center'
  }
}

const positionStylesInner: object = {
  left: {
    paddingRight: 50
  },
  right: {
    paddingLeft: 50
  },
  center: {}
}

const Container = ({
  children,
  position
}: {
  children: any
  position: position
}) => {
  const thePositionOfContainer = positionStyles[position || 'right']
  const thePositionOfInner = positionStylesInner[position || 'right']
  return (
    <div style={thePositionOfContainer} className={styles.container_wrapper}>
      <div style={thePositionOfInner} className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}

export default Container
