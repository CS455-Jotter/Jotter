import {
  Grid, TextField, ToggleButton,
} from '@mui/material';
import React, { useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack } from '@mui/system';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
 & .MuiInputBase-input  {
  height : '100vh',
  },
`;

function TextEditor() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [fontSize, setFontSize] = useState('16');

  const handleChange = (event: SelectChangeEvent) => {
    setFontSize(event.target.value as string);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={1}
      sx={{ minHeight: '90vh', width: '100vw', marginTop: '15px' }}
    >
      <Grid item xs={3}>
        <Stack direction="row" style={{ height: '50px' }}>
          <Select
            labelId="font-size"
            id="font-size"
            value={fontSize}
            label="Size"
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <ToggleButton
            value="check"
            selected={isBold}
            onChange={() => {
              setIsBold(!isBold);
            }}
          >
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton
            value="check"
            selected={isItalic}
            onChange={() => {
              setIsItalic(!isItalic);
            }}
          >
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton
            value="check"
            selected={isUnderlined}
            onChange={() => {
              setIsUnderlined(!isUnderlined);
            }}
          >
            <FormatUnderlinedIcon />
          </ToggleButton>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <StyledTextField
          id="filled-multiline-static"
          multiline
          fullWidth
          minRows={1}
          variant="outlined"
          style={{ width: '80vw' }}
          InputProps={{
            style: {
              border: '4px solid black',
              borderRadius: '0px',
              fontWeight: isBold ? '1000' : '400',
              fontStyle: isItalic ? 'italic' : '',
              textDecoration: isUnderlined ? 'underline' : '',
              fontSize: `${fontSize}px`,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default TextEditor;