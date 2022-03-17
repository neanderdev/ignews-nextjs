import { render, screen } from '@testing-library/react';

import Home from '../../pages';

jest.mock('next/router');
jest.mock('next-auth/react', () => {
    return {
        useSession() {
            return [null, false]
        }
    };
});

describe('Home page', () => {
    it('renders correctly', () => {
        render(
            <Home
                product={{
                    priceId: 'fake-price-id',
                    amount: 10
                }}
            />
        )

        expect(screen.getByText('For 10 month')).toBeInTheDocument()
    })
})