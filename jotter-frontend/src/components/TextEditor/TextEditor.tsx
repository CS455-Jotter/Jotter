import { Grid, TextField } from '@mui/material';
import React from 'react';

function TextEditor() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '90vh', width: '100vw' }}
    >
      <Grid item xs={3}>
        <TextField
          id="filled-multiline-static"
          multiline
          rows={35}
          defaultValue="Default Value"
          variant="outlined"
          style={{ width: '80vw' }}
          InputProps={{
            style: {
              border: '4px solid black',
              borderRadius: '0px',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default TextEditor;
