import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Signup from '@/pages/signup/index';

// eslint-disable-next-line global-require
jest.mock('next/router', () => require('next-router-mock'));

describe('The signup page..', () => {
  it('..should have signup text', () => {
    mockRouter.push('/signup');
    render(<Signup />);
    const loginText = screen.getByText('SignUp');
    expect(loginText).toBeInTheDocument();
  });

  it('..should have one field for Email, one field for Password and one field for Confirm Password', () => {
    mockRouter.push('/signup');
    render(<Signup />);
    const emailInputFieldElement = screen.getByPlaceholderText('Email');
    const passwordInputFieldElement = screen.getByPlaceholderText('Password');
    const confirmPasswordInputFieldElement = screen.getByPlaceholderText('Confirm Password');
    expect(emailInputFieldElement).toBeInTheDocument();
    expect(passwordInputFieldElement).toBeInTheDocument();
    expect(confirmPasswordInputFieldElement).toBeInTheDocument();
  });

  it('..should have a button with text "Already a user? Login" and click should go to route "/login"', () => {
    mockRouter.push('/signup');
    render(<Signup />);
    const signUpText = screen.getByText('Already a user? Login');
    expect(signUpText).toBeInTheDocument();
    fireEvent.click(signUpText);
    expect(mockRouter.pathname).toBe('/login');
  });

  it('..should have a button with text "Go to Editor!" and on click should go to route "/"', () => {
    mockRouter.push('/signup');
    render(<Signup />);
    const goToEditorText = screen.getByText('Go to Editor!');
    expect(goToEditorText).toBeInTheDocument();
    fireEvent.click(goToEditorText);
    expect(mockRouter.pathname).toBe('/');
  });
});
