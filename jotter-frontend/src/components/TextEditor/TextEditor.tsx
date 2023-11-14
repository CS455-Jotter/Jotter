import DarkModeIcon from '@mui/icons-material/DarkMode';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {
  DialogActions, Slide, ToggleButton,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import colorPalette, { baseURL } from '@/components/config/config';

function FindInput({ searchTerm, setSearchTerm, handleFind }) {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: colorPalette.primary,
        height: '60px',
        position: 'fixed',
        bottom: -2,
        right: 100,
        border: '3px solid black',
        borderRadius: '10px 10px 0px 0px',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: colorPalette.black }}
        placeholder="Find something in the text ..."
        value={searchTerm}
        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(event.target.value);
        }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleFind}>
        <SearchIcon sx={{ color: colorPalette.black }} />
      </IconButton>
    </Paper>
  );
}
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
  const [fontSize, setFontSize] = useState('20');
  const [fontType, setFontType] = useState('Arial');
  const [isDark, setIsDark] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const handleFind = () => {
    const elem = document.getElementById('text-editor');
    if (elem) {
      elem.innerHTML = elem.innerHTML.replace(searchTerm, `<span class="highlight">${searchTerm}</span>`);
    }
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

  const performAction = (command:string) => {
    const editor = document.getElementById('text-editor');
    document.execCommand(command, false, undefined);
    editor?.focus();
  };

  const downloadContent = () => {
    const element = document.createElement('a');
    const editor = document.getElementById('text-editor');
    const text = editor?.textContent;
    if (text) {
      const file = new Blob([text], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'jotter_save.txt';
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  const handleInput = (event) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = (e.target?.result);
      setSavedState(text);
      const elem = document.getElementById('text-editor');
      if (elem && text) {
        elem.innerHTML = text.toString();
      }
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
      <FindInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleFind={handleFind} />
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{
          height: '91vh',
          backgroundColor: isDark ? colorPalette.background : colorPalette.white,
        }}
      >
        <Stack
          id="toolbar"
          direction="row"
          spacing={2}
          style={{
            position: 'fixed',
            top: 95,
            height: '100px',
            backgroundColor: colorPalette.light,
            width: '70vw',
            borderRadius: '10px',
            padding: '0px 50px',
          }}
          alignItems="center"
          justifyContent="center"
        >
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
              border: '2px solid black',
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
              border: '2px solid black',
            }}
            MenuProps={{
              style: {
                maxHeight: 400,
              },
            }}
          >
            {
                  Array.from({ length: 21 }, (_, i) => i + 12).map((i) => (
                    <MenuItem value={i} key={i}>{i}</MenuItem>
                  ))
                }
          </Select>
          <Button
            variant="contained"
            style={{
              backgroundColor: colorPalette.white,
              color: colorPalette.black,
              border: '2px solid black',
              height: '50px',
              width: '50px',
              textTransform: 'none',
            }}
            onClick={() => {
              performAction('bold');
            }}
          >
            <FormatBoldIcon />
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: colorPalette.white,
              color: colorPalette.black,
              border: '2px solid black',
              height: '50px',
              width: '50px',
              textTransform: 'none',
            }}
            onClick={() => {
              performAction('italic');
            }}
          >
            <FormatItalicIcon />
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: colorPalette.white,
              color: colorPalette.black,
              border: '2px solid black',
              height: '50px',
              width: '50px',
              textTransform: 'none',
            }}
            onClick={() => {
              performAction('underline');
            }}
          >
            <FormatUnderlinedIcon />
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: colorPalette.white,
              color: colorPalette.black,
              border: '2px solid black',
              height: '50px',
              width: '50px',
              textTransform: 'none',
            }}
            onClick={() => {
              performAction('insertorderedlist');
            }}
          >
            <FormatListNumberedIcon />
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: colorPalette.white,
              color: colorPalette.black,
              border: '2px solid black',
              height: '50px',
              width: '50px',
              textTransform: 'none',
            }}
            onClick={() => {
              performAction('insertunorderedlist');
            }}
          >
            <FormatListBulletedIcon />
          </Button>
          <ToggleButton
            value="check"
            selected={isDark}
            onChange={() => {
              setIsDark(!isDark);
            }}
            style={{
              backgroundColor: colorPalette.white,
              height: '50px',
              width: '60px',
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
          </ToggleButton>
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
              height: '50px',
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
              height: '50px',
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
              height: '50px',
            }}
            onClick={saveToDb}
          >
            Save
          </Button>
        </Stack>
        <div
          id="text-editor"
          contentEditable
          style={{
            width: '75vw',
            margin: '120px 0px',
            padding: '5px',
            minHeight: '50vh',
            border: '3px solid black',
            borderRadius: '4px',
            fontSize: `${fontSize}px`,
            fontFamily: fontType,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            backgroundColor: isDark ? colorPalette.editor : colorPalette.white,
            color: isDark ? colorPalette.white : colorPalette.black,
          }}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSavedState(event.currentTarget.innerHTML);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
      </Stack>
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
