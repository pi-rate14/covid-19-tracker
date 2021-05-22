import React, { useEffect, useState } from 'react'
import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet'
import './Map.css'
import { showDataOnMap } from './util'

function Map({ states, locations, center, zoom }) {
  const [vellore, setVellore] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://api.covid19india.org/state_district_wise.json')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          //console.log(data['Tamil Nadu']['districtData']['Vellore'])
          const vellore = {
            name: 'Around VIT',
            active: data['Tamil Nadu']['districtData']['Vellore']['active'],
            deaths: data['Tamil Nadu']['districtData']['Vellore']['deceased'],
            recovered:
              data['Tamil Nadu']['districtData']['Vellore']['recovered'],
          }
          console.log(vellore)
          setVellore(vellore)
          console.log(Math.sqrt(vellore['active']) * 900)
        })
    }
    fetchData()
  }, [])
  var latlngs = [12.9717, 79.1594]
  return (
    <div className="map">
      <h3>
        {' '}
        Conditions around <b>VIT</b>
      </h3>
      <LeafletMap center={center} zoom={zoom} maxZoom={15} minZoom={10}>
        <Circle
          center={latlngs}
          radius={2000}
          color={'rgb(204, 16, 52)'}
          fillColor={'rgba(204, 16, 52, 0.5)'}
          fillOpacity={0.4}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">
        OpenStreetMap</a> contributors'
          ></TileLayer>
          <Popup>
            <div className="info-container">
              <div className="info-name">{vellore.name}</div>
              <div className="info-active">
                Active Cases: {numeral(vellore.active).format('0,0')}
              </div>
              <div className="info-recovered">
                Total Recovered: {numeral(vellore.recovered).format('0,0')}
              </div>
              <div className="info-deaths">
                Total Deaths: {numeral(vellore.deaths).format('0,0')}
              </div>
            </div>
          </Popup>
        </Circle>

        {console.log(vellore)}
      </LeafletMap>
    </div>
  )
}

export default Map
