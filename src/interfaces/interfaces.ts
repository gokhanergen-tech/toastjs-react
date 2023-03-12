import React from 'react'

export interface fetching {
  promise: Promise<any>
  errorComponent: React.FC
  successComponent: React.FC
  response: (response: object, hasError: boolean) => void
}

export interface Params {
  message: string
  type: 'info' | 'error' | 'success' | 'warning'
  timeout: number
  autoCloseWithTimeout: boolean
  animation: {
    slideAnimation: boolean
    animationDuration: number
  }
  header: React.ReactElement
  body: React.ReactElement
  className: string
  title: string
  button: {
    className?: string
    title?: string
  }
  Component: React.FC
  fetchingOptions?: fetching
}

export type withKey = Params & { key: number }
