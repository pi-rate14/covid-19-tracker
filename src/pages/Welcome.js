import React from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import './Welcome.css'

const Welcome = () => {
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
          label="What is your purpose with this application?*"
          multiline
          rows={7}
          variant="filled"
          color="secondary"
        />
        <br />
        <br />
        <br />
        <Button variant="contained" color="secondary" fullWidth>
          Submit
        </Button>
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
