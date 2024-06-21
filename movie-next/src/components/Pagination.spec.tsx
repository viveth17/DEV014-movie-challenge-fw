import { render, fireEvent } from '@testing-library/react';
import PaginationComponent from '../components/Pagination';

describe('PaginationComponent', () => {
    it('Debe llamar a onSelectPage cuando se hace clic en un botón de paginación.', () => {
        // Función simulada (mock) para onSelectPage
        const mockOnSelectPage = jest.fn();

        // Renderizar PaginationComponent con props simulados
        const { getByText } = render(
            <PaginationComponent currentPage={1} totalPages={5} onSelectPage={mockOnSelectPage} />
        );
        // Hacer clic en el botón de la página 2
        fireEvent.click(getByText('2'));

        // Asegurar que onSelectPage haya sido llamado con el argumento correcto
        expect(mockOnSelectPage).toHaveBeenCalledWith(2);
    });
});
