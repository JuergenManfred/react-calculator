import React from 'react'

export default function Screen({value, sign}) {
  return (
    
    <div className='screen'><span className='screen-sign'>{sign}</span>{value}</div>
    
  )
}
