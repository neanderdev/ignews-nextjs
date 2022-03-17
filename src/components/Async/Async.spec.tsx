import { render, screen, waitFor } from '@testing-library/react';

import { Async } from '.';

test('it renders correctly', async () => {
    render(<Async />)

    expect(screen.getByText('Dicas de testes assíncronos')).toBeInTheDocument()

    await waitFor(() => {
        return expect(screen.getByText('Button')).toBeInTheDocument()
    }, {
        timeout: 1000
    })
})