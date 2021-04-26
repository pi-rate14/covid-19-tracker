import React from 'react'
import LineGraph from '../LineGraph'
import './Prediction.css'

const Prediction = () => {
  return (
    <div>
      <div className="graph">
        <LineGraph className="appGraph" />
      </div>
    </div>
  )
}

export default Prediction
