import {
  Grid, Slide, TextField, ToggleButton,
} from '@mui/material';
import React, { useState } from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Stack } from '@mui/system';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
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

  const containerRef = React.useRef<HTMLElement>(null);

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
        paddingTop: '15px',
      }}
    >
      <Grid item xs={12} style={{ margin: '10px' }}>
        <Stack direction="row" spacing={2} style={{ height: '50px' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Select
              labelId="font-type"
              id="font-type"
              value={fontType}
              label="Type"
              onChange={handleFontTypeChange}
              style={{
                backgroundColor: colorPalette.white,
                width: '290px',
                height: '50px',
                border: '1px solid black',
              }}
            >
              <MenuItem value="Calibri">Calibri</MenuItem>
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Roboto">Roboto</MenuItem>
            </Select>
            <Select
              labelId="font-size"
              id="font-size"
              value={fontSize}
              label="Size"
              onChange={handleFontSizeChange}
              autoWidth
              style={{
                backgroundColor: colorPalette.white,
                height: '50px',
                border: '1px solid black',
              }}
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
              style={{
                backgroundColor: isBold ? colorPalette.grey : colorPalette.white,
                border: '2px solid black',
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
              style={{
                backgroundColor: isItalic ? colorPalette.grey : colorPalette.white,
                border: '2px solid black',
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
              style={{
                backgroundColor: isUnderlined ? colorPalette.grey : colorPalette.white,
                border: '2px solid black',
              }}
            >
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton
              value="check"
              selected={isDark}
              onChange={() => {
                setIsDark(!isDark);
              }}
              style={{
                backgroundColor: colorPalette.white,
                height: '50px',
                border: '2px solid black',
              }}
            >
              <Box sx={{ overflow: 'hidden' }} ref={containerRef}>
                <Slide
                  in={isDark}
                  direction="up"
                  container={containerRef.current}
                  style={{ display: isDark ? 'block' : 'none' }}
                >
                  <WbSunnyIcon />
                </Slide>
                <Slide
                  in={!isDark}
                  direction="down"
                  container={containerRef.current}
                  style={{ display: !isDark ? 'block' : 'none' }}
                >
                  <DarkModeIcon />
                </Slide>
              </Box>
              {/* {isDark ? <WbSunnyIcon /> : <DarkModeIcon />} */}
            </ToggleButton>
          </Stack>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              style={{
                backgroundColor: colorPalette.primary,
                color: colorPalette.black,
                border: '1px solid black',
                fontWeight: 'bold',
                textTransform: 'none',
                width: '212px',
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
                width: '212px',
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
                width: '212px',
              }}
            >
              Save

            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <StyledTextField
          id="filled-multiline-static"
          multiline
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
