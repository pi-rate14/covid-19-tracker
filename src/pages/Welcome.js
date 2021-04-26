import React from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import './Welcome.css'
import { useState } from 'react'

const Welcome = () => {
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState('')

  function SubmitButton() {
    if (name && info && email) {
      return (
        <Button variant="contained" color="secondary" fullWidth>
          Submit
        </Button>
      )
    } else {
      return (
        <Button variant="contained" color="secondary" fullWidth disabled>
          Submit
        </Button>
      )
    }
  }

  return (
    <div className="container">
      <div>
        <Typography variant="h1" color="secondary">
          CoviCheck
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Covid 19 traker for VIT
        </Typography>
      </div>

      <div className="formBox">
        <TextField
          id="standard-full-width"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          label="Email"
          color="secondary"
        />
        <TextField
          id="standard-full-width"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          label="Full Name"
          color="secondary"
        />
        <br />
        <br />
        <TextField
          id="filled-multiline-static"
          fullWidth
          onChange={(e) => setInfo(e.target.value)}
          label="What is your purpose with this application?*"
          multiline
          rows={7}
          variant="filled"
          color="secondary"
        />
        <br />
        <br />
        <br />
        <SubmitButton />
        <br />
        <br />
        <Typography variant="caption" size="small" color="textSecondary">
          *For security reasons, we record and maintain this information.
        </Typography>
      </div>
    </div>
  )
}

export default Welcome
