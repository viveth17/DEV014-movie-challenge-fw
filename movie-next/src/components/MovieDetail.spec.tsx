import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getMovieDetail } from '../services/movieService';
import MovieDetail from './MovieDetail';
import { act } from 'react';
import '@testing-library/jest-dom';

jest.mock('../services/movieService');

const mockGetMovieDetail = getMovieDetail as jest.Mock;

describe('MovieDetail', () => {
    const mockMovie = {
        id: 123,
        title: 'Mock Movie',
        original_title: 'Mock Original Title',
        poster_path: '/mock-poster.jpg',
        releaseYear: '2023-01-01',
        genres: ['Action', 'Adventure'],
        rating: 7.5,
        overview: 'This is a mock movie.',
    };

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Router>
                    <MovieDetail />
                </Router>
            );
        });
    };

    beforeEach(() => {
        mockGetMovieDetail.mockReset();
    });

    test('debería manejar errores al obtener detalles de la película', async () => {
        mockGetMovieDetail.mockRejectedValueOnce(new Error('Error fetching movie detail'));
        await renderComponent();
        await waitFor(() => expect(screen.getByText('Error: Error fetching movie detail')).toBeInTheDocument());
    }); 

    test('debería mostrar los detalles de la película correctamente', async () => {
        mockGetMovieDetail.mockResolvedValueOnce(mockMovie);
        await renderComponent();
        await waitFor(() => expect(screen.getByText(/This is a mock movie./)).toBeInTheDocument());
        expect(screen.getByText('7.5/10')).toBeInTheDocument();
        expect(screen.getByText(/Action, Adventure/)).toBeInTheDocument();
    });

    test('debería navegar hacia atrás al hacer clic en el botón de regresar', async () => {
        mockGetMovieDetail.mockResolvedValueOnce(mockMovie);
        await renderComponent();
        await waitFor(() => expect(screen.getByText(/This is a mock movie./)).toBeInTheDocument());

        fireEvent.click(screen.getByText('Regresar al listado'));
    });
});

