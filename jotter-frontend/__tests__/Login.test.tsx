/* eslint-disable testing-library/no-node-access */
import {
  act, fireEvent, render, screen,
} from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Login from '@/pages/login/index';
// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

describe('The login page..', () => {
  it('..should have login text', () => {
    mockRouter.push('/login');
    render(<Login />);
    const loginText = screen.getByText('Login');
    expect(loginText).toBeInTheDocument();
  });

  it('..should have one field for Email and one field for Password', () => {
    mockRouter.push('/login');
    render(<Login />);
    const emailInputFieldElement = screen.getByPlaceholderText('Email');
    const passwordInputFieldElement = screen.getByPlaceholderText('Password');
    expect(emailInputFieldElement).toBeInTheDocument();
    expect(passwordInputFieldElement).toBeInTheDocument();
  });

  it('..should have a button with text "Not a user? Sign up" and click should go to route "/signup"', () => {
    mockRouter.push('/login');
    render(<Login />);
    const signUpText = screen.getByText('Not a user? Sign up');
    expect(signUpText).toBeInTheDocument();
    fireEvent.click(signUpText);
    expect(mockRouter.pathname).toBe('/signup');
  });

  it('..should have a button with text "Go to Editor!" and on click should go to route "/"', () => {
    mockRouter.push('/login');
    render(<Login />);
    const goToEditorText = screen.getByText('Go to Editor!');
    expect(goToEditorText).toBeInTheDocument();
    fireEvent.click(goToEditorText);
    expect(mockRouter.pathname).toBe('/');
  });

  it('..should display error message when wrong email is entered', async () => {
    mockRouter.push('/login');
    render(<Login />);
    const emailInputFieldElement = screen.getByPlaceholderText('Email');
    expect(emailInputFieldElement).toBeInTheDocument();
    fireEvent.change(emailInputFieldElement, { target: { value: 'wrongemail' } });

    const passwordInputFieldElement = screen.getByPlaceholderText('Password');
    expect(passwordInputFieldElement).toBeInTheDocument();
    fireEvent.change(passwordInputFieldElement, { target: { value: 'password' } });

    const submitButton = document.querySelector('[data-testid="ArrowForwardIcon"]');
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      if (submitButton) {
        fireEvent.click(submitButton);
      }
    });
    const errorIcon = document.querySelector('[data-testid="ErrorIcon"]');
    expect(errorIcon).toBeInTheDocument();
  });
});
