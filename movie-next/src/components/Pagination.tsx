import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';

// Definición de la interfaz para los props del componente
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onSelectPage: (page: number) => void;
    // Aquí definimos el tipo de onSelectPage
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onSelectPage }) => {
    //Función que maneja el cambio de página (se ejecuta cada vez que el usuario hace clic en un boton de paginación)
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        //llamado de la función onSelectPage con el # de página seleccionado
        onSelectPage(value);
    };
    // Renderizado de paginación
    return (
        <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '20px' }} >
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange} //manejador de evento
                shape="rounded"
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        disabled={
                            (item.type === 'previous' && currentPage === 1) ||
                            (item.type === 'next' && currentPage === totalPages)
                        }
                        sx={{
                            color: item.selected ? '#000000' : '#FFFFFF', // Número de página seleccionada (negro) y no seleccionada (blanco)
                            width: '57px',
                            height: '45px',
                            borderRadius: '5px',
                            margin: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: item.selected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)', // Fondo de página seleccionada (blanco) y no seleccionada (con opacidad 15%)
                            '&.Mui-selected': {
                                backgroundColor: '#FFFFFF', // Fondo blanco para la página seleccionada
                                color: '#000000', // Texto negro para la página seleccionada
                            },
                            '&.MuiPaginationItem-ellipsis': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)', // Fondo para el botón "..."
                                color: '#FFFFFF', // Color del texto para el botón "..."
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default PaginationComponent;





