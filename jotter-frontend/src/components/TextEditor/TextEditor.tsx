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
import Button from '@mui/material/Button';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import colorPalette from '@/components/config/config';

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
  const [fontType, setFontType] = useState('Calibri');
  const [isDark, setIsDark] = useState(false);

  const handleFontSizeChange = (event: SelectChangeEvent) => {
    setFontSize(event.target.value as string);
  };

  const handleFontTypeChange = (event: SelectChangeEvent) => {
    setFontType(event.target.value as string);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={1}
      sx={{
        minHeight: '90vh',
        width: '100vw',
        backgroundColor: isDark ? colorPalette.background : colorPalette.white,
      }}
    >
      <Grid item xs={3}>
        <Stack direction="row" spacing={4} style={{ height: '50px' }}>
          <Stack direction="row" spacing={1}>
            <Select
              labelId="font-size"
              id="font-size"
              value={fontSize}
              label="Size"
              onChange={handleFontSizeChange}
              autoWidth
              style={{ backgroundColor: colorPalette.white }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <Select
              labelId="font-type"
              id="font-type"
              value={fontType}
              label="Type"
              onChange={handleFontTypeChange}
              autoWidth
              style={{ backgroundColor: colorPalette.white }}
            >
              <MenuItem value="Calibri">Calibri</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Roboto">Roboto</MenuItem>
            </Select>
            <ToggleButton
              value="check"
              selected={isBold}
              onChange={() => {
                setIsBold(!isBold);
              }}
              style={{ backgroundColor: colorPalette.white }}
            >
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={isItalic}
              onChange={() => {
                setIsItalic(!isItalic);
              }}
              style={{ backgroundColor: colorPalette.white }}
            >
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={isUnderlined}
              onChange={() => {
                setIsUnderlined(!isUnderlined);
              }}
              style={{ backgroundColor: colorPalette.white }}
            >
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={isDark}
              onChange={() => {
                setIsDark(!isDark);
              }}
              style={{ backgroundColor: colorPalette.white }}
            >
              <WbSunnyIcon />
            </ToggleButton>
          </Stack>
          <Stack spacing={1} direction="row">
            <Button
              variant="contained"
              style={{
                backgroundColor: colorPalette.primary,
                color: colorPalette.black,
                border: '1px solid black',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Upload

            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: colorPalette.primary,
                color: colorPalette.black,
                border: '1px solid black',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Download
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: colorPalette.primary,
                color: colorPalette.black,
                border: '1px solid black',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Save

            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <StyledTextField
          id="filled-multiline-static"
          multiline
          fullWidth
          rows={16}
          variant="outlined"
          style={{ width: '80vw' }}
          InputProps={{
            style: {
              border: '1.5px solid black',
              borderRadius: '4px',
              fontWeight: isBold ? '1000' : '400',
              fontStyle: isItalic ? 'italic' : '',
              textDecoration: isUnderlined ? 'underline' : '',
              fontSize: `${fontSize}px`,
              fontFamily: fontType,
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              backgroundColor: isDark ? colorPalette.editor : colorPalette.white,
              color: isDark ? colorPalette.white : colorPalette.black,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default TextEditor;
