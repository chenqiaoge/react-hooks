import React from 'react'

export default function WhiteSpace(props) {
  return (
    <div
      style={{
        background: '#fff',
        padding: '36px 32px',
        boxShadow: ' 0 2px 5px 0 rgba(0, 0, 0, 0.08)',
        ...props.style,
      }}>
      {props.children}
    </div>
  )
}
