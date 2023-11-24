/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/index';
// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

describe('The home page..', () => {
  it('..should have toolbar for text editing', () => {
    mockRouter.push('/');
    render(<Home />);
    const toolBar = document.querySelector('#toolbar');
    expect(toolBar).toBeInTheDocument();
  });

  it('..should have text editor', () => {
    mockRouter.push('/');
    render(<Home />);
    const textEditor = document.querySelector('#text-editor');
    expect(textEditor).toBeInTheDocument();
  });

  it('..should have bold icon', () => {
    document.execCommand = jest.fn();
    mockRouter.push('/');
    render(<Home />);
    const boldButton = document.querySelector('[data-testid="FormatBoldIcon"]');
    expect(boldButton).toBeInTheDocument();
    if (boldButton) {
      fireEvent.click(boldButton);
      expect(document.execCommand).toHaveBeenCalledWith('bold', false, undefined);
    }
  });

  it('..should have italic icon', () => {
    document.execCommand = jest.fn();
    mockRouter.push('/');
    render(<Home />);
    const italicButton = document.querySelector('[data-testid="FormatItalicIcon"]');
    expect(italicButton).toBeInTheDocument();
    if (italicButton) {
      fireEvent.click(italicButton);
      expect(document.execCommand).toHaveBeenCalledWith('italic', false, undefined);
    }
  });

  it('..should have underline icon', () => {
    document.execCommand = jest.fn();
    mockRouter.push('/');
    render(<Home />);
    const underlineButton = document.querySelector('[data-testid="FormatUnderlinedIcon"]');
    expect(underlineButton).toBeInTheDocument();
    if (underlineButton) {
      fireEvent.click(underlineButton);
      expect(document.execCommand).toHaveBeenCalledWith('underline', false, undefined);
    }
  });

  it('..shoould have a ordered list icon', () => {
    document.execCommand = jest.fn();
    mockRouter.push('/');
    render(<Home />);
    const orderedListButton = document.querySelector('[data-testid="FormatListNumberedIcon"]');
    expect(orderedListButton).toBeInTheDocument();
    if (orderedListButton) {
      fireEvent.click(orderedListButton);
      expect(document.execCommand).toHaveBeenCalledWith('insertorderedlist', false, undefined);
    }
  });

  it('..shoould have a unordered list icon', () => {
    document.execCommand = jest.fn();
    mockRouter.push('/');
    render(<Home />);
    const unorderedListButton = document.querySelector('[data-testid="FormatListBulletedIcon"]');
    expect(unorderedListButton).toBeInTheDocument();
    if (unorderedListButton) {
      fireEvent.click(unorderedListButton);
      expect(document.execCommand).toHaveBeenCalledWith('insertunorderedlist', false, undefined);
    }
  });

  it('..should display text when clicked on content Editable div and input is given', async () => {
    mockRouter.push('/');
    render(<Home />);
    const textEditor = document.querySelector('#text-editor');
    expect(textEditor).toBeInTheDocument();
    if (textEditor) {
      fireEvent.click(textEditor);
      await userEvent.type(textEditor, 'Sample Text');
      expect(screen.getByText('Sample Text')).toBeInTheDocument();
    }
  });
});