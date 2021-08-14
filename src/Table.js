import React from 'react'
import numeral from 'numeral'
import './Table.css'

function Table({ states }) {
  return (
    <div className="table">
      {states.map(({ name, active }) => (
        <tr>
          <td>{name}</td>
          <td>
            <strong>{numeral(active).format('0,0')}</strong>
          </td>
        </tr>
      ))}
    </div>
  )
}

export default Table
