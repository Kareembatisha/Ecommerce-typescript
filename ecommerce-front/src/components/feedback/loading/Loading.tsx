import { Tloading } from '@customTypes/shared'
import React from 'react'

type LoadingProps = {
  status: Tloading
  error: null | string
  children: React.ReactNode
}

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === 'pending') {
    return <p>Loading please wait</p>
  }
  if (status === 'failed') {
    return <p>{error}</p>
  }
  return<>{children}</>
}

export default Loading
