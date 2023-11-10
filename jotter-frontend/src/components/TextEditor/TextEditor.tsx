import {
  DialogActions,
  Grid, Slide, TextField, ToggleButton,
} from '@mui/material';
import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
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

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';
import axios from 'axios';
import colorPalette, { baseURL } from '@/components/config/config';

const StyledTextField = styled(TextField)`
 & .MuiInputBase-input  {
  height : '100vh',
  },
`;

const fonts = [
  'Arial',
  'Roboto',
  'Agbalumo',
  'Noto Sans',
  'Edu TAS Beginner',
  'Roboto Slab',
  'Playfair Display',
  'Sometype Mono',
];
function TextEditor({ savedState, setSavedState }) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [fontSize, setFontSize] = useState('20');
  const [fontType, setFontType] = useState('Arial');
  const [isDark, setIsDark] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const containerRef = useRef<HTMLElement>(null);

  const handleFontSizeChange = (event: SelectChangeEvent) => {
    setFontSize(event.target.value as string);
  };

  const handleFontTypeChange = (event: SelectChangeEvent) => {
    setFontType(event.target.value as string);
  };

  const saveToDb = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setOpen(true);
    } else {
      axios.put(
        `${baseURL}/users/save`,
        {
          saved_state: savedState,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }, [savedState]);

  const downloadContent = () => {
    const element = document.createElement('a');
    const file = new Blob([savedState], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'jotter_save.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleInput = (event) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target?.result);
      setSavedState(text);
    };
    reader.readAsText(event.target.files[0]);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isFocused) {
        const code = event.which || event.keyCode;
        const charCode = String.fromCharCode(code).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
          event.preventDefault();
          saveToDb();
        } else if ((event.ctrlKey || event.metaKey) && charCode === '»') {
          event.preventDefault();
          if (Number(fontSize) <= 30) {
            const newFontSize = Number(fontSize) + 2;
            setFontSize(newFontSize.toString());
          }
        } else if ((event.ctrlKey || event.metaKey) && charCode === '½') {
          event.preventDefault();
          if (Number(fontSize) >= 14) {
            const newFontSize = Number(fontSize) - 2;
            setFontSize(newFontSize.toString());
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocused, fontSize, saveToDb]);

  return (
    <>
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
                MenuProps={{
                  style: {
                    maxHeight: 400,
                  },
                }}
              >
                {' '}
                {fonts.map((font) => (<MenuItem value={font} key={font}>{font}</MenuItem>))}
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
                MenuProps={{
                  style: {
                    maxHeight: 400,
                  },
                }}
              >
                {
                  Array.from({ length: 20 }, (_, i) => i + 12).map((i) => (
                    <MenuItem value={i} key={i}>{i}</MenuItem>
                  ))
                }
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
                component="label"
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
                <input
                  type="file"
                  onChange={handleInput}
                  hidden
                />
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
                onClick={downloadContent}
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
                onClick={saveToDb}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            id="text-editor"
            multiline
            variant="outlined"
            style={{ width: '80vw' }}
            rows={400 / Number(fontSize)}
            InputProps={{
              style: {
                border: '1.5px solid black',
                borderRadius: '4px',
                fontWeight: isBold ? '1000' : '400',
                fontStyle: isItalic ? 'italic' : 'normal',
                textDecoration: isUnderlined ? 'underline' : 'none',
                fontSize: `${fontSize}px`,
                fontFamily: fontType,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                backgroundColor: isDark ? colorPalette.editor : colorPalette.white,
                color: isDark ? colorPalette.white : colorPalette.black,
              },
            }}
            value={savedState}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSavedState(event.target.value);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
          />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Please log in to save your content.
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Not a user? Sign up now!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            router.push('/login');
            handleClose();
          }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              router.push('/signup');
              handleClose();
            }}
          >
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TextEditor;
