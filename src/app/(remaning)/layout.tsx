import LithiumLayout from '@/layouts/lithium/lithium-layout'
import React, { PropsWithChildren } from 'react'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <LithiumLayout>{children}</LithiumLayout>

  )
}

export default Layout
