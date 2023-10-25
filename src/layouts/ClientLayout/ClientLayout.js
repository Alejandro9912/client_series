import React from 'react'

export function ClientLayout(props) {
    const {children} =props
  return (
    <div>
        {/* <h2>Se esta usando el admin Layout</h2> */}
        {children}
    </div>
  )
}
