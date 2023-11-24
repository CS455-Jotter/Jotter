import Modal from '@mui/material/Modal';
import {
  Typography, Box, TextField, Stack, Button,
} from '@mui/material';
import React, { useEffect } from 'react';
import colorPalette from '../config/config';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
  maxHeight: '80vh',
};

function FindReplaceModal({ modalOpen, handleModalClose }) {
  const [findTerm, setFindTerm] = React.useState('');
  const [replaceTerm, setReplaceTerm] = React.useState('');
  const [finalResults, setFinalResults] = React.useState('' as string);

  const handleFind = () => {
    const findResults = document.getElementById('find-content');
    const textEditor = document.getElementById('text-editor');
    if (findResults && textEditor) {
      const text = textEditor.textContent as string;
      const parts = text.split(new RegExp(`(${findTerm})`, 'gi'));
      const result = parts.map((part) => {
        if (part === findTerm) {
          return `<span style='background-color:yellow'>${part}</span>`;
        }

        return part;
      }).join('');
      findResults.innerHTML = result;
    }
  };

  const hanldeReplace = () => {
    const textEditor = document.getElementById('text-editor');
    const replaceResults = document.getElementById('find-content');
    if (replaceResults && textEditor) {
      const text = textEditor.textContent as string;
      const parts = text.split(new RegExp(`(${findTerm})`, 'gi'));
      const result = parts.map((part) => {
        if (part === findTerm) {
          return `<span style='background-color:cyan'>${replaceTerm}</span>`;
        }

        return part;
      }).join('');
      replaceResults.innerHTML = result;

      const afterReplace = parts.map((part) => {
        if (part === findTerm) {
          return replaceTerm;
        }

        return part;
      }).join('');

      setFinalResults(afterReplace);
    }
  };

  useEffect(() => {
    const findResults = document.getElementById('find-content');
    const textEditor = document.getElementById('text-editor');
    if (findResults && textEditor) {
      findResults.innerHTML = textEditor.innerHTML as string;
    }
  }, []);

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" fontWeight={800}>
          Find and Replace
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }} alignContent="center" justifyContent="center">
          <TextField
            id="outlined-basic"
            label="Find .."
            variant="outlined"
            onChange={(e) => setFindTerm(e.target.value)}
          />
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
            onClick={handleFind}
          >
            Find
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }} alignContent="center" justifyContent="center">
          <TextField
            id="outlined-basic"
            label="Replace with.."
            variant="outlined"
            onChange={(e) => setReplaceTerm(e.target.value)}
          />
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
            onClick={hanldeReplace}
          >
            Replace
          </Button>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }} alignContent="center" justifyContent="center">
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
            onClick={() => {
              if (findTerm !== '') handleFind();
              else {
                const findResults = document.getElementById('find-content');
                const textEditor = document.getElementById('text-editor');
                if (findResults && textEditor) {
                  findResults.innerHTML = textEditor.textContent as string;
                }
              }
            }}
          >
            Undo
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
            onClick={() => {
              const textEditor = document.getElementById('text-editor');
              if (textEditor) {
                textEditor.innerHTML = finalResults as string;
              }
              handleModalClose();
            }}
          >
            Done
          </Button>
        </Stack>
        <div
          id="find-content"
          style={{
            padding: '5px',
            minHeight: '10px',
            maxHeight: '400px',
            border: '3px solid black',
            borderRadius: '4px',
            fontSize: '16px',
            fontFamily: 'Arial',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            backgroundColor: colorPalette.white,
            color: colorPalette.black,
            overflowY: 'scroll',
          }}
        />
      </Box>
    </Modal>
  );
}

export default FindReplaceModal;
