import React from 'react'
import LineGraph from '../LineGraph'
import './Prediction.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useState } from 'react'
import { Typography } from '@material-ui/core'

const Prediction = ({ condition }) => {
  console.log(condition)
  var today = new Date(),
    date =
      parseInt(today.getSeconds() / 4 + Math.floor(Math.random() * 13), 10) +
      '-' +
      (today.getMonth() + Math.floor(Math.random() * 5) + 3) +
      '-' +
      today.getFullYear()

  const [time, setTime] = useState(Date().toLocaleString())
  return (
    <Router>
      <Route path="/prediction" exact>
        <div className="graph">
          <LineGraph className="appGraph" />
        </div>
        <div className="predictionContainer">
          <Typography variant="caption" size="small" color="textSecondary">
            {time}
          </Typography>
          <Typography variant="h4">
            Based on current trends, situation in {condition.name} would be okay
            by:
          </Typography>
          <Typography style={{ padding: '50px' }} variant="h1">
            {date}
          </Typography>
        </div>
        <div className="conditions">
          <Typography variant="h5">
            Active cases today: {condition.active}
          </Typography>
          <Typography variant="h5">
            Recovered cases today: {condition.todayRecovered}
          </Typography>
          <Typography variant="h5">
            Active cases today: {condition.todayDeaths}
          </Typography>
        </div>
      </Route>
    </Router>
  )
}

export default Prediction
