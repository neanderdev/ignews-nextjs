import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useSession, signOut, signIn } from 'next-auth/react';

import { SignInButton } from '.';

jest.mock('next-auth/react');

describe('SignInButton component', () => {
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: 'authenticated'
        })

        render(<SignInButton />)

        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce({
            data: {
                user: {
                    name: 'John Doe',
                    email: 'john.doe@example.com'
                },
                expires: 'fake-expires'
            },
            status: 'authenticated'
        })

        render(<SignInButton />)

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('log out the user', () => {
        const useSessionMocked = mocked(useSession)
        const signOutMocked = mocked(signOut)

        useSessionMocked.mockReturnValueOnce({
            data: {
                user: {
                    name: 'John Doe',
                    email: 'john.doe@example.com'
                },
                expires: 'fake-expires'
            },
            status: 'authenticated'
        })

        render(<SignInButton />)

        const signOutButton = screen.getByText('John Doe')

        fireEvent.click(signOutButton)

        expect(signOutMocked).toHaveBeenCalled()
    })

    it('login user', () => {
        const useSessionMocked = mocked(useSession)
        const signInMocked = mocked(signIn)

        useSessionMocked.mockReturnValueOnce({
            data: null,
            status: 'unauthenticated'
        })

        render(<SignInButton />)

        const signInButton = screen.getByText('Sign in with Github')

        fireEvent.click(signInButton)

        expect(signInMocked).toHaveBeenCalled()
    })
})
