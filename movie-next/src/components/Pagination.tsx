import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// Definición de la interfaz para los props del componente
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onSelectPage: (page: number) => void; // Aquí definimos el tipo de onSelectPage
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onSelectPage }) => {
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onSelectPage(value);
    };
    // Renderizado de paginación
    return (
        <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '20px' }} >
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: '#FFFFFF', // Números de páginas no seleccionadas (blanco con opacidad 15%)
                        width: '57px',
                        height: '45px',
                        borderRadius: '5px',
                        margin: '5px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fondo con opacidad 15% para números no seleccionados
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                        color: '#000000', // Número de página seleccionada (negro)
                        backgroundColor: '#FFFFFF', // Fondo de página seleccionada (blanco)
                    },
                }}
            />
        </Stack>
    );
};

export default PaginationComponent;
