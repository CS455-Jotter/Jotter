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

  const getTextSegments = (element) => {
    const textSegments = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.from(element.childNodes).forEach((node:any) => {
      switch (node.nodeType) {
        case Node.TEXT_NODE:
          textSegments.push({ text: node.nodeValue, node } as never);
          break;

        case Node.ELEMENT_NODE:
          textSegments.splice(textSegments.length, 0, ...(getTextSegments(node)));
          break;

        default:
          throw new Error(`Unexpected node type: ${node.nodeType}`);
      }
    });
    return textSegments;
  };

  const handleFind = () => {
    const findResults = document.getElementById('find-content');
    const textEditor = document.getElementById('text-editor');
    if (findResults && textEditor) {
      const textSegments = getTextSegments(textEditor);
      const textContent = textSegments.map(({ text }) => text).join('');
      const words = textContent.split(/(\s+)/);
      const output = words.map((word) => {
        if (word === findTerm) {
          return `<span style='background-color:yellow'>${word}</span>`;
        }

        return word;
      });
      const result = output.join('');
      findResults.innerHTML = result;
    }
  };

  const hanldeReplace = () => {
    const textEditor = document.getElementById('text-editor');
    const replaceResults = document.getElementById('find-content');
    if (replaceResults && textEditor) {
      const textSegments = getTextSegments(textEditor);
      const textContent = textSegments.map(({ text }) => text).join('');
      const words = textContent.split(/(\s+)/);
      const output = words.map((word) => {
        if (word === findTerm) {
          return `<span style='background-color:cyan'>${replaceTerm}</span>`;
        }

        return word;
      });
      const result = output.join('');
      replaceResults.innerHTML = result;
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
              const findResults = document.getElementById('find-content');
              const textEditor = document.getElementById('text-editor');
              if (findResults && textEditor) {
                textEditor.innerHTML = findResults.textContent as string;
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
            height: '500px',
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
