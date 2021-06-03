import './App.css'
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Button,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'
import { useStyles } from './MUIstyles'
import Welcome from './pages/Welcome'

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Prediction from './pages/Prediction'

//https://disease.sh/v3/covid-19/gov/india

function App() {
  const classes = useStyles()
  const locations = [
    {
      name: 'Delhi',
      lat: 28.7041,
      lng: 77.1025,
    },
    {
      name: 'Uttar Pradesh',
      lat: 26.8467,
      lng: 80.9462,
    },
  ]

  const [states, setStates] = useState([])
  const [country, setCountry] = useState('countrywide')
  const [india, setIndia] = useState({})
  const [activeState, setActiveState] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 12.9717, lng: 79.1594 })
  const [mapZoom, setMapZoom] = useState(13.5)

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/gov/india')
      .then((response) => response.json())
      .then((data) => {
        const india = {
          name: 'CountryWide',
          active: data.total.active,
          recovered: data.total.recovered,
          deaths: data.total.deaths,
          totalCases: data.total.cases,
          todayRecovered: data.total.todayRecovered,
          todayDeaths: data.total.todayDeaths,
        }
        setActiveState(india)
      })
  }, [])

  useEffect(() => {
    const getStatesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/gov/india')
        .then((response) => response.json())
        .then((data) => {
          const states = data.states.map((state) => ({
            name: state.state,
            active: state.active,
            recovered: state.recovered,
            deaths: state.deaths,
            totalCases: state.cases,
            todayRecovered: state.todayRecovered,
            todayDeaths: state.todayDeaths,
          }))
          setTableData(states)
          setStates(states)
          const india = {
            name: 'CountryWide',
            active: data.total.active,
            recovered: data.total.recovered,
            deaths: data.total.deaths,
            totalCases: data.total.cases,
            todayRecovered: data.total.todayRecovered,
            todayDeaths: data.total.todayDeaths,
          }
          setIndia(india)
        })
    }
    getStatesData()
  }, [])

  // states[0].lat = 11.6234
  // states[0].lng = 11.6234
  // console.log(states[0].cases)

  const onStateChange = (event) => {
    const stateCode = event.target.value
    setCountry(stateCode)
    for (var i = 0; i < states.length; i++) {
      if (stateCode == states[i].name) {
        setActiveState(states[i])
      }
      if (stateCode == 'countrywide') {
        setActiveState(india)
      }
    }
    console.log(stateCode)
    // for (var i = 0; i < locations.length; i++) {
    //   console.log(locations[i].name)
    //   if (stateCode == locations[i].name) {
    //     var lati = locations[i].lat
    //     var long = locations[i].lng
    //     setMapCenter([lati, long])
    //     setMapZoom(4)
    //     console.log(mapCenter)
    //   }
    // }
    console.log(activeState)
    console.log(mapCenter)
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Welcome />
          </Route>
          <Route path="/tracker" exact>
            <div className="app">
              <div className="app__left">
                <div className="app__header">
                  <h1>CoviCheck</h1>
                  <FormControl className={classes.root}>
                    <Select
                      color="secondary"
                      variant="outlined"
                      onChange={onStateChange}
                      value={country}
                    >
                      {/* Loop through all states and show them in dropdown */}
                      <MenuItem value="countrywide">Country wide</MenuItem>
                      {states.map((state) => (
                        <MenuItem value={state.name}>{state.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="app__stats">
                  {}
                  <InfoBox
                    title="Active cases"
                    cases={activeState.active}
                    total={activeState.totalCases}
                  />
                  <InfoBox
                    title="Recovered Today"
                    cases={activeState.todayRecovered}
                    total={activeState.recovered}
                  />
                  <InfoBox
                    title="Deaths Today"
                    cases={activeState.todayDeaths}
                    total={activeState.deaths}
                  />
                </div>
                <Map
                  center={mapCenter}
                  zoom={mapZoom}
                  states={states}
                  locations={locations}
                />
              </div>
              <Card className="app__right">
                <CardContent>
                  <h3>Live cases by State</h3>
                  <Table states={tableData} />
                  <h3 className="app__graphTitle">Country wide new cases</h3>
                  <LineGraph className="app__graph" />
                </CardContent>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  component={Link}
                  to="/prediction"
                >
                  FIND RESULTS
                </Button>
              </Card>
            </div>
          </Route>
          <Route>
            <Prediction condition={activeState} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
