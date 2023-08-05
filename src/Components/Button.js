import React from 'react'
export default function Button({ clickHandler, value, className}) {
  return (
    <button className={className} onClick={clickHandler}>{value}</button>
  )
}
