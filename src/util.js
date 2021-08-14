import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'
import React from 'react'

const casesTypeColors = {
  active: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
}

export const showDataOnMap = (data, casesType = 'active') => (
  <Circle
    center={(12.9717, 79.1594)}
    fillOpacity={0.4}
    color={casesTypeColors[casesType].hex}
    fillColor={casesTypeColors[casesType].hex}
    radius={Math.sqrt(data[casesType]) * casesTypeColors[casesType].multiplier}
  >
    <Popup>
      <h1>PoPuP</h1>
    </Popup>
  </Circle>
)
