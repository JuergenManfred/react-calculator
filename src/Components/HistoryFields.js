import React from 'react'

export default function HistoryFields({calculation, solution, click}) {
  return (
    <div className='history-fields' onClick={click}>{calculation}
        <h1>{solution}</h1>
    </div>
  )
}
